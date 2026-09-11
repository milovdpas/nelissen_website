import type { NextConfig } from "next";

// Security headers — addresses the PageSpeed "Best Practices" advisories
// (clickjacking, origin isolation, MIME sniffing, referrer leakage).
// A full script-src CSP with Trusted Types is deferred: the site uses inline
// styles + an inline JSON-LD script, which a strict CSP would break without
// nonces. `frame-ancestors` still gives CSP-based clickjacking protection.
const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
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
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
