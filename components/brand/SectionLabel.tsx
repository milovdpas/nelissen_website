import { BRAND, FONT } from "@/content/site";

export function SectionLabel({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span
        className="shrink-0"
        style={{ width: 12, height: 12, background: BRAND.yellow, display: "inline-block", borderRadius: 1 }}
      />
      <p
        className="text-xs font-semibold tracking-[0.18em] uppercase"
        style={{ color: light ? "rgba(255,255,255,0.55)" : BRAND.anthracite, fontFamily: FONT.body }}
      >
        {children}
      </p>
    </div>
  );
}
