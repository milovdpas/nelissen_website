import { BRAND } from "@/content/site";

export function LogoSquares({ size = 10 }: { size?: number }) {
  return (
    <span className="inline-flex items-center gap-[3px]" aria-hidden>
      <span style={{ width: size, height: size, background: BRAND.yellow, display: "inline-block" }} />
      <span style={{ width: size, height: size, background: BRAND.red, display: "inline-block" }} />
      <span style={{ width: size, height: size, background: BRAND.blue, display: "inline-block" }} />
    </span>
  );
}
