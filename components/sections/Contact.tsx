import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { BRAND, FONT, site } from "@/content/site";
import { SectionLabel } from "@/components/brand/SectionLabel";
import { ContactForm } from "@/components/ContactForm";
import { MapEmbed } from "@/components/cookies/MapEmbed";
import type { Dictionary } from "@/i18n/dictionaries";

export function Contact({
  dict,
  mapDict,
  heading = true,
}: {
  dict: Dictionary["contact"];
  mapDict: Dictionary["cookies"]["map"];
  /**
   * Render the section's own label and h2.
   *
   * /contact passes false. Its page header is immediately above this section,
   * carries the same label ("Contact"), a title that all but contains this
   * one ("Kom langs of neem contact op." against "Neem contact op.") and the
   * same anthracite background, so the two ran together as one dark block with
   * two yellow squares and two uppercase titles in it. That reads as a mistake
   * rather than a hierarchy.
   *
   * Every other page has a section between its header and this one, so they
   * keep the heading: there it is the thing that announces the section.
   */
  heading?: boolean;
}) {
  const details = [
    {
      icon: <MapPin size={17} style={{ color: BRAND.yellow }} />,
      label: dict.details.address,
      value: `${site.address.street}\n${site.address.postalCode} ${site.address.city}\n${site.address.region}, ${site.address.country}`,
    },
    {
      icon: <Phone size={17} style={{ color: BRAND.yellow }} />,
      label: dict.details.phone,
      value: site.phone,
      href: site.phoneHref,
    },
    {
      icon: <Mail size={17} style={{ color: BRAND.yellow }} />,
      label: dict.details.email,
      value: site.email,
      href: `mailto:${site.email}`,
    },
    {
      icon: <Clock size={17} style={{ color: BRAND.yellow }} />,
      label: dict.details.showroom,
      value: dict.details.showroomValue,
    },
  ];

  // Without its own heading this sits directly under a page header of the same
  // colour, so it drops the top padding and lets the header's pb-16 be the gap.
  // Keeping py-24 as well would open a 160px hole between the intro and the
  // form that read as a missing element.
  return (
    <section
      id="contact"
      className={heading ? "py-24" : "pb-24"}
      style={{ background: BRAND.anthracite }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {heading ? (
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
        ) : null}

        <ContactForm
          dict={dict}
          aside={
            <div className="p-6 flex flex-col gap-5 h-full" style={{ background: "rgba(255,255,255,0.05)", borderRadius: 2 }}>
              {details.map((item) => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="mt-0.5 shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide uppercase mb-1" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.6)" }}>
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm whitespace-pre-line"
                        style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.82)" }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm whitespace-pre-line" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.82)" }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          }
        />

        {/* Full-width map below both columns (consent-gated) */}
        <div className="mt-12">
          <MapEmbed title={dict.mapTitle} dict={mapDict} />
        </div>
      </div>
    </section>
  );
}
