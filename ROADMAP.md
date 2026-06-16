# Roadmap — planned for later

Features intentionally deferred. The current codebase is structured to make
these additions without a rewrite (centralized content in `content/` + `i18n/`,
a generic mailer in `lib/mailer.ts`, branded email shell in
`lib/email-template.ts`).

## Content portal / CMS
A back-office to edit website content (texts, services, assortiment, portfolio,
opening hours) without code changes.
- **Seam already in place:** all copy/data lives in `content/` and `i18n/` files,
  read through `getDictionary()`. Swap these for a CMS/DB-backed source behind
  the same shape and components don't change.

## Webshop for tiles
Online catalogue + ordering for the tile assortiment.
- Would live under a new route group (e.g. `app/shop/`). The current single-page
  structure doesn't block it.
- Reuses `content/nl/assortiment.ts` as a starting data model.

## Post-job review-request emails
After a job is completed, e-mail the client a request to leave a Google review
(the company currently has only one review).
- **Seam already in place:** reuse `sendMail()` (`lib/mailer.ts`) and the branded
  `baseLayout()` shell (`lib/email-template.ts`) for a new email builder.
- Needs: a trigger (manual action in the future portal, or a small admin
  endpoint) and the Google review link.

## Branded customer auto-reply (contact form)
When someone submits the contact form, also send the visitor a branded
"we hebben uw bericht ontvangen" confirmation e-mail.
- **Seam already in place:** add a second builder in `lib/email-template.ts`
  using `baseLayout()`, and send it from `app/api/contact/route.ts` after the
  notification mail (to the visitor's address, from `CONTACT_FROM`).

## SEO: keep acceptance out of Google
The Vercel acceptance domain (`nelissen-website.vercel.app`) is publicly
indexable. Before/at launch, make the acceptance deployment emit `noindex`
(e.g. an env flag read by `app/robots.ts` + metadata) so only the production
VPS domain gets indexed and there's no duplicate content.
