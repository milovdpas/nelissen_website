/**
 * Locale-agnostic facts about the business + visual tokens.
 *
 * This is the single source of truth for NAP (name/address/phone), opening
 * hours, geo and brand colours. A future CMS/portal can replace the values
 * here without touching components.
 */

export const BRAND = {
  anthracite: "#2c3038",
  yellow: "#f2c200",
  red: "#cc2626",
  blue: "#1b62c8",
  yellowHover: "#e0b400",
} as const;

// Font-family strings for inline styles. The CSS variables are set by
// next/font (lib/fonts.ts) and mirrored in globals.css.
export const FONT = {
  heading: "var(--font-barlow), 'Barlow Condensed', sans-serif",
  body: "var(--font-dm-sans), 'DM Sans', sans-serif",
} as const;

export const site = {
  name: "Nelissen Tegelhandel & Tegelzettersbedrijf",
  legalName: "V.O.F. Nelissen Tegelhandel & Tegelzettersbedrijf",
  shortName: "Tegelhandel Nelissen",
  /** Production domain (no trailing slash). Override via NEXT_PUBLIC_SITE_URL. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.tegelhandelnelissen.nl").replace(/\/$/, ""),
  email: "info@tegelhandelnelissen.nl",
  phone: "+31 412 403251",
  phoneHref: "tel:+31412403251",
  address: {
    street: "St. Willibrordusstraat 2a",
    postalCode: "5351 EH",
    city: "Berghem",
    region: "Noord-Brabant",
    country: "Nederland",
    countryCode: "NL",
  },
  geo: {
    latitude: 51.749012,
    longitude: 5.565831,
  },
  foundingYearsExperience: 25,
  // Google Maps embed for the contact section.
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2467.5232874793063!2d5.565831!3d51.749012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c70e1a9c1a6f35%3A0x0!2sSt.%20Willibrordusstraat%202a%2C%205351%20EH%20Berghem!5e0!3m2!1snl!2snl!4v1700000000000!5m2!1snl!2snl",
  // External profiles for schema.org `sameAs` (fill in as they become available).
  sameAs: [] as string[],
  /**
   * Showroom opening hours in a machine-readable shape, reused by the
   * schema.org LocalBusiness JSON-LD. Tile-setting work is by appointment
   * (Mon–Sat) and therefore not expressed as fixed opening hours.
   */
  showroomHours: [
    { day: "Tuesday", opens: "15:00", closes: "19:00" },
  ],
} as const;

export type Site = typeof site;
