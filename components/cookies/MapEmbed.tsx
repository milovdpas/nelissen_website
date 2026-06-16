"use client";

import { MapPin } from "lucide-react";
import { BRAND, FONT, site } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { useConsent } from "./ConsentProvider";

/**
 * Google Maps embed gated behind "external media" consent. Until granted, a
 * placeholder is shown with a button that grants consent and loads the map.
 */
export function MapEmbed({ title, dict }: { title: string; dict: Dictionary["cookies"]["map"] }) {
  const { ready, categories, grant } = useConsent();

  if (ready && categories.media) {
    return (
      <div className="overflow-hidden" style={{ borderRadius: 2, height: 360 }}>
        <iframe
          title={title}
          src={site.mapsEmbedUrl}
          width="100%"
          height="360"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center text-center gap-3 px-6"
      style={{ borderRadius: 2, height: 360, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}
    >
      <MapPin size={28} style={{ color: BRAND.yellow }} />
      <p className="text-sm font-semibold" style={{ fontFamily: FONT.heading, color: "#fff", textTransform: "uppercase", letterSpacing: "0.03em" }}>
        {dict.title}
      </p>
      <p className="text-xs max-w-sm leading-relaxed" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.7)" }}>
        {dict.body}
      </p>
      <button
        type="button"
        onClick={() => grant("media")}
        className="mt-1 inline-flex items-center px-5 py-2.5 text-sm font-semibold focus:outline-none"
        style={{ fontFamily: FONT.body, background: BRAND.yellow, color: BRAND.anthracite, borderRadius: 2 }}
      >
        {dict.button}
      </button>
    </div>
  );
}
