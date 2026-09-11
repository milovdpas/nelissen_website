"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { BRAND, FONT } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { useConsent, type ConsentCategories } from "./ConsentProvider";

export function CookieBanner({ dict }: { dict: Dictionary["cookies"] }) {
  const { ready, decided, settingsOpen, categories, save, acceptAll, rejectAll, closeSettings } = useConsent();
  const [showPrefs, setShowPrefs] = useState(false);
  const [draft, setDraft] = useState<ConsentCategories>(categories);

  // Keep the preference toggles in sync with the actual consent — after the
  // cookie is read, after Accept/Reject all, and when settings are reopened.
  useEffect(() => {
    setDraft(categories);
  }, [categories, settingsOpen]);

  // Render only after the cookie is read, and only when a choice is needed
  // or the visitor reopened the settings.
  if (!ready || (decided && !settingsOpen)) return null;

  const prefsOpen = showPrefs || settingsOpen;

  // Closing: if a choice was already made (reopened via footer) just close;
  // on a first visit, treat closing as "necessary only" so no non-essential
  // cookies load and the banner doesn't get stuck.
  const handleClose = () => (decided ? closeSettings() : rejectAll());

  const labelStyle = { fontFamily: FONT.body } as const;

  const toggleRow = (
    key: "necessary" | "analytics" | "media",
    title: string,
    desc: string,
    checked: boolean,
    disabled = false,
    onChange?: (v: boolean) => void,
  ) => (
    <div key={key} className="flex items-start gap-3 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-current"
        style={{ accentColor: BRAND.yellow }}
        aria-label={title}
      />
      <div>
        <p className="text-sm font-semibold" style={{ ...labelStyle, color: "#fff" }}>
          {title}
          {disabled && (
            <span className="ml-2 text-xs font-normal" style={{ color: BRAND.yellow }}>
              ({dict.always})
            </span>
          )}
        </p>
        <p className="text-xs mt-0.5" style={{ ...labelStyle, color: "rgba(255,255,255,0.7)" }}>
          {desc}
        </p>
      </div>
    </div>
  );

  const btnBase =
    "inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold focus:outline-none transition-colors duration-150";

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6" role="dialog" aria-modal="false" aria-label={dict.banner.title}>
      <div
        className="relative max-w-3xl mx-auto p-6 shadow-2xl"
        style={{ background: BRAND.anthracite, border: "1px solid rgba(255,255,255,0.14)", borderRadius: 4 }}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Sluiten"
          className="absolute top-3 right-3 p-1.5 focus:outline-none transition-colors"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold pr-8" style={{ fontFamily: FONT.heading, color: "#fff", letterSpacing: "0.02em", textTransform: "uppercase" }}>
          {dict.banner.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed" style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.78)" }}>
          {dict.banner.body}{" "}
          <Link href="/cookiebeleid" className="underline" style={{ color: BRAND.yellow }} onClick={closeSettings}>
            {dict.banner.privacyLink}
          </Link>
          .
        </p>

        {prefsOpen && (
          <div className="mt-4">
            {toggleRow("necessary", dict.categories.necessary.title, dict.categories.necessary.desc, true, true)}
            {toggleRow("analytics", dict.categories.analytics.title, dict.categories.analytics.desc, draft.analytics, false, (v) =>
              setDraft((d) => ({ ...d, analytics: v })),
            )}
            {toggleRow("media", dict.categories.media.title, dict.categories.media.desc, draft.media, false, (v) =>
              setDraft((d) => ({ ...d, media: v })),
            )}
          </div>
        )}

        <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:justify-end">
          {prefsOpen ? (
            <button onClick={() => save(draft)} className={`${btnBase} w-full sm:w-auto`} style={{ fontFamily: FONT.body, background: BRAND.yellow, color: BRAND.anthracite, borderRadius: 2 }}>
              {dict.banner.save}
            </button>
          ) : (
            <button
              onClick={() => {
                setDraft(categories);
                setShowPrefs(true);
              }}
              className={`${btnBase} w-full sm:w-auto`}
              style={{ fontFamily: FONT.body, background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: 2 }}
            >
              {dict.banner.preferences}
            </button>
          )}
          <button onClick={rejectAll} className={`${btnBase} w-full sm:w-auto`} style={{ fontFamily: FONT.body, background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.35)", borderRadius: 2 }}>
            {dict.banner.rejectAll}
          </button>
          <button onClick={acceptAll} className={`${btnBase} w-full sm:w-auto`} style={{ fontFamily: FONT.body, background: BRAND.yellow, color: BRAND.anthracite, borderRadius: 2 }}>
            {dict.banner.acceptAll}
          </button>
        </div>
      </div>
    </div>
  );
}
