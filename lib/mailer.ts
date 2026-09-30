import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { appEnv, isProduction } from "./env";

/**
 * Generic SMTP transport built from environment variables.
 *
 * Kept deliberately generic so future flows (e.g. post-job review-request
 * e-mails) can reuse the same transport.
 */

function readConfig() {
  const host = process.env.SMTP_HOST;
  // `?? 465` alone would not catch SMTP_PORT="", which Number() turns into 0.
  const rawPort = process.env.SMTP_PORT?.trim();
  const port = rawPort ? Number(rawPort) : 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  // SMTP_SECURE defaults to true for port 465, false otherwise.
  const secure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : port === 465;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP is not configured. Set SMTP_HOST, SMTP_USER and SMTP_PASS in the environment.",
    );
  }

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error(`SMTP_PORT must be a port number between 1 and 65535, got "${rawPort}".`);
  }

  // Implicit TLS is the 465 convention; 587 and 2525 start in the clear and
  // upgrade. Setting secure=true on one of those makes the client open a TLS
  // handshake against a plaintext greeting, which surfaces as the opaque
  // OpenSSL error "wrong version number" — worth naming up front.
  if (secure && port !== 465) {
    console.warn(
      `SMTP_SECURE=true with port ${port}: implicit TLS is normally only correct on 465. ` +
        "If the connection fails with \"wrong version number\", set SMTP_SECURE=false so STARTTLS is used.",
    );
  }

  return { host, port, user, pass, secure };
}

let cached: Transporter | null = null;

export function getTransport(): Transporter {
  if (cached) return cached;
  const { host, port, user, pass, secure } = readConfig();
  cached = nodemailer.createTransport({
    host,
    port,
    secure,
    // On a non-465 port the session opens in the clear. Demand the STARTTLS
    // upgrade instead of letting nodemailer fall back to a plaintext session,
    // which would put the mailbox password on the wire.
    requireTLS: !secure,
    auth: { user, pass },
  });
  return cached;
}

export type MailMessage = {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  /** Recipient. Defaults to the CONTACT_TO inbox when omitted. */
  to?: string;
};

/**
 * Send an e-mail — to `message.to`, or the configured CONTACT_TO inbox.
 *
 * Outside production every message is diverted to a test inbox and labelled in
 * the subject. Without the diversion, a form submission on acceptance arrives
 * at info@ looking exactly like a real enquiry, and someone chases a customer
 * who does not exist — and the confirmation mail would be sent to whatever
 * address the tester typed in, which may not be theirs.
 */
export async function sendMail(message: MailMessage) {
  const transport = getTransport();
  const from = process.env.CONTACT_FROM ?? process.env.SMTP_USER!;

  // Falls back to `from` rather than SMTP_USER: on a Mailtrap-style transport
  // SMTP_USER is an API token, not an address, and nodemailer rejects the send
  // with "No recipients defined".
  const to = isProduction
    ? (message.to ?? process.env.CONTACT_TO ?? from)
    : (process.env.CONTACT_TO_TEST ?? from);

  const subject = isProduction
    ? message.subject
    : `[TEST — ${appEnv}] ${message.subject}`;

  return transport.sendMail({
    from,
    to,
    subject,
    text: message.text,
    html: message.html,
    replyTo: message.replyTo,
  });
}
