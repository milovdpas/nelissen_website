import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import { BRAND, FONT } from "@/content/site";

/**
 * The site has exactly two button looks — the yellow primary and the outlined
 * one on dark — and they appeared inline in the hero, the nav, the cookie
 * banner, the map placeholder and the contact form. They live here instead.
 *
 * No "use client": nothing in here holds state, so it renders inside the server
 * components (Hero) as happily as the client ones (Nav, CookieBanner), which
 * pass their own handlers through.
 */
export type ButtonVariant = "primary" | "outline";
export type ButtonSize = "md" | "sm" | "xs";

// Padding is a prop rather than a className override: two padding utilities in
// one class list are resolved by stylesheet order, not by the order they are
// written, so an override would win or lose unpredictably.
const SIZE_CLASS: Record<ButtonSize, string> = {
  md: "px-7 py-3",
  sm: "px-5 py-2.5",
  xs: "px-5 py-2",
};

const VARIANT_STYLE: Record<ButtonVariant, CSSProperties> = {
  primary: {
    fontFamily: FONT.body,
    background: BRAND.yellow,
    color: BRAND.anthracite,
    borderRadius: 2,
  },
  outline: {
    fontFamily: FONT.body,
    background: "transparent",
    color: "#fff",
    border: "1.5px solid rgba(255,255,255,0.35)",
    borderRadius: 2,
  },
};

// No justify-* here on purpose. It is a no-op while a button is auto-width, but
// a stretched one (the contact submit is a grid item) would silently recentre
// its label. Callers that need centring ask for it; there is no competing
// justify utility in the base, so passing it via className cannot conflict.
const BASE_CLASS =
  "items-center gap-2 text-sm font-semibold transition-all duration-150 focus:outline-none";

type Shared = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * The display utility, separate from `className` for the same reason as the
   * padding above — the nav needs `hidden md:inline-flex`, which would collide
   * with a hardcoded `inline-flex`.
   */
  display?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

function buildClass({ size = "md", display = "inline-flex", className }: Shared) {
  return [display, BASE_CLASS, SIZE_CLASS[size], className].filter(Boolean).join(" ");
}

type ButtonProps = Shared & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style" | "className">;

export function Button({ variant = "primary", size, display, className, style, children, ...rest }: ButtonProps) {
  return (
    <button
      className={buildClass({ size, display, className })}
      style={{ ...VARIANT_STYLE[variant], ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}

type ButtonLinkProps = Shared & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "style" | "className">;

export function ButtonLink({ variant = "primary", size, display, className, style, children, ...rest }: ButtonLinkProps) {
  return (
    <a
      className={buildClass({ size, display, className })}
      style={{ ...VARIANT_STYLE[variant], ...style }}
      {...rest}
    >
      {children}
    </a>
  );
}
