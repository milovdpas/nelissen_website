import { BRAND, FONT } from "@/content/site";
import { SectionLabel } from "@/components/brand/SectionLabel";
import type { Dictionary } from "@/i18n/dictionaries";

export function Diensten({ dict }: { dict: Dictionary["diensten"] }) {
  return (
    <section id="diensten" className="py-24" style={{ background: BRAND.anthracite }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14">
          <SectionLabel light>{dict.label}</SectionLabel>
          <h2
            style={{
              fontFamily: FONT.heading,
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.1,
              color: "#fff",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            {dict.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {dict.items.map((d) => (
            <div
              key={d.title}
              className="p-8 flex flex-col gap-5 transition-transform duration-200 hover:-translate-y-1"
              style={{ background: "rgba(255,255,255,0.05)", borderRadius: 2, border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="w-10 h-1" style={{ background: d.accent }} />
              <h3
                style={{
                  fontFamily: FONT.heading,
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  color: "#fff",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                }}
              >
                {d.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.62)" }}>
                {d.desc}
              </p>
              <ul className="flex flex-col gap-2 mt-auto">
                {d.points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: d.accent }} />
                    <span className="text-xs" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.5)" }}>
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
