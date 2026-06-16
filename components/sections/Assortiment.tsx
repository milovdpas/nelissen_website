import Image from "next/image";
import { BRAND, FONT } from "@/content/site";
import { SectionLabel } from "@/components/brand/SectionLabel";
import type { Dictionary } from "@/i18n/dictionaries";

export function Assortiment({ dict }: { dict: Dictionary["assortiment"] }) {
  return (
    <section id="assortiment" className="py-24" style={{ background: "#eeecea" }}>
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
          {dict.items.map((item) => (
            <div
              key={item.label}
              className="bg-card overflow-hidden group transition-shadow duration-200 hover:shadow-lg"
              style={{ borderRadius: 2 }}
            >
              <div className="relative overflow-hidden h-48">
                <Image
                  src={item.url}
                  alt={item.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
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
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-center" style={{ fontFamily: FONT.body, color: "#7a7873" }}>
          {dict.footnotePrefix}
          <strong>{dict.footnoteStrong}</strong>
        </p>
      </div>
    </section>
  );
}
