import type { Metadata } from "next";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { BRAND, FONT } from "@/content/site";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/brand/SectionLabel";
import { OverOns } from "@/components/sections/OverOns";
import { Diensten } from "@/components/sections/Diensten";
import { Portfolio } from "@/components/sections/Portfolio";
import { Contact } from "@/components/sections/Contact";

const dict = getDictionary(defaultLocale);

export const metadata: Metadata = {
  title: dict.overOnsPage.metaTitle,
  description: dict.overOnsPage.metaDescription,
  // The root layout sets canonical "/" and every child inherits it unless it
  // says otherwise, which would point this page at the homepage.
  alternates: { canonical: "/over-ons" },
};

/**
 * Over ons, Diensten and Portfolio, lifted off the homepage.
 *
 * They were *moved*, not copied. The homepage now leads on the showroom and the
 * tile range — the business has more than enough tile-setting work — and these
 * three sections are what a visitor reads once they want to know who is behind
 * it. Moving rather than duplicating also means no two pages compete for the
 * same words.
 *
 * Each section is a self-contained server component taking one dictionary
 * slice, so this page is just a different arrangement of the same parts.
 */
export default function OverOnsPage() {
  return (
    <>
      <Nav dict={dict.nav} />
      <main>
        {/* The three sections below all open at h2 — they were built to sit
            under the homepage hero's h1 — so the page supplies its own. */}
        <header className="pt-32 pb-16" style={{ background: BRAND.anthracite }}>
          <div className="max-w-7xl mx-auto px-6">
            <SectionLabel>{dict.overOnsPage.label}</SectionLabel>
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
              {dict.overOnsPage.title}
            </h1>
            <p
              className="mt-5 max-w-2xl text-base leading-relaxed"
              style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.75)" }}
            >
              {dict.overOnsPage.intro}
            </p>
          </div>
        </header>

        <OverOns dict={dict.overOns} />
        <Diensten dict={dict.diensten} />
        <Portfolio dict={dict.portfolio} />

        {/* Consistent with the other sub-pages: reach the bottom, act there. */}
        <Contact dict={dict.contact} mapDict={dict.cookies.map} />
      </main>
      <Footer dict={dict.footer} nav={dict.nav} />
    </>
  );
}
