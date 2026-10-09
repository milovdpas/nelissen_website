import { site } from "@/content/site";

/**
 * The default social card.
 *
 * Measured, not assumed. This used to point at /images/showroom.jpeg declaring
 * 1200x630, while that file is actually 1080x1920: a portrait phone photo sold
 * to every scraper as a landscape card. Most of them crop to the declared box,
 * so shares of this site were showing a slice of the middle of it. These are
 * the real dimensions of a real landscape photo of the showroom.
 */
export const DEFAULT_OG_IMAGE = {
  url: "/images/showroom/thumbnail.jpg",
  width: 1600,
  height: 1200,
} as const;

/**
 * Open Graph images for a page.
 *
 * Next merges metadata one field at a time, and `openGraph` is a single field:
 * a page declaring its own replaces the root layout's outright, images
 * included. Fifteen pages were sharing with no preview image at all because of
 * that, which matters when the links get sent round on WhatsApp. So every page
 * that sets `openGraph` passes its images back through here.
 *
 * A per-page override carries no width or height on purpose: the photos are all
 * different shapes, and a wrong pair is worse than none at all.
 */
export function ogImages(alt: string, override?: { url: string; alt: string }) {
  return override ? [{ url: override.url, alt: override.alt }] : [{ ...DEFAULT_OG_IMAGE, alt }];
}

/**
 * schema.org JSON-LD for the business. Helps both Google rich results and
 * AI crawlers understand who/what/where. Rendered in app/layout.tsx.
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    email: site.email,
    telephone: site.phoneE164,
    image: `${site.url}/images/showroom.jpeg`,
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Noord-Brabant",
    },
    openingHoursSpecification: site.showroomHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${h.day}`,
      opens: h.opens,
      closes: h.closes,
    })),
    knowsLanguage: ["nl"],
    ...(site.sameAs.length > 0 ? { sameAs: site.sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.shortName,
    inLanguage: "nl-NL",
    publisher: { "@id": `${site.url}/#business` },
  };
}

/**
 * Breadcrumb trail for a sub-page. Google renders this in the result snippet in
 * place of the bare URL, which is most of why it is worth emitting.
 *
 * Pass the trail without the homepage — it is prepended here so every page
 * agrees on what the root is called.
 */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
