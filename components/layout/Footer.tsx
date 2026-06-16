import { Phone, Mail } from "lucide-react";
import { BRAND, FONT, site } from "@/content/site";
import { LogoSquares } from "@/components/brand/LogoSquares";
import type { Dictionary } from "@/i18n/dictionaries";

export function Footer({ dict, nav }: { dict: Dictionary["footer"]; nav: Dictionary["nav"] }) {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#1e2128" }}>
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <LogoSquares size={11} />
              <span style={{ fontFamily: FONT.heading, fontWeight: 800, fontSize: "1rem", letterSpacing: "0.06em", color: "#fff", textTransform: "uppercase" }}>
                Tegelhandel <span style={{ color: BRAND.yellow }}>Nelissen</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.62)" }}>
              {site.legalName}
              <br />
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}, {site.address.region}
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <a href={site.phoneHref} className="text-xs flex items-center gap-2" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.72)" }}>
                <Phone size={11} /> {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="text-xs flex items-center gap-2" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.72)" }}>
                <Mail size={11} /> {site.email}
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-4" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.58)" }}>
              {dict.navHeading}
            </p>
            <ul className="flex flex-col gap-2.5">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-xs text-left" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.72)" }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase mb-4" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.58)" }}>
              {dict.hoursHeading}
            </p>
            <div className="flex flex-col gap-3">
              <div
                className="p-3 text-xs"
                style={{ background: "rgba(242,194,0,0.1)", borderLeft: `2px solid ${BRAND.yellow}`, fontFamily: FONT.body, color: "rgba(255,255,255,0.68)", borderRadius: "0 2px 2px 0" }}
              >
                <strong className="block mb-1" style={{ color: "#fff" }}>{dict.tegelzetterTitle}</strong>
                {dict.tegelzetterValue}
              </div>
              <div
                className="p-3 text-xs"
                style={{ background: "rgba(27,98,200,0.1)", borderLeft: `2px solid ${BRAND.blue}`, fontFamily: FONT.body, color: "rgba(255,255,255,0.68)", borderRadius: "0 2px 2px 0" }}
              >
                <strong className="block mb-1" style={{ color: "#fff" }}>{dict.showroomTitle}</strong>
                Dinsdag <strong style={{ color: BRAND.yellow }}>15:00–19:00</strong>
                <br />
                <span style={{ color: "rgba(255,255,255,0.62)" }}>Overige dagen op afspraak</span>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t text-xs"
          style={{ borderColor: "rgba(255,255,255,0.08)", fontFamily: FONT.body, color: "rgba(255,255,255,0.55)" }}
        >
          <span>© {year} {site.legalName}. {dict.rightsReserved}</span>
          <span>{site.address.city}, {site.address.region}</span>
        </div>
      </div>
    </footer>
  );
}
