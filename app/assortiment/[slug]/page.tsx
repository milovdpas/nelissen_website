import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { BRAND, FONT, site } from "@/content/site";
import { stijlen, getStijl } from "@/content/nl/stijlen";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { breadcrumbJsonLd } from "@/lib/seo";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { SectionLabel } from "@/components/brand/SectionLabel";
import { Contact } from "@/components/sections/Contact";
import { TegelCarousel } from "@/components/sections/TegelCarousel";

const dict = getDictionary(defaultLocale);

/** Static at build time — these pages have no per-request content. */
export function generateStaticParams() {
  return stijlen.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const stijl = getStijl(slug);
  if (!stijl) return {};

  return {
    title: stijl.metaTitle,
    description: stijl.metaDescription,
    // The root layout sets canonical "/", which every child inherits unless it
    // overrides — without this each style page would declare itself a duplicate
    // of the homepage.
    alternates: { canonical: `/assortiment/${stijl.slug}` },
    openGraph: {
      title: stijl.metaTitle,
      description: stijl.metaDescription,
      url: `${site.url}/assortiment/${stijl.slug}`,
      type: "article",
    },
  };
}

export default async function StijlPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stijl = getStijl(slug);
  if (!stijl) notFound();

  const siblings = stijlen.filter((s) => s.slug !== stijl.slug);

  return (
    <>
      <Nav dict={dict.nav} />
      <main>
        <header className="pt-32 pb-16" style={{ background: BRAND.anthracite }}>
          <div className="max-w-7xl mx-auto px-6">
            {/* Visible breadcrumb as well as the JSON-LD below: on a sub-page the
                nav alone does not show where you are. */}
            <nav aria-label={dict.assortimentPage.breadcrumbLabel} className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-xs" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.55)" }}>
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/assortiment" className="hover:underline">
                    {dict.assortimentPage.name}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" style={{ color: "rgba(255,255,255,0.85)" }}>
                  {stijl.name}
                </li>
              </ol>
            </nav>

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
              {stijl.title}
            </h1>
            <p
              className="mt-5 max-w-2xl text-base leading-relaxed"
              style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.78)" }}
            >
              {stijl.intro}
            </p>
          </div>
        </header>

        <section className="py-20 bg-background">
          <div className="max-w-3xl mx-auto px-6">
            {stijl.blocks.map((block) => (
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
            <SectionLabel>{dict.assortimentPage.suitableLabel}</SectionLabel>
            <ul className="mt-6 flex flex-col gap-3">
              {stijl.geschiktVoor.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={18} className="shrink-0 mt-0.5" style={{ color: BRAND.yellow }} />
                  <span className="text-base leading-relaxed" style={{ fontFamily: FONT.body, color: "#4f4e4a" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <TegelCarousel items={stijl.photos} dict={dict.assortiment.carousel} />
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="max-w-3xl mx-auto px-6">
            <SectionLabel>{dict.assortimentPage.siblingsLabel}</SectionLabel>
            {siblings.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-3">
                {siblings.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/assortiment/${s.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm"
                      style={{
                        fontFamily: FONT.body,
                        color: BRAND.anthracite,
                        background: "#fff",
                        border: "1px solid rgba(44,48,56,0.12)",
                        borderRadius: 2,
                      }}
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

          </div>
        </section>

        {/* Same contact section as the homepage: the article ends with "come and
            see it", so the form has to be right there rather than a page away. */}
        <Contact dict={dict.contact} mapDict={dict.cookies.map} />
      </main>
      <Footer dict={dict.footer} nav={dict.nav} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: dict.assortimentPage.name, path: "/assortiment" },
              { name: stijl.name, path: `/assortiment/${stijl.slug}` },
            ]),
          ),
        }}
      />
    </>
  );
}
