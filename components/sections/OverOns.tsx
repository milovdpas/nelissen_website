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
            <div className="relative z-10 overflow-hidden" style={{ borderRadius: 2 }}>
              <Image
                src="/images/bedrijfsbus.jpeg"
                alt={dict.imageAlt}
                width={760}
                height={420}
                quality={60}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
