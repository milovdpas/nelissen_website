import { ImageResponse } from "next/og";
import { BRAND } from "@/content/site";

// Apple touch icon (iOS home screen). Rendered to PNG at build time — no extra
// dependencies. Mirrors the brand mark in app/icon.svg.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const square = 36;
  const gap = 12;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap,
          background: BRAND.anthracite,
          borderRadius: 36,
        }}
      >
        <div style={{ width: square, height: square, background: BRAND.yellow }} />
        <div style={{ width: square, height: square, background: BRAND.red }} />
        <div style={{ width: square, height: square, background: BRAND.blue }} />
      </div>
    ),
    size,
  );
}
