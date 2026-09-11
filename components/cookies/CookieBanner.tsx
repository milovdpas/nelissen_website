"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { BRAND, FONT } from "@/content/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { useConsent, type ConsentCategories } from "./ConsentProvider";

const BTN =
  "inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold focus:outline-none transition-colors duration-150 w-full sm:w-auto";

const PRIMARY_BTN: React.CSSProperties = {
  fontFamily: FONT.body,
  background: BRAND.yellow,
  color: BRAND.anthracite,
  borderRadius: 2,
};

const OUTLINE_BTN: React.CSSProperties = {
  fontFamily: FONT.body,
  background: "transparent",
  color: "#fff",
  border: "1.5px solid rgba(255,255,255,0.35)",
  borderRadius: 2,
};

const ACTIONS_ROW = "mt-5 flex flex-col sm:flex-row gap-3 sm:justify-end";

function ToggleRow({
  title,
  desc,
  checked,
  disabled = false,
  alwaysLabel,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  alwaysLabel?: string;
  onChange?: (v: boolean) => void;
}) {
  const labelStyle = { fontFamily: FONT.body } as const;

  return (
    <div className="flex items-start gap-3 py-3 border-t" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
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
          {disabled && alwaysLabel && (
            <span className="ml-2 text-xs font-normal" style={{ color: BRAND.yellow }}>
              ({alwaysLabel})
            </span>
          )}
        </p>
        <p className="text-xs mt-0.5" style={{ ...labelStyle, color: "rgba(255,255,255,0.7)" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

/**
 * The toggles plus the actions row they share.
 *
 * This only ever mounts while the panel is open, so `draft` initialises from the
 * stored consent every time it opens — that remount *is* the reset. Syncing the
 * two with an effect instead would re-render the banner on every consent change.
 * `actions` is passed in so Reject/Accept keep sitting in the same flex row.
 */
function Preferences({
  dict,
  categories,
  onSave,
  actions,
}: {
  dict: Dictionary["cookies"];
  categories: ConsentCategories;
  onSave: (categories: ConsentCategories) => void;
  actions: React.ReactNode;
}) {
  const [draft, setDraft] = useState<ConsentCategories>(categories);

  return (
    <>
      <div className="mt-4">
        <ToggleRow
          title={dict.categories.necessary.title}
          desc={dict.categories.necessary.desc}
          checked
          disabled
          alwaysLabel={dict.always}
        />
        <ToggleRow
          title={dict.categories.analytics.title}
          desc={dict.categories.analytics.desc}
          checked={draft.analytics}
          onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
        />
        <ToggleRow
          title={dict.categories.media.title}
          desc={dict.categories.media.desc}
          checked={draft.media}
          onChange={(v) => setDraft((d) => ({ ...d, media: v }))}
        />
      </div>

      <div className={ACTIONS_ROW}>
        <button onClick={() => onSave(draft)} className={BTN} style={PRIMARY_BTN}>
          {dict.banner.save}
        </button>
        {actions}
      </div>
    </>
  );
}

export function CookieBanner({ dict }: { dict: Dictionary["cookies"] }) {
  const { ready, decided, settingsOpen, categories, save, acceptAll, rejectAll, closeSettings } = useConsent();
  const [showPrefs, setShowPrefs] = useState(false);

  // Render only after the cookie is read, and only when a choice is needed
  // or the visitor reopened the settings.
  if (!ready || (decided && !settingsOpen)) return null;

  const prefsOpen = showPrefs || settingsOpen;

  // Closing: if a choice was already made (reopened via footer) just close;
  // on a first visit, treat closing as "necessary only" so no non-essential
  // cookies load and the banner doesn't get stuck.
  const handleClose = () => (decided ? closeSettings() : rejectAll());

  const actions = (
    <>
      <button onClick={rejectAll} className={BTN} style={OUTLINE_BTN}>
        {dict.banner.rejectAll}
      </button>
      <button onClick={acceptAll} className={BTN} style={PRIMARY_BTN}>
        {dict.banner.acceptAll}
      </button>
    </>
  );

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

        {prefsOpen ? (
          <Preferences dict={dict} categories={categories} onSave={save} actions={actions} />
        ) : (
          <div className={ACTIONS_ROW}>
            <button onClick={() => setShowPrefs(true)} className={BTN} style={OUTLINE_BTN}>
              {dict.banner.preferences}
            </button>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
