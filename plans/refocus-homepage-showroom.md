# Refocus the homepage on the showroom

## Context

Mark's feedback: the business has more than enough tile-setting work, but wants to
sell more tiles. The site currently leads with *Over ons* and treats the tile range
as the fifth section down. He wants the assortiment up front, "over ons" pushed back,
and the tiles they actually sell shown with photos.

Two constraints from the follow-up conversation shape everything below:

- **No webshop.** *"Tis eigenlijk vooral de bedoeling om de mensen bij ons binnen te
  krijgen. Want uiteindelijk willen toch bijna alle klanten de tegel int echt zien en
  niet op un foto."* The site's job is driving showroom visits.
- **No per-tile listing either.** 300–400 tiles, 1–2 of each, and manufacturers drop a line
  within a year if it sells slowly: *"letterlijk iedere tegel fotograferen en aanpassen als
  er iets uit is is denk nie te doen."* Mark considered a filterable listing plus an admin
  portal and rejected it himself. He is right, and it saves the most expensive piece of work
  on the table. Sending samples ("stalen") was also raised and ruled out — the showroom is
  too small to service it.

**The durable unit is the style, not the SKU.** A specific tile is discontinued in a year;
"betonlook tegels" is a search term forever, and it is where the volume actually sits. Mark
reached the same conclusion from a competitor, [tegelsuden.nl](https://www.tegelsuden.nl/),
whose pages are editorial — style categories, "400 m2 inspiratie", no products, no prices, no
stock, no filter or sort. Proven in this niche and region.

His summary is the brief: *"Ze moeten alleen weten dat we tegels verkopen en dat we alles
hebben."* Be findable, look good, get them through the door.

So the homepage assortiment section stays a hook, and the depth moves into **style landing
pages** — no database, no portal, no inventory.

This plan is therefore two rounds. **Tier 1 (§1–§12) is what gets built now:** the acceptance
environment first, then reorder, recontent, reweight, carousel. **Tier 2 is the multi-page
split**, specified at the end and deliberately left for the next round — it is gated on several
thousand words of new Dutch copy, not on code.

**Acceptance goes first on purpose.** Every change below is content and layout that Mark will
want to see before it is public, and there is currently nowhere to show him. Building §1–§2 first
means the rest can be reviewed on a real URL instead of screenshots, and nothing reaches
production unseen.

## Progress

Lives at `plans/refocus-homepage-showroom.md` in the repo; tick items as they land so the file
stays the source of truth rather than this chat.

**Status:** §1 done, §2 code done — needs the one-time nginx + certificate + basic-auth
step on the VPS, then the homepage work. Waiting on Mark's photos (expected 1 October).

| | Item | State |
|---|---|---|
| 1 | `APP_ENV` flag + noindex + email labelling | ✅ verified on a built image: robots disallow, `X-Robots-Tag`, canonical self-refs acceptance, no GA id, mail diverted |
| 2 | Acceptance environment on the VPS | ◐ workflow + compose done; **VPS nginx conf, certificate and basic auth still to do by hand** (DEPLOYMENT.md) |
| 3 | Section order | ✅ verified in the DOM |
| 4 | New assortiment categories | ✅ copy in; **images still placeholders** |
| 5 | Data shape (`alt`, `slug`) | ✅ 14 images, 0 empty alts |
| 6 | Tile carousel | ☐ |
| 7 | Photos from Mark | ☐ blocked — expected 1 Oct |
| 8 | Backgrounds | ✅ no two adjacent sections alike |
| 9 | Nav order | ✅ matches the page |
| 10 | Hero reweight | ☐ |
| 11 | Derived files (llms.txt, sitemap) | ✅ |
| 12 | Showroom availability wording | ☐ |
| — | Message to Ronald (informational) | ☐ |
| — | Tier 2 — multi-page split | ☐ next round |

## 1. `APP_ENV` — keep acceptance out of Google and out of real inboxes

An acceptance environment (§2) creates two risks: it gets indexed and competes with the real
domain for brand terms, and test submissions land in Mark's actual inbox.

**Something already exists but is half-wired.** `NEXT_PUBLIC_NOINDEX` is read at
`app/layout.tsx:16` and `app/robots.ts:6-9`, with a comment naming this exact scenario ("Set
NEXT_PUBLIC_NOINDEX=true on staging (e.g. the Vercel acceptance site)"), and there is a
`Dockerfile:20` ARG for it — but `deploy.yml` never passes it. It is also a bare boolean that
says nothing about email, and it is `NEXT_PUBLIC_`, so it ships to the client bundle for no
reason. `APP_ENV` supersedes it; remove it.

**Shape:**

- `APP_ENV` = `production` | `acceptance` | `preview` | `development`.
- **Unset must mean non-production.** Fail safe: a missing variable can cost you an indexed
  preview or a real email, never the reverse.
- **Not** `NEXT_PUBLIC_`. Only server code reads it — `robots.ts`, layout metadata, the mailer —
  so it stays out of the client bundle.
- Add `lib/env.ts` exporting `appEnv` and `isProduction` so the check has one definition. The
  codebase already centralises this way (`content/site.ts` for NAP, `lib/seo.ts` for JSON-LD).

**Indexing** — three layers, because the first two are only requests:

- `app/robots.ts` — disallow all unless `isProduction` (logic already there, just re-pointed).
- `app/layout.tsx` — `robots: { index, follow }` only when `isProduction`.
- `next.config.ts` `headers()` — add `X-Robots-Tag: noindex, nofollow` when not production. More
  robust than the meta tag: it covers non-HTML responses and cannot be missed by a crawler that
  skips the head.
- **Also put HTTP basic auth on the acceptance vhost** (§2). robots and noindex are polite
  requests to well-behaved crawlers; auth is the only thing that actually prevents access, and it
  stops acceptance competing for brand terms outright.

**Email** — `lib/mailer.ts:sendMail` and `lib/email-template.ts`:

- When not production, prefix the subject with `[TEST — <APP_ENV>]` and add a banner strip at the
  top of `baseLayout()`.
- **Override the recipient** to a test inbox (new `CONTACT_TO_TEST`, falling back to `SMTP_USER`).
  Labelling alone is not enough — without this, a preview deploy sends real-looking enquiries to
  `info@tegelhandelnelissen.nl` and Mark chases a customer who does not exist. The visitor
  confirmation mail gets the same treatment.

**The trap: build time vs runtime.** `robots.ts` and the layout metadata are evaluated at
**build** (static generation); the mailer runs at **request**. So `APP_ENV` must be passed *both*
as a Docker build ARG *and* as a runtime env, or the image bakes one robots policy while mailing
under the other. `DEPLOYMENT.md:79-86` already draws exactly this distinction for
`NEXT_PUBLIC_*` vs `SMTP_*`; `APP_ENV` is the first variable that needs to be in both columns,
which is worth calling out there explicitly. So:

- `Dockerfile` — `ARG APP_ENV` + `ENV APP_ENV=$APP_ENV` in the build stage, beside the
  `NEXT_PUBLIC_*` block, and `APP_ENV` in the runtime stage too.
- `.github/workflows/deploy.yml` — pass `APP_ENV=production` in `build-args`.
- Server `.env` / `docker-compose.prod.yml` — `APP_ENV=production` for the runtime side.
- `DEPLOYMENT.md` — document it in the existing build-time vs runtime table, which already draws
  exactly this distinction.

**Verification:**

1. On acceptance: `/robots.txt` disallows all; the homepage carries
   `<meta name="robots" content="noindex">` and the `X-Robots-Tag` header.
2. Submit the contact form on acceptance — mail arrives labelled, at the test inbox, **not** at
   `info@`.
3. On production: robots allows, meta says `index, follow`, no `X-Robots-Tag`, mail unlabelled to
   `info@`.
4. Build the image with `APP_ENV` **unset** and confirm it comes up noindex — proving the
   fail-safe default, which is the failure mode that actually costs money.

## 2. Acceptance environment on the VPS

`acceptance` branch → `https://acceptance.tegelhandelnelissen.nl/`, same box, same proxy, same
image recipe as production. Cheaper to reason about than a second platform.

### DNS — nothing to do

`*.tegelhandelnelissen.nl` is already a **wildcard A record** pointing at `159.195.28.227`;
confirmed by resolving two nonsense subdomains, both of which answer with the VPS IP. So
`acceptance.tegelhandelnelissen.nl` already resolves and **no request to Ronald is needed**. The
`AAAA` record he was asked to remove is also already gone.

Two consequences worth knowing: every typo subdomain reaches the VPS and is served by whatever
nginx has as its default vhost, and any future subdomain on this domain needs no DNS work at all
— only an nginx conf and a certificate.

**Still tell Ronald**, even though nothing is required of him. The environment depends on that
wildcard, so if it is ever replaced with explicit records the acceptance site dies silently and
nobody connects the two. Draft:

> Hoi Ronald,
>
> Kleine heads-up, je hoeft er niets voor te doen. Ik ga voor Tegelhandel Nelissen een
> acceptatie-omgeving draaien op:
>
> `acceptance.tegelhandelnelissen.nl` → `159.195.28.227`
>
> Die resolvet al, want er staat een wildcard (`*.tegelhandelnelissen.nl`) naar dezelfde server.
> Het certificaat en de nginx-config regel ik zelf.
>
> Enige wat ik wilde melden: mocht die wildcard ooit vervangen worden door losse records, dan
> graag deze erbij houden — anders valt de acceptatie-omgeving om.
>
> De omgeving komt achter een wachtwoord en op noindex, dus hij is niet vindbaar in Google en
> concurreert niet met de live site.
>
> Geen haast, puur ter info 🙂
>
> (En de AAAA-record van tegelhandelnelissen.nl is eruit, top — thanks!)

### New workflow — `.github/workflows/deploy-acceptance.yml`

A near-copy of `deploy.yml`, differing only where it must:

| | Production | Acceptance |
|---|---|---|
| Trigger | push to `main` | push to `acceptance` |
| Concurrency group | `deploy-vps` | `deploy-vps-acceptance` — **must differ**, or the two cancel each other |
| `APP_DIR` | `/opt/apps/nelissen-website` | `/opt/apps/nelissen-website-acceptance` |
| Image tag | `:latest`, `:<sha>` | `:acceptance`, `:acceptance-<sha>` |
| `NEXT_PUBLIC_SITE_URL` | `https://www.tegelhandelnelissen.nl` | `https://acceptance.tegelhandelnelissen.nl` |
| `NEXT_PUBLIC_GA_ID` | `G-7FN28L6211` | **omitted** — see below |
| `APP_ENV` | `production` | `acceptance` (build arg **and** runtime) |

**Leave `NEXT_PUBLIC_GA_ID` unset on acceptance.** Every click while testing would otherwise land
in the live Analytics property and quietly corrupt the numbers. The `Analytics` component already
renders nothing when the id is absent (`components/cookies/Analytics.tsx:14`), so omitting the
build arg is the whole fix.

`NEXT_PUBLIC_SITE_URL` pointing at the acceptance host means canonicals, sitemap and OG tags all
self-reference acceptance. That is correct *given* it is noindexed and behind auth — it keeps the
environment self-consistent and avoids a cross-domain canonical pointing at production.

### Compose

`docker-compose.prod.yml` hardcodes `container_name: nelissen-website`, and two containers cannot
share a name — so acceptance needs its own `docker-compose.acceptance.yml`: container
`nelissen-website-acceptance`, image `:acceptance`, everything else identical (same `web` network,
same healthcheck, same dropped capabilities). Keeping it a separate file matches the existing
model where the server holds only a compose file and a `.env`.

### nginx + TLS on the VPS (one-time, by hand)

1. `/opt/apps/proxy/conf.d/nelissen-website-acceptance.conf`, `proxy_pass` to
   `nelissen-website-acceptance`. Keep it named `.conf.disabled` until the cert exists — nginx
   refuses to start while a conf references a missing certificate (`DEPLOYMENT.md:109-110`).
2. Certificate for the single name:
   ```bash
   cd /opt/apps/proxy
   docker compose run --rm --entrypoint certbot certbot certonly --webroot -w /var/www/certbot \
     -d acceptance.tegelhandelnelissen.nl \
     --email vanderpasmilo@gmail.com --agree-tos --no-eff-email
   ```
3. **Basic auth**, with the ACME path excluded — otherwise renewal fails silently in 60 days:
   ```nginx
   auth_basic "Acceptance";
   auth_basic_user_file /etc/nginx/.htpasswd-nelissen;
   location ^~ /.well-known/acme-challenge/ { auth_basic off; root /var/www/certbot; }
   ```
   `/health` also needs `auth_basic off`, or the container healthcheck still passes (it probes
   `127.0.0.1` directly, bypassing nginx) but any external uptime check breaks.

### Docs to update

- `DEPLOYMENT.md` — acceptance alongside production, and `APP_ENV` in the build-time/runtime table.
- `vps_hosting/README.md:35` — add the acceptance domain to the table.
- `vps_hosting/03-architecture.md` — the new container.
- `app/layout.tsx:14-15` — the comment says "Set `NEXT_PUBLIC_NOINDEX=true` on staging (e.g. the
  Vercel acceptance site)". Both halves become wrong: the variable is replaced by `APP_ENV`, and
  acceptance is on the VPS, not Vercel. Delete it with the variable.

## 3. Section order

`app/page.tsx:20-26` is the only functional change — the page is static, each section
takes one dictionary slice, so reordering is reordering lines.

| Now | Tier 1 | Tier 2 (final) |
|-----|--------|----------------|
| Hero → OverOns → Diensten → Portfolio → Assortiment → Openingstijden → Contact | Hero → **Assortiment** → Portfolio → Diensten → **OverOns** → Openingstijden → Contact | Hero → Assortiment → Openingstijden → Contact |

Assortiment leads, Portfolio follows as visual proof, the two sections about *them*
(Diensten, Over ons) drop to the back, and Openingstijden + Contact close as the "come visit"
pair — which is the actual conversion goal.

In Tier 2, Diensten / Portfolio / Over ons **leave the homepage entirely** and move to
`/over-ons`, reducing the homepage to a four-section funnel. Tier 1 is still worth doing as an
intermediate: it is one line of reordering, it ships tomorrow with the photos, and it improves
the page while the new routes are built. Only the background assignment (§8) gets touched twice,
which is a one-line change each time.

Section `id`s do **not** change, so every existing anchor keeps working, including the
legacy Joomla redirect `/index.php/nl-nl/service/contact → /#contact`
(`next.config.ts:91`).

## 4. New assortiment categories

Replace all six entries in `content/nl/assortiment.ts:8-38` with Mark's list. This is
the substantive half of the request — it shifts from material categories
(floor/wall/outdoor) to what a buyer actually shops for.

| # | Label | Description |
|---|-------|-------------|
| 1 | Voorraad tegels | Direct leverbare tegels uit voorraad. Bekijk ons assortiment voor iedere stijl en toepassing. |
| 2 | Slabs | Grote en luxe uitstraling met minimale voegen. Ontdek onze slabs voor de perfecte badkamer. |
| 3 | Handvorm tegels | Karakter in iedere tegel. Ambachtelijke uitstraling met een unieke, levendige look. |
| 4 | Visgraat houtlook vloeren | De warme uitstraling van hout, met het gemak van een tegel. |
| 5 | 120×120 tegels | Groot formaat met rustige lijnen, voor een moderne en luxe uitstraling. |
| 6 | Badkamers | Van vloer tot wand. Creëer een badkamer die stijl, comfort en luxe samenbrengt. |

Two edits to Mark's raw text:

- **"Visgraad" → "Visgraat"** — confirmed with him as a typo (*"Ja idd, kan zomaar hier en
  daar un spellingsfoutje instaan"*). Worth having caught: it is a category heading on the
  page we most want to rank for, and "visgraat" is what people type into Google.
- Punctuation normalised into full sentences to match the other five cards.

Note category 4 changed meaning in Mark's correction — it is now *wood-look* herringbone, not
herringbone generally. The photo brief and `alt` text must say houtlook; a stone herringbone
shot would be wrong. It is also the natural homepage entry into the Tier 2 *houtlook* page.

The heading `assortiment.title` ("Tegels voor elk project.") still fits and stays. The
existing footnote already points at the showroom — keep it, it is exactly the call to
action Mark wants, and it should sit *below* the carousel as the section's closing line.

## 5. Data shape: add `alt` and `slug`

`content/nl/assortiment.ts:1-6` currently has only `label`, `url`, `desc`. Two additions,
both cheap now and load-bearing later:

- **`alt`** — `Assortiment.tsx:37` falls back to `alt={item.label}`. With real photos that
  is a wasted accessibility and image-SEO slot. `content/nl/portfolio.ts:2-9` already has
  the right shape; copy it.
- **`slug`** — `Assortiment.tsx:30` uses `key={item.label}`, which collides on duplicate
  labels, and the Tier 2 pages need stable per-category ids anyway.

Do **not** copy Portfolio's `width`/`height` fields — the comment claims they are "kept for
next/image" but `Portfolio.tsx:30-36` renders with `fill` in a fixed-height box and never
reads them. Dead weight.

## 6. Tile carousel

Mark: *"Onder deze vakjes … met diverse foto's van tegels die foto voor foto afspeelt."*
A slideshow of tile photos directly under the six category cards. This is a good fit for
the 300–400 problem: it shows breadth without implying any specific tile is in stock.

Placement inside `Assortiment.tsx`: cards → carousel → existing showroom footnote. That
reads as a funnel — what we sell, a taste of the range, come and see it.

Build notes:

- **New client component**, e.g. `components/sections/TegelCarousel.tsx`. The site is
  almost entirely server components (only `Nav`, `ContactForm` and the cookie components
  are `"use client"`), so keep this the fourth and keep it small.
- **No carousel library.** The CSP at `next.config.ts:18` allows scripts only from
  `'self'` and googletagmanager, and a dependency here would be ~30 KB for a crossfade.
  Hand-rolled: a track of absolutely-positioned `next/image`s, opacity crossfade on an
  interval, ~4s per slide.
- **Auto-play needs an off switch.** Pause on hover and on focus, and honour
  `prefers-reduced-motion: reduce` by not auto-advancing at all — render it as a
  horizontally scrollable strip instead. This is both an accessibility requirement and
  the honest default.
- **No CLS.** Fixed aspect-ratio container, same `fill` + `sizes` pattern the other two
  sections use. First image eager, the rest `loading="lazy"` — otherwise 20 tile photos
  compete with the hero LCP image.
- **Data** in `content/nl/tegels.ts` as `{ slug, url, alt }[]`, same shape discipline as
  the other content files, so photos can be added or dropped without touching the component.

*Alternative worth mentioning to Mark:* a continuously-scrolling strip showing 4–5 tiles at
once conveys "we have hundreds" better than one-at-a-time. He asked for one-by-one, so build
that, but it's a small variant if he wants to see both.

## 7. Photos — the blocking dependency

Mark is supplying real photos. This is the part that actually delivers his request; the
reorder alone just moves the problem forward. The current stock images are not merely
generic — "Buitentegels" shows a man with a blowtorch and "Natuursteenlook" shows a living
room with deer heads.

Two asks, one spec: **landscape, 3:2, at least 1200×800, JPEG**, decent light, tiles filling
the frame.

1. **Six category photos**, one per §4 row → `public/images/assortiment/<slug>.jpg`
2. **Twelve to twenty carousel photos**, any tiles he likes the look of →
   `public/images/tegels/<slug>.jpg`. These need no relationship to stock levels, which is
   the point — he can shoot whatever is standing in the showroom.

Local paths need no config change; CSP `'self'` already covers them. Leave
`next.config.ts:63-68` `remotePatterns` alone for now — Portfolio still uses Unsplash.

**Timing:** Mark confirmed photos arrive **1 October**, with more copy tweaks likely the same
day (*"wij kijke er morge ff verder en dan sture we wel weer wa"*). So the gate is short.

Sequence the work so nothing is wasted if the copy changes again:

1. **Structure first, today** — section reorder, backgrounds, nav order, the `alt`/`slug`
   fields, the carousel component. None of this depends on final wording or images.
2. **Copy and photos drop in** — they are values in `content/nl/*.ts` and `i18n/nl.ts`, not
   code. A revised description or a swapped photo is a one-line change.
3. **Hold the merge to `main`** until the real photos are in. Shipping "Slabs" over a stock
   bathroom is the same mismatch in a new coat — and the whole point of the round.

## 8. Backgrounds

Sections alternate dark/light today, and the reorder breaks it: OverOns and Openingstijden
would both be `bg-background` and sit adjacent, merging into one undifferentiated block.

Minimal fix — change **Openingstijden only** (`Openingstijden.tsx:8`) from `bg-background`
to the grey Assortiment uses. Result: dark → grey → beige → dark → beige → grey → dark.

In Tier 2 the homepage becomes Hero → Assortiment → Openingstijden → Contact, so the rhythm
needs a second pass then: dark → grey → beige → dark reads fine, so Openingstijden reverts to
`bg-background`. Trivial either way.

While there: `#eeecea` is hardcoded at `Assortiment.tsx:8` rather than tokenised. Lift it
into the token system alongside `bg-background` in `app/globals.css` so both reference one name —
worth doing now, because Tier 2 adds pages that need the same two surfaces.

## 9. Nav order

`i18n/nl.ts:18-25` is the single ordering authority — `Nav.tsx` and `Footer.tsx` both map it,
so they follow for free. Nothing enforces agreement with `app/page.tsx`, so reorder by hand
to match §3:

`#assortiment` → `#portfolio` → `#diensten` → `#over-ons` → `#openingstijden` → `#contact`

## 10. Hero reweight — copy supplied by Mark

Mark keeps the H1 (*"Vakmanschap in elke tegel die klinkt wel lekker"*) and has written the
replacement for everything under it. Current body — *"Al jaren zetten wij tegels bij woningen
en bedrijfspanden…"* — leads with zetwerk, which is exactly the emphasis he wants gone.

New hero structure in `i18n/nl.ts:31-42`:

| Element | Content |
|---|---|
| H1 (unchanged) | Vakmanschap **in elke tegel.** |
| **New** subheading | Tegels voor ieder interieur |
| Body | Van badkamer tot woonkamer en van woning tot bedrijfspand: wij leveren een ruime collectie tegels in diverse stijlen, formaten en uitvoeringen. |
| Closing line | Ontdek onze collectie in de showroom. Zes dagen per week geopend op afspraak. |

The subheading is a new element — `Hero.tsx` currently goes straight from H1 to body, so this
needs a new dictionary key and markup.

**Render the subheading as an `<h2>`.** It costs nothing structurally (one H1 is preserved) and
it puts a product-led heading at the very top of the page, which is most of the "reweight
toward tile sales" we're trying to buy. Note it then sits close to the Assortiment section's
own H2 "Tegels voor elk project." — different enough (interiors vs projects) to keep both, but
worth a look side by side once it renders.

One tidy in Mark's text: *"in de showroom, Zes dagen"* → full stop before a capitalised
"Zes". Flag it rather than silently rewording anything else.

Also update, since they now contradict the new copy:

- **`hero.ctaSecondary`** — "Showroom bezoeken" points at `#openingstijden` (`Hero.tsx:59`).
  With Assortiment directly below the fold, repoint to `#assortiment`.
- **`hero.stats`** — currently `40+ Jaar ervaring` / `Ma–Za Zetwerk op afspraak` /
  `Di 15–19 Showroom open`. That sells zetwerk availability and makes the showroom look like a
  four-hour-a-week operation. Mark's new line says the opposite: six days a week by
  appointment. Suggest `Ma–Za Showroom op afspraak` / `Di 15–19 Vrije inloop`, which is the
  same fact framed as an invitation. Needs his sign-off.

## 11. Derived files that drift silently

- **`public/llms.txt`** — hand-maintained, not generated. Line 21 lists the *old* six
  categories verbatim and lines 8-13 encode the old section order. Both need updating. This
  file has drifted before (four stale values found on 2026-09-24).
- **`app/sitemap.ts:9`** — `home: "2026-09-13"` is deliberately hand-bumped on content change.
  Bump it.
- **`i18n/nl.ts`** top-level key order currently mirrors the page order. Cosmetic, nothing
  depends on it, but worth keeping honest.

## 12. Showroom availability — say it with one voice

**Confirmed by Mark: six days a week by appointment, with free walk-in Tuesday 15:00–19:00.**

The site currently undersells this badly. The hero stat row says "Di 15–19 Showroom open",
`content/site.ts:59` models a single Tuesday window, and `i18n/nl.ts:81` frames the other days
as an afterthought ("Overige dagen op afspraak"). For a strategy whose entire goal is getting
people through the door, the site is advertising four hours a week.

Reframe consistently, leading with availability and treating Tuesday as the bonus:

- **`i18n/nl.ts` openingstijden** — showroom card leads with "Zes dagen per week op afspraak",
  Tuesday presented as *vrije inloop* (walk-in, no appointment needed).
- **Hero stats** — as §10: `Ma–Za Showroom op afspraak` / `Di 15–19 Vrije inloop`.
- **`public/llms.txt:28`** — currently "Showroom: dinsdag 15:00–19:00. Overige dagen op
  afspraak." Same reframe.

**Leave the JSON-LD `openingHoursSpecification` as Tuesday-only** (`lib/seo.ts:36-41`, fed by
`content/site.ts:59`). This looks like an inconsistency but is the correct call: schema opening
hours mean "you can turn up and we are open", and publishing Mon–Sat there would make Google
show the business as open when someone without an appointment would find a locked door. The
by-appointment availability belongs in prose on the page and in the **Google Business Profile's
"by appointment" attribute** — which is off-site work for you, alongside the phone-number fix
still outstanding there.

---

# Tier 2 — go multi-page (next round, not this one)

A one-pager can only rank for one primary intent. Splitting into real pages lets each target
its own search term. Confirmed with Mark.

**We take the structural idea from tegelsuden.nl and nothing else.** No styling, no layout, no
copy, no headings borrowed. Every new page is built from the existing Nelissen system — the
`SectionLabel` + H2 + grid template the seven sections already share, `BRAND`/`FONT` from
`content/site.ts`, the same inline-style conventions. A visitor should not be able to tell we
looked at a competitor.

### Pages

| Route | Purpose |
|---|---|
| `/assortiment` | Hub. A section per style, each linking to its child page. |
| `/assortiment/[slug]` | One page per style: betonlook · houtlook (incl. visgraat) · natuursteenlook · marmerlook · decor & handvorm · slabs & 120×120 · terras- & buitentegels · badkamertegels |
| `/contact` | Form, map, address, route, showroom availability. Strong local-SEO target. |
| `/over-ons` | **Over ons → Diensten → Portfolio**, in that order — the three sections lifted off the homepage. |

**The three sections move, they are not copied.** `OverOns`, `Diensten` and `Portfolio` are
deleted from `app/page.tsx` and rendered on `/over-ons` instead. They are self-contained server
components taking one dictionary slice each, so this is a genuine move — no rewrite, no new
components, and the dictionary keys stay exactly where they are.

Two consequences, both good:

- **The duplicate-content problem disappears.** Your earlier call was "keep the homepage full and
  write new page content", which risked two pages competing for the same words. Moving instead of
  copying removes the risk entirely and supersedes that decision.
- **The copy bottleneck shrinks dramatically.** `/over-ons` needs no new prose at all, only an
  intro and page metadata. New writing is then limited to the style pages.

One trade-off worth naming: **Diensten living under `/over-ons` will not rank for "tegelzetter"
terms**, because the URL, title and H1 are all about the company rather than the service. Mark
says they have more than enough work, so this is an acceptable loss — but it is a loss. If
enquiries ever matter again, the fix is to promote Diensten to its own `/diensten` page, which is
a small change once the content already lives on a route.

The style axis is **not** the homepage's six cards. Those are Mark's merchandising choice and
mix stock ("Voorraad tegels"), format ("120×120"), style ("Handvorm") and room ("Badkamers").
Pages follow search demand. Where they overlap, link the card straight to its page using the
`slug` from §5 — which is what earns that field its place.

### Nav — dropdown under Assortiment

With Diensten and Portfolio absorbed into `/over-ons`, the bar gets shorter as well as deeper:

```
Assortiment ▾   Over ons   Contact     [Afspraak maken]
   │
   ├─ Betonlook tegels        ├─ Decor & handvorm
   ├─ Houtlook & visgraat     ├─ Slabs & 120×120
   ├─ Natuursteenlook         └─ Badkamertegels
```

Three top-level items instead of six, with the depth exactly where the search volume is. Diensten
and Portfolio become in-page anchors on `/over-ons` (`/over-ons#diensten`, `/over-ons#portfolio`)
so they stay linkable from the footer.

Every style page is then one click from every page, which is what makes them rank. Four changes:

1. **`nav.links` shape** (`i18n/nl.ts:18-25`) — flat `{href,label}[]` gains an optional
   `children`. `Nav.tsx` maps it twice (desktop, mobile drawer) and `Footer.tsx` once, so all
   three need to handle a nested level. Footer can flatten to top-level only.
2. **Switch to `next/link`** — `Nav.tsx` uses raw `<a href>` (fine for hash anchors, wrong for
   pages: full reload, no prefetch). Footer already uses `/`-prefixed hrefs.
3. **Desktop dropdown** must open on hover *and* focus, be keyboard-navigable, and close on
   Escape. `Nav.tsx` is already `"use client"` with state, so this extends naturally.
4. **Mobile** — the drawer becomes an accordion; do not nest a hover menu on touch.

Because the three sections move off the homepage, `/#over-ons`, `/#diensten` and `/#portfolio`
stop resolving. Nothing internal will still point at them once `nav.links` and the footer are
updated, and an external link simply lands on the homepage rather than erroring — acceptable.
`/#assortiment`, `/#openingstijden` and `/#contact` are unaffected, so the Joomla redirect keeps
working throughout the migration.

### Content — the real bottleneck

Moving the three sections rather than copying them removes most of this. `/over-ons` and
`/contact` need only an intro and metadata; their substance already exists.

What genuinely needs writing is the **style pages** — around eight, at ~350–500 words each, so
roughly 3,000–4,000 words of Dutch copy. That is the gating cost of Tier 2, not the code. Draft
them so Mark only has to correct rather than write, and expect his voice to differ from ours —
he has been specific and quick with copy so far.

Per page: H1 "<Stijl> tegels", what the style is and where it suits, photo set, the §6 carousel
reused, internal links to siblings, and a close on showroom address, hours and directions. Work
location into titles and copy (*betonlook tegels Oss / Berghem*) — local intent is where this
business can realistically win.

### Supporting work

- **Per-page `metadata`** — unique title, description and self-canonical. The root layout sets
  `alternates.canonical: "/"`, which child pages must override (the two legal pages already do).
- **`app/sitemap.ts`** — currently a hand-written array of three. Generate from the same content
  file rather than hand-listing a dozen.
- **Breadcrumb JSON-LD** on hub → child, which Google renders in results.
- **`next.config.ts:91`** — repoint the legacy Joomla redirect from `/#contact` to `/contact`.
- **`public/llms.txt`** — add every new page to the links block.

### Roadmap corrections

`ROADMAP.md:15-19` (*Webshop*, assumes `app/shop/`) and `ROADMAP.md:8-14` (*Content portal /
CMS*) are both dead as written — Mark has ruled out the webshop, the per-tile listing and the
portal. Replace with this section.

### Extra verification for Tier 2

Beyond the Tier 1 list: every new route returns 200 and appears in `sitemap.xml`; each page has
exactly one H1 and a unique title/description; the dropdown is operable by keyboard alone and
as an accordion on a touch viewport; and no new page is a near-duplicate of its homepage section.

---

## Verification (Tier 1)

1. `npx next dev` — confirm the new section order renders, and that no two adjacent sections
   share a background.
2. Click every nav item, desktop and mobile drawer, plus the footer list: all six anchors must
   scroll to the right section. Check the Hero's two CTAs and the logo `#hero` link.
3. Confirm the six new cards show the right label/description pairing and each has real `alt`.
4. Carousel: auto-advances, pauses on hover and on keyboard focus, and with
   `prefers-reduced-motion: reduce` set in devtools it stops auto-advancing and stays usable.
5. `npx tsc --noEmit` and `npm run lint`.
6. Re-run the live-page audit checks: exactly one H1, heading hierarchy unbroken, every image
   has non-empty alt, all anchor targets resolve. Confirm the carousel images are lazy-loaded
   and the hero image is still the only preloaded one.
7. Verify `public/llms.txt` matches `content/nl/assortiment.ts` — no stale category names, and
   the showroom line matches the §12 reframe.
8. Confirm the JSON-LD still publishes Tuesday-only opening hours (deliberate, per §12) while
   the visible copy says six days by appointment.
9. `docker build` + boot the image, confirm `/health` and `/` return 200 and the legacy
   `/index.php/...` redirect still serves 308.
