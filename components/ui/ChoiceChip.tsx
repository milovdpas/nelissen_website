import type { CSSProperties, ReactNode } from "react";
import { BRAND, FONT } from "@/content/site";

/**
 * A selectable chip wrapping a real radio or checkbox.
 *
 * The input itself is sr-only rather than replaced, so the group is still a
 * proper radio/checkbox group for assistive tech and keyboard users; the label
 * carries the focus ring on its behalf.
 */
const CHIP_CLASS =
  "cursor-pointer px-4 py-2.5 text-sm font-semibold focus-within:outline focus-within:outline-2";

export const chipStyle = (active: boolean): CSSProperties => ({
  fontFamily: FONT.body,
  borderRadius: 2,
  background: active ? BRAND.yellow : "transparent",
  color: active ? BRAND.anthracite : "#fff",
  border: active ? `1.5px solid ${BRAND.yellow}` : "1.5px solid rgba(255,255,255,0.35)",
  outlineColor: BRAND.yellow,
});

export function ChoiceChip({
  type,
  name,
  value,
  checked,
  onChange,
  children,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: ReactNode;
}) {
  return (
    <label className={CHIP_CLASS} style={chipStyle(checked)}>
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {children}
    </label>
  );
}
