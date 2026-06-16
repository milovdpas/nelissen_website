"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

/**
 * Cookie-consent state, persisted in a first-party cookie. Non-essential
 * categories default to OFF — nothing (Google Analytics, Google Maps) loads
 * until the visitor opts in, as required under the AVG / cookiewet.
 */
export type ConsentCategories = {
  analytics: boolean; // Google Analytics
  media: boolean; // embedded external media (Google Maps)
};

type ConsentState = {
  categories: ConsentCategories;
  /** Visitor has made an explicit choice (a consent cookie exists). */
  decided: boolean;
  /** Cookie has been read on the client (avoids SSR/hydration mismatch). */
  ready: boolean;
  settingsOpen: boolean;
  save: (categories: ConsentCategories) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  grant: (category: keyof ConsentCategories) => void;
  openSettings: () => void;
  closeSettings: () => void;
};

const COOKIE = "nelissen_consent";
const MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const DEFAULT: ConsentCategories = { analytics: false, media: false };

const ConsentContext = createContext<ConsentState | null>(null);

function readCookie(): ConsentCategories | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  if (!match) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(match[1]));
    return { analytics: !!parsed.analytics, media: !!parsed.media };
  } catch {
    return null;
  }
}

function writeCookie(categories: ConsentCategories) {
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(categories))}; path=/; max-age=${MAX_AGE}; SameSite=Lax`;
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<ConsentCategories>(DEFAULT);
  const [decided, setDecided] = useState(false);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    const stored = readCookie();
    if (stored) {
      setCategories(stored);
      setDecided(true);
    }
    setReady(true);
  }, []);

  const save = useCallback((next: ConsentCategories) => {
    writeCookie(next);
    setCategories(next);
    setDecided(true);
    setSettingsOpen(false);
  }, []);

  const value: ConsentState = {
    categories,
    decided,
    ready,
    settingsOpen,
    save,
    acceptAll: () => save({ analytics: true, media: true }),
    rejectAll: () => save({ analytics: false, media: false }),
    grant: (category) => save({ ...categories, [category]: true }),
    openSettings: () => setSettingsOpen(true),
    closeSettings: () => setSettingsOpen(false),
  };

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent(): ConsentState {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within a ConsentProvider");
  return ctx;
}
