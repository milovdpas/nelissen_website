import { Phone, Clock, MapPin, CalendarDays } from "lucide-react";
import { BRAND, FONT } from "@/content/site";
import { SectionLabel } from "@/components/brand/SectionLabel";
import type { Dictionary } from "@/i18n/dictionaries";

export function Openingstijden({ dict }: { dict: Dictionary["openingstijden"] }) {
  return (
    <section id="openingstijden" className="py-24 bg-background">
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
          <p className="mt-4 text-sm max-w-xl" style={{ fontFamily: FONT.body, color: "#5f5e58" }}>
            {dict.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* ── Tegelzettersbedrijf ── */}
          <div
            className="flex flex-col"
            style={{ background: "#fff", border: "1px solid rgba(44,48,56,0.1)", borderTop: `3px solid ${BRAND.yellow}`, borderRadius: 2 }}
          >
            <div className="px-8 pt-7 pb-5 flex items-start gap-4 border-b" style={{ borderColor: "rgba(44,48,56,0.07)" }}>
              <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background: BRAND.yellow, borderRadius: 2 }}>
                <CalendarDays size={18} style={{ color: BRAND.anthracite }} />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: FONT.heading,
                    fontWeight: 800,
                    fontSize: "1.3rem",
                    color: BRAND.anthracite,
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    lineHeight: 1.15,
                  }}
                >
                  {dict.tegelzetter.title}
                </h3>
                <p className="text-xs mt-1" style={{ fontFamily: FONT.body, color: "#5f5e58" }}>
                  {dict.tegelzetter.subtitle}
                </p>
              </div>
            </div>

            <div className="px-8 py-6 flex flex-col gap-0">
              {dict.tegelzetter.rows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between py-3.5 border-b last:border-b-0"
                  style={{ borderColor: "rgba(44,48,56,0.06)" }}
                >
                  <span className="text-sm font-medium" style={{ fontFamily: FONT.body, color: BRAND.anthracite }}>
                    {row.label}
                  </span>
                  <span className="text-sm font-semibold" style={{ fontFamily: FONT.body, color: row.highlight ? BRAND.anthracite : "#767676" }}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="mt-auto mx-8 mb-7 px-4 py-3 flex items-center gap-3 text-xs"
              style={{ background: "rgba(242,194,0,0.12)", borderRadius: 2, fontFamily: FONT.body, color: "#5a5000" }}
            >
              <Phone size={13} className="shrink-0" />
              {dict.tegelzetter.note}
            </div>
          </div>

          {/* ── Showroom ── */}
          <div
            className="flex flex-col"
            style={{ background: "#fff", border: "1px solid rgba(44,48,56,0.1)", borderTop: `3px solid ${BRAND.blue}`, borderRadius: 2 }}
          >
            <div className="px-8 pt-7 pb-5 flex items-start gap-4 border-b" style={{ borderColor: "rgba(44,48,56,0.07)" }}>
              <div className="w-10 h-10 flex items-center justify-center shrink-0" style={{ background: BRAND.blue, borderRadius: 2 }}>
                <Clock size={18} style={{ color: "#fff" }} />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: FONT.heading,
                    fontWeight: 800,
                    fontSize: "1.3rem",
                    color: BRAND.anthracite,
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    lineHeight: 1.15,
                  }}
                >
                  {dict.showroom.title}
                </h3>
                <p className="text-xs mt-1" style={{ fontFamily: FONT.body, color: "#5f5e58" }}>
                  {dict.showroom.subtitle}
                </p>
              </div>
            </div>

            <div className="px-8 py-6 flex flex-col gap-0">
              {/* Highlighted day */}
              <div
                className="flex items-center justify-between py-3.5 px-4 -mx-4 rounded border-b"
                style={{ background: "rgba(27,98,200,0.06)", borderColor: "rgba(44,48,56,0.06)", borderRadius: 2, marginBottom: 2 }}
              >
                <span className="text-sm font-semibold" style={{ fontFamily: FONT.body, color: BRAND.anthracite }}>
                  {dict.showroom.highlightDay}
                </span>
                <span
                  className="text-sm font-bold px-2.5 py-0.5"
                  style={{ fontFamily: FONT.body, color: "#fff", background: BRAND.blue, borderRadius: 2 }}
                >
                  {dict.showroom.highlightHours}
                </span>
              </div>

              {dict.showroom.rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between py-3.5 ${i < dict.showroom.rows.length - 1 ? "border-b" : ""}`}
                  style={{ borderColor: "rgba(44,48,56,0.06)" }}
                >
                  <span className="text-sm font-medium" style={{ fontFamily: FONT.body, color: BRAND.anthracite }}>
                    {row.label}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ fontFamily: FONT.body, color: row.value === "Gesloten" ? "#767676" : "#5f5e58" }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="mt-auto mx-8 mb-7 px-4 py-3 flex items-center gap-3 text-xs"
              style={{ background: "rgba(27,98,200,0.07)", borderRadius: 2, fontFamily: FONT.body, color: "#1b3a6e" }}
            >
              <MapPin size={13} className="shrink-0" />
              <span>
                {dict.showroom.noteLead}
                <strong className="mx-1">{dict.showroom.noteStrong}</strong>
                {dict.showroom.noteTail}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
