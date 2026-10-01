import Link from "next/link";
import Image from "next/image";
import { BRAND, FONT } from "@/content/site";
import { SectionLabel } from "@/components/brand/SectionLabel";
import { focusPosition } from "@/content/nl/image-focus";
import { TegelCarousel } from "@/components/sections/TegelCarousel";
import type { Dictionary } from "@/i18n/dictionaries";

export function Assortiment({ dict }: { dict: Dictionary["assortiment"] }) {
  return (
    <section id="assortiment" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <SectionLabel>{dict.label}</SectionLabel>
          <h2
            style={{
              fontFamily: FONT.heading,
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.1,
              color: BRAND.anthracite,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            {dict.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Every card is a link: `href` is required on AssortimentItem, so a
              category added without a destination fails the typecheck instead
              of shipping as the one dead card among six. */}
          {dict.items.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className="bg-card overflow-hidden group transition-shadow duration-200 hover:shadow-lg block"
              style={{ borderRadius: 2 }}
            >
              <div className="relative overflow-hidden h-48">
                <Image
                  src={item.url}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: focusPosition(item.focus) }}
                />
              </div>
              <div className="p-5">
                <h3
                  style={{
                    fontFamily: FONT.heading,
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: BRAND.anthracite,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.label}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ fontFamily: FONT.body, color: "#6a6a6a" }}>
                  {item.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* A "Toon hele assortiment" button used to sit here, bottom-right.
            Removed until the hub carries categories this page does not already
            show; see ROADMAP.md. */}

        {/* Cards → carousel → showroom line reads as a funnel: what we sell, a
            taste of the range, come and see it. mt-5 matches the grid's gap-5,
            so the step from the last row of cards into the carousel is the same
            as the gap between card rows. */}
        <div className="mt-5">
          <TegelCarousel items={dict.carouselItems} dict={dict.carousel} />
        </div>

        <p className="mt-10 text-sm text-center" style={{ fontFamily: FONT.body, color: "#5f5e58" }}>
          {dict.footnotePrefix}
          <strong>{dict.footnoteStrong}</strong>
        </p>
      </div>
    </section>
  );
}
