import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { stijlen } from "@/content/nl/stijlen";

// Hand-maintained per page: bump the date when that page's *content* actually
// changes. Deliberately not `new Date()` — that stamps every page as modified
// on each rebuild, and Google discounts a lastmod it learns to distrust.
// Seeded from the last commit that touched each page's content.
const LAST_MODIFIED = {
  home: "2026-09-30",
  assortiment: "2026-09-30",
  overOns: "2026-09-30",
  contact: "2026-09-30",
  privacybeleid: "2026-06-17",
  cookiebeleid: "2026-06-17",
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: LAST_MODIFIED.home,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${site.url}/assortiment`,
      lastModified: LAST_MODIFIED.assortiment,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // Generated rather than hand-listed: adding a style is then a content-only
    // change, and the sitemap cannot drift out of sync with the routes.
    ...stijlen.map((s) => ({
      url: `${site.url}/assortiment/${s.slug}`,
      lastModified: LAST_MODIFIED.assortiment,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${site.url}/over-ons`,
      lastModified: LAST_MODIFIED.overOns,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${site.url}/contact`,
      lastModified: LAST_MODIFIED.contact,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${site.url}/privacybeleid`,
      lastModified: LAST_MODIFIED.privacybeleid,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${site.url}/cookiebeleid`,
      lastModified: LAST_MODIFIED.cookiebeleid,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
