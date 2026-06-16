import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lean standalone server output for the VPS deploy (`next start`).
  output: "standalone",
  images: {
    // Temporary: portfolio/assortiment use Unsplash stock until the company's
    // own tile photos are supplied. Remove this block once images are local.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
