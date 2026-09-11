import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  // On staging (NEXT_PUBLIC_NOINDEX=true) block all crawlers entirely.
  if (process.env.NEXT_PUBLIC_NOINDEX === "true") {
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
