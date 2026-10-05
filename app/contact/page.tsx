import type { Metadata } from "next";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { BRAND, FONT, site } from "@/content/site";
import Link from "next/link";
import { breadcrumbJsonLd, ogImages } from "@/lib/seo";
import { locaties } from "@/content/nl/locaties";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/brand/SectionLabel";
import { Contact } from "@/components/sections/Contact";

const dict = getDictionary(defaultLocale);

export const metadata: Metadata = {
  title: dict.contactPage.metaTitle,
  description: dict.contactPage.metaDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: dict.contactPage.metaTitle,
    description: dict.contactPage.metaDescription,
    url: `${site.url}/contact`,
    images: ogImages(dict.contactPage.metaTitle),
  },
};

/**
 * A dedicated contact page, which is a strong local-SEO target: people search
 * for "tegelhandel Berghem adres" and "openingstijden" as often as they search
 * for tiles, and those queries want a page, not an anchor halfway down the
 * homepage.
 *
 * The form, details and map are the same shared Contact section the homepage
 * uses. That is deliberate — a form is not indexable content, so there is
 * nothing to duplicate; the heading and intro above it differ, which is what
 * search engines actually read.
 */
export default function ContactPage() {
  return (
    <>
      <Nav dict={dict.nav} />
      <main>
        {/* The Contact section opens at h2, so the page supplies the h1. */}
        <header className="pt-32 pb-16" style={{ background: BRAND.anthracite }}>
          <div className="max-w-7xl mx-auto px-6">
            <SectionLabel>{dict.contactPage.label}</SectionLabel>
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
              {dict.contactPage.title}
            </h1>
            <p
              className="mt-5 max-w-2xl text-base leading-relaxed"
              style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.78)" }}
            >
              {dict.contactPage.intro}
            </p>
          </div>
        </header>

        {/* heading={false}: the header above already carries the label, the
            title and the intro, on this same anthracite. With the section's own
            label and h2 as well the page opened with two yellow squares and two
            uppercase titles saying nearly the same thing. */}
        <Contact dict={dict.contact} mapDict={dict.cookies.map} heading={false} />

        {/* Below the form and the map on purpose: the form is the conversion,
            and this is what you read once you have decided to come. It is also
            the page's only h2, since everything above it is the page header and
            a form, and it lifts the thinnest real page on the site off 235
            words. The regio links point at the location pages, which otherwise
            are only reachable from the sitemap and the footer. */}
        <section className="py-20 bg-background">
          {/* max-w-3xl rather than the usual max-w-7xl: this is a block of
              running prose, and a 1280px measure is unreadable. Only one
              max-w-* here on purpose, since two are resolved by stylesheet
              order rather than the order they are written. */}
          <div className="max-w-3xl mx-auto px-6">
            <SectionLabel>{dict.contactPage.bezoek.label}</SectionLabel>
            <h2
              className="mt-4"
              style={{
                fontFamily: FONT.heading,
                fontWeight: 800,
                fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                lineHeight: 1.1,
                color: BRAND.anthracite,
                textTransform: "uppercase",
                letterSpacing: "0.02em",
              }}
            >
              {dict.contactPage.bezoek.title}
            </h2>

            {dict.contactPage.bezoek.paragraphs.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="mt-5 text-base leading-relaxed"
                style={{ fontFamily: FONT.body, color: "#4a4a4a" }}
              >
                {p}
              </p>
            ))}

            <p className="mt-8 text-sm" style={{ fontFamily: FONT.body, color: "#6a6a6a" }}>
              {dict.contactPage.bezoek.regioLabel}
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
              {locaties.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/${l.slug}`}
                    className="text-sm font-semibold hover:underline"
                    style={{ fontFamily: FONT.body, color: BRAND.anthracite }}
                  >
                    {l.plaats}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer dict={dict.footer} nav={dict.nav} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: dict.contactPage.label, path: "/contact" }])),
        }}
      />
    </>
  );
}
