import { NextResponse } from "next/server";
import { z } from "zod";
import { sendMail } from "@/lib/mailer";
import {
  contactConfirmationEmail,
  contactNotificationEmail,
  type ContactSubmission,
} from "@/lib/email-template";
import { site } from "@/content/site";

// Node runtime required for nodemailer (not Edge).
export const runtime = "nodejs";

const DAYPARTS = ["ochtend", "middag", "avond"] as const;

/** An untouched optional input posts "" — treat that as "not provided". */
const blank = (value: unknown) =>
  typeof value === "string" && value.trim() === "" ? undefined : value;

const schema = z
  .object({
    // Older clients (and anything hand-rolled) may omit this entirely.
    type: z.enum(["appointment", "question"]).default("question"),
    name: z.string().trim().min(2).max(100),
    // Trim first, then validate: z.string().email() is deprecated in zod 4, and
    // z.email() on its own would reject an address with stray whitespace.
    email: z.string().trim().pipe(z.email().max(150)),
    phone: z.preprocess(
      blank,
      z.string().trim().min(6).max(30).regex(/^[0-9+()\s-]+$/).optional(),
    ),
    // ISO yyyy-mm-dd, as produced by the calendar in components/ui/DatePicker.
    date: z.preprocess(blank, z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/).optional()),
    // Several dayparts may be picked. An empty array means "no preference",
    // which is the same as not sending the field at all.
    dayparts: z.preprocess(
      (value) => (Array.isArray(value) && value.length === 0 ? undefined : value),
      z.array(z.enum(DAYPARTS)).max(DAYPARTS.length).optional(),
    ),
    message: z.preprocess(blank, z.string().trim().max(5000).optional()),
    // Honeypot: accepted by the schema, then checked explicitly below so a
    // tripped honeypot returns a silent success instead of a validation error.
    website: z.string().max(200).optional(),
  })
  .superRefine((value, ctx) => {
    // A question is nothing without its text. An appointment stands on the
    // name, e-mail and preferred slot, so its note stays optional.
    if (value.type === "question" && (value.message ?? "").length < 5) {
      ctx.addIssue({
        code: "custom",
        path: ["message"],
        message: "Message is required for a general question.",
      });
    }

    // The calendar already greys these out, but it is client-side, so the same
    // two rules are enforced here: nothing in the past, and never a Sunday
    // (the showroom is closed). Comparing ISO strings is safe, and using UTC
    // makes the past check lenient rather than over-strict for visitors an
    // hour ahead of the server.
    if (value.date) {
      const [y, m, d] = value.date.split("-").map(Number);
      const isSunday = new Date(Date.UTC(y, m - 1, d)).getUTCDay() === 0;
      if (value.date < new Date().toISOString().slice(0, 10) || isSunday) {
        ctx.addIssue({ code: "custom", path: ["date"], message: "Date is in the past or a Sunday." });
      }
    }
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
    // Name the fields that failed so the form can point at them. Only the field
    // names cross the wire — the wording lives in the dictionary, and nothing
    // about the schema internals is disclosed.
    const fields = [...new Set(parsed.error.issues.map((issue) => String(issue.path[0])))];
    return NextResponse.json({ ok: false, error: "validation", fields }, { status: 400 });
  }

  // Honeypot tripped — pretend success so bots don't learn anything.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  // Rebuilt field by field so the honeypot can never reach a template.
  const submission: ContactSubmission = {
    type: parsed.data.type,
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    date: parsed.data.date,
    dayparts: parsed.data.dayparts,
    message: parsed.data.message,
  };

  try {
    const notification = contactNotificationEmail(submission);
    await sendMail({ ...notification, replyTo: submission.email });
  } catch (err) {
    console.error("Contact mail failed:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 });
  }

  // Acknowledgement to the visitor. Deliberately non-fatal: the enquiry has
  // already reached the business, so a bounce here must not report failure to
  // the visitor — they would simply send the same message again.
  try {
    const confirmation = contactConfirmationEmail(submission);
    await sendMail({ ...confirmation, to: submission.email, replyTo: site.email });
  } catch (err) {
    console.error("Contact confirmation failed (the enquiry itself was delivered):", err);
  }

  return NextResponse.json({ ok: true });
}
