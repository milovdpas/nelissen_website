"use client";

import { createContext, useCallback, useContext, useState, useSyncExternalStore } from "react";

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

/**
 * The cookie is external, client-only state, so it is read through
 * useSyncExternalStore rather than an effect: React renders the server snapshot
 * during hydration and swaps to the real one immediately afterwards. That keeps
 * the markup matching without the extra render (and the cascading re-render
 * warning) that a setState-in-effect costs.
 */
type Snapshot = {
  categories: ConsentCategories;
  decided: boolean;
  ready: boolean;
};

// `ready: false` is what keeps the banner, analytics and the map out of the
// server markup — nothing non-essential may render before the cookie is read.
const SERVER_SNAPSHOT: Snapshot = { categories: DEFAULT, decided: false, ready: false };

const listeners = new Set<() => void>();

// Cached so getSnapshot stays referentially stable between renders; React would
// otherwise loop. Only ever assigned on the client — the server path returns
// SERVER_SNAPSHOT, so no state leaks between requests.
let snapshot: Snapshot | null = null;

function getSnapshot(): Snapshot {
  if (!snapshot) {
    const stored = readCookie();
    snapshot = stored
      ? { categories: stored, decided: true, ready: true }
      : { categories: DEFAULT, decided: false, ready: true };
  }
  return snapshot;
}

function getServerSnapshot(): Snapshot {
  return SERVER_SNAPSHOT;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Write the choice, then publish it optimistically to every subscriber. */
function persist(categories: ConsentCategories) {
  writeCookie(categories);
  snapshot = { categories, decided: true, ready: true };
  for (const listener of listeners) listener();
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const { categories, decided, ready } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [settingsOpen, setSettingsOpen] = useState(false);

  const save = useCallback((next: ConsentCategories) => {
    persist(next);
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
