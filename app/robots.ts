import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { isProduction } from "@/lib/env";

export default function robots(): MetadataRoute.Robots {
  // Anything that is not production — acceptance, preview, a local build — is
  // blocked outright. It must never compete with the real domain in search.
  if (!isProduction) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        // Allow all crawlers, including AI crawlers. Only shield the API.
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
