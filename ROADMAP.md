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

## Bring back the "Toon hele assortiment" button

Mark's mockup had a button bottom-right of the homepage assortiment section,
linking to `/assortiment`. It was built and then removed, because the hub lists
four style pages against the six cards directly above it: the button promised
more than it delivered.

Put it back once the hub carries categories that are not already on the
homepage. The markup is a few lines in `components/sections/Assortiment.tsx` and
the label is still in the dictionary as `assortiment.hubLink`.

The hub is not orphaned in the meantime: it is in the nav, and the Voorraad
tegels card points at it.

## Remaining style pages

One of eight is written (`houtlook-tegels`) as a template to agree the shape.
Still to write: betonlook, natuursteenlook, marmerlook, decor & handvorm,
slabs & 120×120, terras- & buitentegels, badkamertegels. Roughly 350–500 words
each — the cost here is Dutch copy, not code: adding a style is one entry in
`content/nl/stijlen.ts` and the route, sitemap and hub follow automatically.

**Nav dropdown** under Assortiment once there are enough pages to warrant one.

## Real photography

Everything outside `public/images/showroom.jpeg` and `bedrijfsbus.jpeg` is
Unsplash stock, flagged in the content files.

The Portfolio section is the urgent one: it is headed *"Ons werk, voor u."* and
labels stock photos as the company's own completed jobs. The assortiment
placeholders are merely generic; that one is a claim that is not true.

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
