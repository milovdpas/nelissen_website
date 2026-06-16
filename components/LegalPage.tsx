import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BRAND, FONT } from "@/content/site";
import { LogoSquares } from "@/components/brand/LogoSquares";
import { Footer } from "@/components/layout/Footer";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { LegalDoc } from "@/content/nl/legal";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const dict = getDictionary(defaultLocale);

  return (
    <>
      {/* Simple header */}
      <header className="sticky top-0 z-50" style={{ background: BRAND.anthracite }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <LogoSquares size={11} />
            <span style={{ fontFamily: FONT.heading, fontWeight: 800, fontSize: "1.1rem", letterSpacing: "0.06em", color: "#fff", textTransform: "uppercase" }}>
              Tegelhandel <span style={{ color: BRAND.yellow }}>Nelissen</span>
            </span>
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.72)" }}>
            <ArrowLeft size={15} /> Terug naar website
          </Link>
        </div>
      </header>

      <main className="bg-background">
        <article className="max-w-3xl mx-auto px-6 py-20">
          <h1 style={{ fontFamily: FONT.heading, fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.1, color: BRAND.anthracite, textTransform: "uppercase", letterSpacing: "0.02em" }}>
            {doc.title}
          </h1>
          <p className="mt-3 text-sm" style={{ fontFamily: FONT.body, color: "#5f5e58" }}>
            Laatst bijgewerkt: {doc.updated}
          </p>

          {doc.intro.map((p, i) => (
            <p key={i} className="mt-5 text-base leading-relaxed" style={{ fontFamily: FONT.body, color: "#4a4a4a" }}>
              {p}
            </p>
          ))}

          {doc.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 style={{ fontFamily: FONT.heading, fontWeight: 700, fontSize: "1.4rem", color: BRAND.anthracite, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                {section.heading}
              </h2>
              {section.paragraphs?.map((p, i) => (
                <p key={i} className="mt-3 text-base leading-relaxed" style={{ fontFamily: FONT.body, color: "#4a4a4a" }}>
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="mt-3 flex flex-col gap-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0" style={{ background: BRAND.yellow }} />
                      <span className="text-base leading-relaxed" style={{ fontFamily: FONT.body, color: "#4a4a4a" }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>
      </main>

      <Footer dict={dict.footer} nav={dict.nav} />
    </>
  );
}
