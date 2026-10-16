# Open with Mark and Tom

Things waiting on the client, not on code. Kept here because they were scattered
across `ROADMAP.md`, code comments and WhatsApp.

Decisions already *made* are not here. Those live next to the code they govern
(`services.ts`, `stijlen.ts`, `tegels.ts`) and in `ROADMAP.md` under
"Ruled out — do not re-propose".

Last updated: 16 October 2026. Site went live 9 October.

---

## Decisions needed

### 1. House number: 2 or 2b?

The site says **2b** everywhere, and Gemini now quotes it from us. Trustoo lists
**2**. Mismatched NAP is one of the few things that actively undercuts local
ranking, and it is what AI assistants cross-check a business against.

Needs the number on the Google Business Profile as the source of truth, then the
directories corrected to match. Settle the number, then fix everything else to it.

### 2. Do they sell restpartijen or einde-serie tiles?

This decides a real content question, so it is the most useful answer to get.

Google flags our page with **"Bevat niet: goedkope/ betaalbare"** on price
queries. Competitors rank there because they say so explicitly: De Koning
("goedkope tegels in onze tegeloutlet"), Groot in Tegels ("scherp geprijsd"),
Van Rossum ("de scherpste prijs").

The site currently has no price language at all except `locaties.ts:79`, which
says the opposite: *"op prijs alleen wint niemand"*.

- **If yes** → honest price/voorraad copy opens a query class we cannot touch today.
- **If no** → leave the positioning alone. It is coherent, and the €10/m²
  restpartij hunter is not the customer Mark described wanting.

Do not write price copy without this answer. Inventing a price claim is the one
mistake that is hard to walk back.

### 3. How specific can we be about prices?

Google's "Meer om te vragen" box on that query names the questions it wants
answered:

- Wat kost een goede tegelzetter per uur?
- Wat is een normale prijs voor tegels?
- Wat is het uurtarief van een tegelzetter in 2026?

None are answered anywhere on the site. Explaining what *drives* tile price
(format, rectified edges, finish, cutting waste on a visgraat pattern) is honest
expertise that matches budget intent without claiming to be cheap. Whether to
name actual figures is Mark's call.

---

## Photos owed

| # | What | Blocks |
|---|---|---|
| 1 | Voorraad **in the showroom** | The Voorraad card still shows warehouse pallets. Mark offered these on 2 Oct, never arrived |
| 2 | Three handvorm originals (below) | Three photos held out of the carousel |
| 3 | Anything of a **terras** | `/assortiment/terrastegels` is written and `active: false` purely for this |
| 4 | One more **decortegel** | That page has 2 photos where the others have 3-4 |
| 5 | Showroom after the verbouwing | `Showroom.tsx` uses a pre-rebuild photo |

The three unusable handvorm files, all in `public/images/handvorm-tegels/`:

| File | Problem | Shows |
|---|---|---|
| `5a20db2a-0b07-4a48-a5ff-edf8cf4e9f56.jpg` | screenshot (945×2048) | visgraat under a sloping roof, laser against the wall |
| `b7acab61-e9aa-4e94-8de7-4cb9f34960c1.jpg` | 372×679, far too small | pink handvorm in visgraat |
| `cb40ece2-cc85-4b59-8371-b196eb57e9d0.jpg` | screenshot (945×2048) | dark green handvorm in visgraat, trestles in front |

Ask for these **by email, not WhatsApp** — WhatsApp recompresses and we get the
same problem back.

---

## Google reviews

The single biggest lever, and no site change substitutes for it. From what the
AI tools show side by side:

| | Rating |
|---|---|
| **Nelissen** | 5,0 **(1)** |
| De Koning | 4,8 (43) |
| Rob van de Boer | 4,4 (24) |
| Groot in Tegels | 5,0 (15) |
| Kling Ceramics | 4,6 (11) |
| Van Rossum | 5,0 (11) |

The 5,0 is the highest score on the list and counts for nothing at n=1.

It is also visible on the search page itself: Nelissen ranks 3rd organic and 2nd
in Google's AI Overview, while the knowledge panel beside those results belongs
to Groot in Tegels. That panel is driven by the Business Profile, not the site,
so **no amount of page work moves it.**

**Google Business Profile → "Vraag om beoordelingen"** gives a short
`g.page/r/…/review` link. Worth saving as a WhatsApp quick reply, and printing
on a card for the showroom once the rebuild is done. Timing matters more than
wording: the ask lands while the tiler is packing up and the customer is looking
at a finished floor.

`ROADMAP.md` has an automated post-job review email specced out if the manual ask
does not stick.

---

## Where things stand, for context in the room

Seven days after launch: 19 pages indexable, Lighthouse SEO 100 on mobile and
desktop, performance 93 mobile / 95 desktop, CLS 0. Gemini names Nelissen first
and quotes the site's own opening hours back. Google puts it 2nd in the AI
Overview.

ChatGPT does not mention it on any price-led query, and across three tests it
treats these as outlet questions. That is a positioning difference, not a defect.
