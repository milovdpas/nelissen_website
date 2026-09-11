import { NextResponse } from "next/server";
import { z } from "zod";
import { sendMail } from "@/lib/mailer";
import { contactNotificationEmail } from "@/lib/email-template";

// Node runtime required for nodemailer (not Edge).
export const runtime = "nodejs";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  message: z.string().trim().min(5).max(5000),
  // Honeypot: accepted by the schema, then checked explicitly below so a
  // tripped honeypot returns a silent success instead of a validation error.
  website: z.string().max(200).optional(),
});

// Lightweight in-memory rate limit (per IP). Resets on server restart; good
// enough as a first line of defence on a single VPS instance.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
// Hard ceiling on tracked addresses. Without it the map is an unbounded
// allocation the caller controls: one request per distinct address is enough to
// grow it forever in a long-lived container.
const MAX_TRACKED_IPS = 10_000;

const hits = new Map<string, { count: number; resetAt: number }>();
let lastSweep = 0;

/**
 * Drop windows that have expired, then — if that wasn't enough — the
 * oldest-inserted entries. Map iterates in insertion order, so the head of the
 * map is the least recently created bucket.
 */
function sweep(now: number) {
  lastSweep = now;
  for (const [ip, entry] of hits) {
    if (now > entry.resetAt) hits.delete(ip);
  }
  if (hits.size > MAX_TRACKED_IPS) {
    let excess = hits.size - MAX_TRACKED_IPS;
    for (const ip of hits.keys()) {
      if (excess-- <= 0) break;
      hits.delete(ip);
    }
  }
}

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (now - lastSweep > WINDOW_MS || hits.size > MAX_TRACKED_IPS) sweep(now);

  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

// Exactly one reverse proxy (the nginx container, see DEPLOYMENT.md) sits in
// front of this app. nginx appends the real peer address to X-Forwarded-For, so
// only the RIGHTMOST entry is written by infrastructure we control — everything
// to its left is whatever the client chose to send. Reading the leftmost entry
// lets anyone reset their own bucket with a spoofed header, which defeats the
// limit entirely; count hops from the right instead.
const TRUSTED_PROXY_HOPS = 1;

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) {
    const chain = fwd
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    const ip = chain[chain.length - TRUSTED_PROXY_HOPS];
    if (ip) return ip;
  }
  // Only reached when the proxy sets neither header (e.g. direct access on the
  // container network). Everything then shares one bucket, which fails closed.
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

export async function POST(req: Request) {
  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  // Honeypot tripped — pretend success so bots don't learn anything.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, message } = parsed.data;

  try {
    const { subject, html, text } = contactNotificationEmail({ name, email, message });
    await sendMail({ subject, html, text, replyTo: email });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact mail failed:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }
}
