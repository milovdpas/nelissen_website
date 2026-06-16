import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { BRAND, FONT, site } from "@/content/site";
import { SectionLabel } from "@/components/brand/SectionLabel";
import { ContactForm } from "@/components/ContactForm";
import type { Dictionary } from "@/i18n/dictionaries";

export function Contact({ dict }: { dict: Dictionary["contact"] }) {
  const details = [
    {
      icon: <MapPin size={17} style={{ color: BRAND.yellow }} />,
      label: dict.details.adres,
      value: `${site.address.street}\n${site.address.postalCode} ${site.address.city}\n${site.address.region}, ${site.address.country}`,
    },
    {
      icon: <Phone size={17} style={{ color: BRAND.yellow }} />,
      label: dict.details.telefoon,
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

  return (
    <section id="contact" className="py-24" style={{ background: BRAND.anthracite }}>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <ContactForm dict={dict} />
          </div>

          <div className="flex flex-col gap-5">
            <div className="p-6 flex flex-col gap-5" style={{ background: "rgba(255,255,255,0.05)", borderRadius: 2 }}>
              {details.map((item) => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="mt-0.5 shrink-0">{item.icon}</div>
                  <div>
                    <p className="text-xs font-semibold tracking-wide uppercase mb-1" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.38)" }}>
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
          </div>
        </div>

        {/* Full-width map below both columns */}
        <div className="mt-12 overflow-hidden" style={{ borderRadius: 2, height: 360 }}>
          <iframe
            title={dict.mapTitle}
            src={site.mapsEmbedUrl}
            width="100%"
            height="360"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
