import Image from "next/image";
import { BRAND, FONT } from "@/content/site";
import { SectionLabel } from "@/components/brand/SectionLabel";
import type { Dictionary } from "@/i18n/dictionaries";

export function Portfolio({ dict }: { dict: Dictionary["portfolio"] }) {
  return (
    <section id="portfolio" className="py-24 bg-background">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dict.items.map((item) => (
            <div key={item.url} className="overflow-hidden group relative" style={{ borderRadius: 2, height: 280 }}>
              <Image
                src={item.url}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 flex items-end p-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to top, rgba(44,48,56,0.85) 0%, transparent 60%)" }}
              >
                <span className="text-xs font-semibold tracking-wide text-white" style={{ fontFamily: FONT.body }}>
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
