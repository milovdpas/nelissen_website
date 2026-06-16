/**
 * i18n single source of truth.
 *
 * Only Dutch (`nl`) is active today. To add a locale later:
 *   1. add its code to `locales`
 *   2. add a dictionary file (e.g. i18n/en.ts) and register it in
 *      i18n/dictionaries.ts
 *   3. (optional) introduce locale-prefixed routing / a `[locale]` segment
 * No component changes required.
 */
export const locales = ["nl"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "nl";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
