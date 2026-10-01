import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { BRAND, FONT } from "@/content/site";
import { SectionLabel } from "@/components/brand/SectionLabel";
import { ButtonLink } from "@/components/ui/Button";
import type { Dictionary } from "@/i18n/dictionaries";

/**
 * The showroom itself — the one thing the site was never actually selling.
 *
 * It said *when* (Openingstijden) and *where* (the map in Contact) but never
 * what the visit is like, which is the whole conversion: Mark's position is that
 * customers want to see a tile in person, so the page has to make walking in
 * feel worth it.
 *
 * Two variants on purpose. The homepage gets the full block; /over-ons gets a
 * short closing CTA. Rendering the same prose on both pages would reintroduce
 * exactly the duplicate content that moving sections (rather than copying them)
 * was meant to avoid.
 *
 * The CTA is an on-page anchor, not a link to /contact. Both pages that render
 * this section also render the Contact section directly below it, so sending
 * someone to another page would walk them away from the form they are being
 * asked to fill in. If this section is ever used on a page without a Contact
 * section, that anchor needs to become a prop.
 *
 * The photo is the showroom interior from the batch Tom supplied, which also
 * settles the clash this comment used to record: the section previously reused
 * public/images/showroom.jpeg, still the hero background and the OG image, so
 * the same shot appeared twice on the homepage.
 *
 * Interim, by Milo's call: the showroom is being rebuilt, so this shows the
 * premises as they were. Replace it once Mark supplies photos of the finished
 * room, and prefer a wide shot of the racks over a close-up of tiles — the
 * point of the section is what the visit is like, not what is on the shelves.
 */
export function Showroom({
  dict,
  variant = "full",
  body,
}: {
  dict: Dictionary["showroom"];
  variant?: "full" | "compact";
  /**
   * Overrides the compact body copy. The style pages pass a line about that
   * specific style — eight pages closing with the same two sentences would read
   * as boilerplate, and each style has a different reason why a screen does not
   * do it justice.
   */
  body?: string;
}) {
  if (variant === "compact") {
    return (
      <section id="showroom" className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionLabel>{dict.label}</SectionLabel>
              <h2
                className="mt-4"
                style={{
                  fontFamily: FONT.heading,
                  fontWeight: 800,
                  fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
                  color: BRAND.anthracite,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                  lineHeight: 1.1,
                }}
              >
                {dict.compactTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed" style={{ fontFamily: FONT.body, color: "#4f4e4a" }}>
                {body ?? dict.compactBody}
              </p>
              <div className="mt-6">
                <ButtonLink href="#contact">
                  {dict.cta} <ArrowRight size={15} />
                </ButtonLink>
              </div>
            </div>

            <div className="relative h-64 lg:h-72 overflow-hidden" style={{ borderRadius: 2 }}>
              <Image
                src="/images/showroom/thumbnail.jpg"
                alt={dict.imageAlt}
                fill
                quality={60}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="showroom" className="py-24" style={{ background: BRAND.anthracite }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionLabel light>{dict.label}</SectionLabel>
            <h2
              className="mt-4"
              style={{
                fontFamily: FONT.heading,
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#fff",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
                lineHeight: 1.1,
              }}
            >
              {dict.title}
            </h2>

            {dict.paragraphs.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="mt-5 text-base leading-relaxed"
                style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.75)" }}
              >
                {p}
              </p>
            ))}

            <ul className="mt-8 flex flex-col gap-3">
              {dict.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <Check size={18} className="shrink-0 mt-0.5" style={{ color: BRAND.yellow }} />
                  <span className="text-sm leading-relaxed" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.85)" }}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <ButtonLink href="#contact">
                {dict.cta} <ArrowRight size={15} />
              </ButtonLink>
            </div>
          </div>

          <div className="relative h-80 lg:h-[26rem] overflow-hidden" style={{ borderRadius: 2 }}>
            {/* Offset brand block behind the photo, same treatment as OverOns. */}
            <div
              className="absolute -top-4 -left-4 w-full h-full"
              style={{ background: BRAND.yellow, zIndex: 0, borderRadius: 2 }}
            />
            <Image
              src="/images/showroom/thumbnail.jpg"
              alt={dict.imageAlt}
              fill
              quality={60}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              style={{ zIndex: 1 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
