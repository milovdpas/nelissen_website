"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { BRAND, FONT } from "@/content/site";
import { LogoSquares } from "@/components/brand/LogoSquares";
import type { Dictionary } from "@/i18n/dictionaries";

export function Nav({ dict }: { dict: Dictionary["nav"] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
      style={{
        background: BRAND.anthracite,
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.35)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <a href={dict.home} className="flex items-center gap-3 focus:outline-none" aria-label={dict.home === "#hero" ? "Naar boven" : undefined}>
          <LogoSquares size={11} />
          <span
            style={{
              fontFamily: FONT.heading,
              fontWeight: 800,
              fontSize: "1.1rem",
              letterSpacing: "0.06em",
              color: "#fff",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            Tegelhandel <span style={{ color: BRAND.yellow }}>Nelissen</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-7">
          {dict.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium tracking-wide transition-colors duration-150 focus:outline-none"
                style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.72)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = BRAND.yellow)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.72)")}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 focus:outline-none transition-all duration-150"
          style={{ fontFamily: FONT.body, background: BRAND.yellow, color: BRAND.anthracite, borderRadius: 2 }}
          onMouseEnter={(e) => (e.currentTarget.style.background = BRAND.yellowHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = BRAND.yellow)}
        >
          {dict.cta}
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 focus:outline-none"
          style={{ color: "#fff" }}
          aria-label={dict.menuLabel}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t" style={{ background: BRAND.anthracite, borderColor: "rgba(255,255,255,0.1)" }}>
          <ul className="px-6 py-4 flex flex-col gap-4">
            {dict.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium w-full block text-left focus:outline-none"
                  style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.85)" }}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="text-sm font-semibold px-5 py-2.5 w-full block text-center focus:outline-none"
                style={{ fontFamily: FONT.body, background: BRAND.yellow, color: BRAND.anthracite, borderRadius: 2 }}
              >
                {dict.cta}
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
