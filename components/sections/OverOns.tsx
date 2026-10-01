import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { BRAND, FONT } from "@/content/site";
import { SectionLabel } from "@/components/brand/SectionLabel";
import type { Dictionary } from "@/i18n/dictionaries";

export function OverOns({ dict }: { dict: Dictionary["overOns"] }) {
  return (
    <section id="over-ons" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
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
              {dict.titleLine1}
              <br />
              <span style={{ color: BRAND.red }}>{dict.titleLine2}</span>
            </h2>

            {dict.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`${i === 0 ? "mt-6" : "mt-4"} text-base leading-relaxed`}
                style={{ fontFamily: FONT.body, color: "#4a4a4a" }}
              >
                {p}
              </p>
            ))}

            <ul className="mt-8 flex flex-col gap-3">
              {dict.checklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle size={17} className="mt-0.5 shrink-0" style={{ color: BRAND.yellow }} />
                  <span className="text-sm" style={{ fontFamily: FONT.body, color: "#4a4a4a" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full" style={{ background: BRAND.yellow, zIndex: 0, borderRadius: 2 }} />
            <div className="relative z-10 overflow-hidden h-[420px]" style={{ borderRadius: 2 }}>
              {/* Eager, not lazy. This section only renders on /over-ons, where
                  the page header above it is plain text on a flat colour — so
                  on a desktop this photo is both above the fold and the LCP
                  element, and next/image's default lazy loading means it is not
                  discovered until after layout. Next flags exactly this case.

                  `loading="eager"` rather than `priority`: priority also emits a
                  preload link, and on a phone the grid is single-column, so the
                  photo sits well below a title, three paragraphs and a
                  checklist. Preloading it there would pull a large image to the
                  front of the queue ahead of content the visitor can actually
                  see. Eager fixes the desktop discovery delay without taking
                  that trade. */}
              <Image
                src="/images/bedrijfsbus.jpeg"
                alt={dict.imageAlt}
                fill
                quality={60}
                loading="eager"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
