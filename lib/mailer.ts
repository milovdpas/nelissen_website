import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

/**
 * Generic SMTP transport built from environment variables.
 *
 * Kept deliberately generic so future flows (e.g. post-job review-request
 * e-mails) can reuse the same transport.
 */

function readConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 465);
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
    auth: { user, pass },
  });
  return cached;
}

export type MailMessage = {
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

/** Send an e-mail to the configured CONTACT_TO inbox. */
export async function sendMail(message: MailMessage) {
  const transport = getTransport();
  const from = process.env.CONTACT_FROM ?? process.env.SMTP_USER!;
  const to = process.env.CONTACT_TO ?? from;

  return transport.sendMail({
    from,
    to,
    subject: message.subject,
    text: message.text,
    html: message.html,
    replyTo: message.replyTo,
  });
}
