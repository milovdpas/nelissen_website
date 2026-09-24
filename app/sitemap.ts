import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Hand-maintained per page: bump the date when that page's *content* actually
// changes. Deliberately not `new Date()` — that stamps every page as modified
// on each rebuild, and Google discounts a lastmod it learns to distrust.
// Seeded from the last commit that touched each page's content.
const LAST_MODIFIED = {
  home: "2026-09-13",
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
