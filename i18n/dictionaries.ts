import { defaultLocale, type Locale } from "./config";
import { nl, type Dictionary } from "./nl";

// Register a locale's dictionary here when adding one (e.g. en: () => import("./en")).
const dictionaries: Record<Locale, Dictionary> = {
  nl,
};

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export type { Dictionary };
