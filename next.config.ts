import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Content-Security-Policy.
//
// Every directive except script-src is locked to the origins actually used:
// Unsplash for the stock photography, the Google Maps embed iframe, and
// Google Analytics/Tag Manager (both of which only ever load after consent).
//
// script-src deliberately keeps 'unsafe-inline'. Removing it means nonces,
// which in the App Router requires middleware on every request and opts the
// whole site out of static prerendering — a real cost on a site that renders no
// user input anywhere (the single dangerouslySetInnerHTML is static JSON-LD).
// The directive is still worth setting: it blocks script loads from any host
// other than the two below.
//
// 'unsafe-eval' is dev-only — React Fast Refresh evaluates modules at runtime.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com`,
  // Tailwind + the inline `style={{}}` props throughout the components.
  "style-src 'self' 'unsafe-inline'",
  // data:/blob: cover next/image blur placeholders and the generated icons.
  "img-src 'self' data: blob: https://images.unsplash.com https://www.googletagmanager.com https://*.google-analytics.com",
  // next/font self-hosts Barlow + DM Sans, so no external font origin.
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
  // The consent-gated Google Maps embed.
  "frame-src https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

// Security headers — addresses the PageSpeed "Best Practices" advisories
// (clickjacking, origin isolation, MIME sniffing, referrer leakage).
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Content-Security-Policy", value: csp },
  // Production only: pinning HSTS against a local http:// dev server is a
  // browser-cache footgun. `includeSubDomains` is intentionally omitted — add it
  // once every subdomain of the apex is known to be HTTPS-only.
  // If the nginx proxy already emits this header, drop one of the two so the
  // response doesn't carry a duplicate.
  ...(isDev
    ? []
    : [{ key: "Strict-Transport-Security", value: "max-age=31536000" }]),
];

const nextConfig: NextConfig = {
  // Lean standalone server output for the VPS deploy (`next start`).
  output: "standalone",
  images: {
    // Allow lighter compression for heavy photos (Next 16 allowlists qualities).
    qualities: [60, 75],
    // Temporary: portfolio/assortiment use Unsplash stock until the company's
    // own tile photos are supplied. Remove this block once images are local.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // The optimizer renders whatever the remote host returns; SVG is a scripting
    // vector, so keep it disabled (this is the default, pinned here on purpose).
    dangerouslyAllowSVG: false,
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
