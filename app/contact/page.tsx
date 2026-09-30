import type { Metadata } from "next";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { BRAND, FONT, site } from "@/content/site";
import { breadcrumbJsonLd } from "@/lib/seo";
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

        <Contact dict={dict.contact} mapDict={dict.cookies.map} />
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
