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
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
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
