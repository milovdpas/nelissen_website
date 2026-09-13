import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BRAND, FONT } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { LogoSquares } from "@/components/brand/LogoSquares";
import type { Dictionary } from "@/i18n/dictionaries";

export function Hero({ dict }: { dict: Dictionary["hero"] & { imageAlt: string } }) {
  return (
    <section id="hero" className="relative flex items-end" style={{ background: BRAND.anthracite, minHeight: "100svh" }}>
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/showroom.jpeg"
          alt={dict.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          style={{ opacity: 0.42 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${BRAND.anthracite} 0%, rgba(44,48,56,0.65) 50%, rgba(44,48,56,0.25) 100%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 pt-32 w-full">
        <div className="flex items-center gap-2 mb-7">
          <LogoSquares size={14} />
        </div>

        <h1
          style={{
            fontFamily: FONT.heading,
            fontWeight: 800,
            fontSize: "clamp(2.8rem, 7.5vw, 5.5rem)",
            lineHeight: 1.0,
            color: "#fff",
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            maxWidth: "18ch",
          }}
        >
          {dict.titleLine1}
          <br />
          <span style={{ color: BRAND.yellow }}>{dict.titleLine2}</span>
        </h1>

        <p className="mt-6 max-w-lg text-base leading-relaxed" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.75)" }}>
          {dict.body}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="#contact">
            {dict.ctaPrimary} <ArrowRight size={15} />
          </ButtonLink>
          <ButtonLink href="#openingstijden" variant="outline">
            {dict.ctaSecondary}
          </ButtonLink>
        </div>

        <div className="mt-16 flex flex-wrap gap-8 border-t pt-8" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          {dict.stats.map((s) => (
            <div key={s.label}>
              <p style={{ fontFamily: FONT.heading, fontWeight: 800, fontSize: "1.8rem", color: BRAND.yellow, lineHeight: 1 }}>
                {s.num}
              </p>
              <p className="text-xs mt-1" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.72)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
