# Tegelhandel Nelissen

Website for Nelissen Tegelhandel & Tegelzettersbedrijf, a tile shop and
tile-setting business in Berghem (gemeente Oss).

The site's job is **getting people into the showroom**. There is no webshop and
no per-tile catalogue, deliberately — see [ROADMAP.md](ROADMAP.md) for why both
were ruled out.

Next.js 16 (App Router, standalone output), React 19, Tailwind 4, TypeScript.
Deployed as a Docker image to a VPS behind a shared nginx proxy.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in SMTP if you want the contact form to send
npm run dev
```

Other scripts: `npm run build`, `npm run start`, `npm run lint`.

## Where things live

Almost all copy and data is centralised, so most content changes touch no
components at all.

| Path | What |
| ---- | ---- |
| `content/site.ts` | **Single source of truth for NAP** — name, address, phone, geo, opening hours, brand colours |
| `i18n/nl.ts` | Every translatable string, plus page-level metadata |
| `content/nl/assortiment.ts` | The six homepage category cards |
| `content/nl/stijlen.ts` | Style pages (`/assortiment/<slug>`) |
| `content/nl/locaties.ts` | Regional pages (`/tegels-<plaats>`) |
| `content/nl/tegels.ts` | Carousel photos |
| `lib/seo.ts` | JSON-LD: LocalBusiness, WebSite, BreadcrumbList |
| `lib/env.ts` | `APP_ENV` — indexing and email safety |

Adding a tile style or a region is a content-only change: the route, sitemap and
hub pages all derive from these files.

## Things that will bite you

**`APP_ENV` is read at build *and* run time.** `robots.txt` and the robots
metadata are baked during `next build`; the mailer reads it per request. It is a
Docker build ARG *and* a runtime env. Unset means **non-production** on purpose,
so a forgotten value costs a noindexed site rather than an indexed acceptance
environment or a customer enquiry sent to a test inbox.

**`package-lock.json` must be regenerated on Linux**, not Windows, or `npm ci`
fails inside the image build. See the note in [DEPLOYMENT.md](DEPLOYMENT.md).

**Images are mostly placeholders.** Everything except `public/images/showroom.jpeg`
and `bedrijfsbus.jpeg` is Unsplash stock, flagged in the content files. The
Portfolio section is the one to fix first — it presents stock photos as the
company's own completed work.

**Location pages are a doorway-page risk.** They are only safe while each says
something genuinely different; near-identical pages differing by place name get
demoted. Measure the overlap before adding another.

## Deployment

Two environments, same box, same image recipe:

| Branch | URL |
| ------ | --- |
| `acceptance` | `acceptance.tegelhandelnelissen.nl` (basic auth, noindex, test email) |
| `main` | `www.tegelhandelnelissen.nl` |

Full detail, including the one-time proxy and certificate setup, is in
[DEPLOYMENT.md](DEPLOYMENT.md). Work in progress is tracked in [plans/](plans/).

## A note on this repo's Next.js version

See [AGENTS.md](AGENTS.md): this is a newer Next.js than most documentation and
training data assumes. Check `node_modules/next/dist/docs/` before relying on
remembered APIs.
