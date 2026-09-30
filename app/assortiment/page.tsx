import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BRAND, FONT, site } from "@/content/site";
import { stijlen } from "@/content/nl/stijlen";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Contact } from "@/components/sections/Contact";

const dict = getDictionary(defaultLocale);

export const metadata: Metadata = {
  title: dict.assortimentPage.metaTitle,
  description: dict.assortimentPage.metaDescription,
  alternates: { canonical: "/assortiment" },
  openGraph: {
    title: dict.assortimentPage.metaTitle,
    description: dict.assortimentPage.metaDescription,
    url: `${site.url}/assortiment`,
  },
};

/**
 * Hub for the style pages. Editorial, not a catalogue: the showroom carries
 * 300–400 tiles with one or two of each and ranges are discontinued within a
 * year, so nothing here lists stock or prices. Everything funnels to a visit.
 */
export default function AssortimentHub() {
  return (
    <>
      <Nav dict={dict.nav} />
      <main>
        <header className="pt-32 pb-16" style={{ background: BRAND.anthracite }}>
          <div className="max-w-7xl mx-auto px-6">
            <h1
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
              {dict.assortimentPage.title}
            </h1>
            <p
              className="mt-5 max-w-2xl text-base leading-relaxed"
              style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.78)" }}
            >
              {dict.assortimentPage.intro}
            </p>
          </div>
        </header>

        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {stijlen.map((s) => (
                <Link
                  key={s.slug}
                  href={`/assortiment/${s.slug}`}
                  className="bg-card overflow-hidden group transition-shadow duration-200 hover:shadow-lg"
                  style={{ borderRadius: 2 }}
                >
                  <div className="relative overflow-hidden h-48">
                    <Image
                      src={s.cardUrl}
                      alt={s.cardAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h2
                      style={{
                        fontFamily: FONT.heading,
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        color: BRAND.anthracite,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {s.name}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed" style={{ fontFamily: FONT.body, color: "#6a6a6a" }}>
                      {s.intro}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>

        {/* The real contact section rather than a bespoke CTA block: someone who
            reaches the bottom of this page can act without navigating back to
            the homepage first. */}
        <Contact dict={dict.contact} mapDict={dict.cookies.map} />
      </main>
      <Footer dict={dict.footer} nav={dict.nav} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: dict.assortimentPage.name, path: "/assortiment" }])),
        }}
      />
    </>
  );
}
