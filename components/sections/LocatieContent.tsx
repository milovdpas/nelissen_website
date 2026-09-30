import Link from "next/link";
import { MapPin } from "lucide-react";
import { BRAND, FONT } from "@/content/site";
import type { Locatie } from "@/content/nl/locaties";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/brand/SectionLabel";
import { Contact } from "@/components/sections/Contact";

const dict = getDictionary(defaultLocale);

/**
 * Shared body for the location pages.
 *
 * The routes are explicit folders (app/tegels-oss, app/tegels-berghem) rather
 * than a dynamic segment: a `[slug]` at the root would shadow every future
 * top-level route, and the URL shape competitors use in this region is
 * /tegels-<plaats>, not /tegels/<plaats>. Each route file is then three lines.
 */
export function LocatieContent({ locatie }: { locatie: Locatie }) {

  return (
    <>
      <Nav dict={dict.nav} />
      <main>
        <header className="pt-32 pb-16" style={{ background: BRAND.anthracite }}>
          <div className="max-w-7xl mx-auto px-6">
            <SectionLabel>{locatie.plaats}</SectionLabel>
            <h1
              className="mt-4"
              style={{
                fontFamily: FONT.heading,
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 5.5vw, 3.5rem)",
                lineHeight: 1.05,
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
              }}
            >
              {locatie.title}
            </h1>
            <p
              className="mt-5 max-w-2xl text-base leading-relaxed"
              style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.78)" }}
            >
              {locatie.intro}
            </p>
          </div>
        </header>

        <section className="py-20 bg-background">
          <div className="max-w-3xl mx-auto px-6">
            {locatie.blocks.map((block) => (
              <div key={block.heading} className="mb-12 last:mb-0">
                <h2
                  style={{
                    fontFamily: FONT.heading,
                    fontWeight: 800,
                    fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                    color: BRAND.anthracite,
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    lineHeight: 1.15,
                  }}
                >
                  {block.heading}
                </h2>
                {block.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 40)}
                    className="mt-4 text-base leading-relaxed"
                    style={{ fontFamily: FONT.body, color: "#4f4e4a" }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 bg-secondary">
          <div className="max-w-3xl mx-auto px-6">
            <SectionLabel>{dict.locatiePage.praktischLabel}</SectionLabel>
            <ul className="mt-6 flex flex-col gap-3">
              {locatie.praktisch.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <MapPin size={17} className="shrink-0 mt-1" style={{ color: BRAND.yellow }} />
                  <span className="text-base leading-relaxed" style={{ fontFamily: FONT.body, color: "#4f4e4a" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Deliberately NO links to the other location pages. A visitor in
                Oss does not care about Nistelrode, and every regional page
                linking to every other builds exactly the tight cluster of
                near-identical pages that marks a doorway scheme. The footer
                carries them once, which is enough for discovery. */}
            <div className="mt-10">
              <Link
                href="/assortiment"
                className="inline-flex items-center px-4 py-2 text-sm"
                style={{
                  fontFamily: FONT.body,
                  color: BRAND.anthracite,
                  background: "#fff",
                  border: "1px solid rgba(44,48,56,0.12)",
                  borderRadius: 2,
                }}
              >
                {dict.locatiePage.assortimentLink}
              </Link>
            </div>
          </div>
        </section>

        <Contact dict={dict.contact} mapDict={dict.cookies.map} />
      </main>
      <Footer dict={dict.footer} nav={dict.nav} />
    </>
  );
}
