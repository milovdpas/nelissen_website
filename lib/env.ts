import "server-only";

/**
 * Which deployment this is.
 *
 * Drives two things that must never disagree: whether search engines may index
 * the site, and whether outgoing mail is a real enquiry or a test send.
 *
 * Deliberately **not** `NEXT_PUBLIC_` — nothing in the browser needs it, and a
 * client component reading `process.env.APP_ENV` would silently get `undefined`
 * (Next only inlines `NEXT_PUBLIC_*`), which is exactly the kind of quiet wrong
 * answer this module exists to prevent.
 *
 * Read at **both** build and request time: `app/robots.ts` and the layout
 * metadata are evaluated during static generation, `lib/mailer.ts` per request.
 * So the Docker image needs `APP_ENV` as a build ARG *and* as a runtime env —
 * see DEPLOYMENT.md.
 */
export type AppEnv = "production" | "acceptance" | "preview" | "development";

const KNOWN: readonly string[] = ["production", "acceptance", "preview", "development"];

function read(): AppEnv {
  const raw = process.env.APP_ENV?.trim().toLowerCase();

  if (!raw) return "development";

  if (!KNOWN.includes(raw)) {
    // A typo must not quietly grant production behaviour. Warn loudly, then
    // fall back to the safe side.
    console.warn(
      `APP_ENV="${raw}" is not one of ${KNOWN.join(", ")}; treating this deployment as non-production.`,
    );
    return "development";
  }

  return raw as AppEnv;
}

export const appEnv: AppEnv = read();

/**
 * Everything gated on this fails **closed**: unset or unrecognised means "not
 * production". Getting it wrong that way costs a noindexed site or a test-inbox
 * email — both visible and recoverable. The other direction costs an indexed
 * acceptance environment competing with the real domain, or a customer enquiry
 * delivered to a mailbox nobody reads.
 */
export const isProduction = appEnv === "production";
