# Roadmap — planned for later

Features intentionally deferred. The codebase is structured so these land
without a rewrite: content lives in `content/` + `i18n/`, there is a generic
mailer in `lib/mailer.ts` and a branded email shell in `lib/email-template.ts`.

## Ruled out — do not re-propose

Both of these were previously on this roadmap. The owner considered and rejected
them in September 2026, with reasons that are unlikely to change.

- **Webshop.** *"Tis eigenlijk vooral de bedoeling om de mensen bij ons binnen te
  krijgen. Want uiteindelijk willen toch bijna alle klanten de tegel int echt
  zien en niet op un foto."* The site's job is showroom visits, not online sales.
- **Per-tile catalogue and an admin portal to maintain it.** The showroom carries
  300–400 different tiles with one or two of each, and manufacturers discontinue
  a line within a year if it sells slowly: *"letterlijk iedere tegel
  fotograferen en aanpassen als er iets uit is is denk nie te doen."* Any listing
  of individual tiles is wrong within weeks.

The durable unit is the **style**, not the tile — a product is discontinued, but
"houtlook tegels" is a search term forever. That is why `/assortiment/[slug]`
pages are editorial and carry no stock or prices.

## Google reviews — highest value, and not a code task

The business has roughly **two reviews in total** (one Google, one Facebook).
When ChatGPT was asked for a good tile dealer around Oss/Berghem it named four
competitors and quoted their reviews back — *"recente beoordelingen noemen goede
prijs/kwaliteit"* — and did not mention Nelissen at all.

No amount of on-site work outweighs that. The supporting build task:

**Post-job review-request emails.** After a job, mail the client a request to
leave a Google review.
- **Seam in place:** reuse `sendMail()` and `baseLayout()` for a new builder.
- Needs a trigger (a small admin endpoint, or manual) and the Google review link.

## Terrastegels: waiting on photos

`content/nl/stijlen.ts` has a finished `terrastegels` entry with `active: false`,
so it is in the repo but not on the site. There is not one outdoor photo in
`public/images`.

To publish: add three photos, set `cardUrl`/`cardAlt`, flip `active` to `true`.
Nothing else needs touching, since the route, sitemap, nav, hub and sibling
links all read the filtered list.

The copy sells the tiles and never offers to lay a terrace, because Mark asked
for that (2 Oct 2026): outdoor tiling is *"altijd gezeik me de klant"* given the
Dutch climate, but *"leveren kan altijd"*. The same reasoning took "terrassen"
out of the Diensten bullets and `llms.txt`. Keep it that way.

## Remaining style pages

Six are live: houtlook, betonlook, natuursteenlook, handvorm, slabs &
grootformaat, badkamertegels. Terrastegels is written but inactive, see above.

Candidates not yet confirmed with Mark: **marmerlook**, **decortegels** and
**mozaïek**. Ask before writing. Each is roughly 350–500 words of Dutch, and the
cost is the copy rather than the code: a style is one entry in
`content/nl/stijlen.ts` and the route, sitemap, nav, hub and sibling links all
follow on their own.

A style also needs three photos it can actually carry. That, not the writing, is
what held terrastegels back.

## Real photography

Done. Every photo on the site is Nelissen's own work, supplied by Tom in October
2026; the Unsplash stock is gone from the content, the CSP and
`images.remotePatterns`.

What is left is a wish list rather than a gap:
- **Voorraad in the showroom.** The Voorraad tegels card still shows pallets in
  the warehouse. Mark offered to shoot the showroom stock instead.
- **The showroom itself.** `components/sections/Showroom.tsx` uses a photo from
  before the rebuild. Replace it once the new showroom is finished.
- **Anything outdoors.** There is not one terrace photo, which is the only thing
  keeping the terrastegels page unpublished.
- Two handvorm photos are phone screenshots and one is 372x679, so all three are
  held out of the carousel until the originals arrive.

## Location pages

Six exist (Berghem, Oss, Nistelrode, Uden, Rosmalen, Den Bosch). Adding more is
tempting and is how this gets ruined: near-identical pages differing only by
place name are doorway pages and get demoted. Worst pairwise body-copy overlap is
currently ~22%. Re-measure before adding a seventh, and only add a town there is
something true and specific to say about.

## Done

- **Branded customer auto-reply.** The contact form already sends the visitor a
  confirmation via `contactConfirmationEmail()`.
- **Keep acceptance out of Google.** `APP_ENV` (`lib/env.ts`) replaced the old
  `NEXT_PUBLIC_NOINDEX` boolean. Only `APP_ENV=production` is indexable;
  everything else blocks crawlers in `app/robots.ts`, emits `noindex, nofollow`
  and an `X-Robots-Tag` header, and diverts outgoing mail to a test inbox, so
  indexing and email can never disagree. Acceptance also sits behind HTTP basic
  auth, the only layer that actually prevents access rather than requesting it.
