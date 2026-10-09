"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { BRAND, FONT } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { LogoSquares } from "@/components/brand/LogoSquares";
import type { Dictionary } from "@/i18n/dictionaries";

/** The only routes that render without a Contact section. */
const PAGES_WITHOUT_CONTACT = ["/privacybeleid", "/cookiebeleid"];

export function Nav({ dict }: { dict: Dictionary["nav"] }) {
  const [open, setOpen] = useState(false);
  /** Which desktop submenu is showing, keyed by its parent href. */
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  // Almost every page renders the Contact section, and on those the CTA should
  // scroll to the form rather than navigate away from the page that already has
  // it. The two legal pages are the only ones without one.
  //
  // Derived from the pathname rather than by looking for #contact after mount:
  // that needs an effect, and the href would be wrong for the first paint and
  // for anything that does not run JavaScript. Keep this list in step if a page
  // is ever added that has no Contact section.
  const pathname = usePathname();
  const contactHref = PAGES_WITHOUT_CONTACT.includes(pathname) ? dict.ctaHref : "#contact";

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
        {/* next/link throughout: these hrefs are root-relative so they work from
            /over-ons too, and a plain <a> would full-reload on every one. */}
        <Link href={dict.home} className="flex items-center gap-3 focus:outline-none">
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
        </Link>

        <ul className="hidden md:flex items-center gap-7">
          {dict.links.map((l) => (
            // The submenu opens on hover *and* on focus-within, so it is
            // reachable by keyboard without a toggle button. The parent stays a
            // real link rather than becoming a button that only opens a menu:
            // /assortiment is a page in its own right.
            <li
              key={l.href}
              className="relative"
              onMouseEnter={() => l.children && setOpenMenu(l.href)}
              onMouseLeave={() => l.children && setOpenMenu(null)}
              onFocus={() => l.children && setOpenMenu(l.href)}
              onBlur={(e) => {
                if (l.children && !e.currentTarget.contains(e.relatedTarget as Node | null)) {
                  setOpenMenu(null);
                }
              }}
              onKeyDown={(e) => {
                if (!l.children || e.key !== "Escape" || openMenu !== l.href) return;
                // Move focus first, close second, and not the other way round.
                //
                // Hiding the submenu while focus is inside it would drop focus
                // onto the body, leaving the viewer at the top of the tab order
                // with no idea where they are, so Escape puts them back on the
                // parent link — the first anchor in this <li>.
                //
                // But focus() dispatches focusin synchronously, which is what
                // React maps onFocus to, so the handler above runs here and
                // reopens the menu. Both updates land in the same batch and the
                // last one wins, so closing has to come after the focus move.
                e.currentTarget.querySelector("a")?.focus();
                setOpenMenu(null);
              }}
            >
              <Link
                href={l.href}
                className="text-sm font-medium tracking-wide transition-colors duration-150 focus:outline-none inline-flex items-center gap-1"
                style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.72)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = BRAND.yellow)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.72)")}
                aria-expanded={l.children ? openMenu === l.href : undefined}
              >
                {l.label}
                {l.children ? <ChevronDown size={14} aria-hidden="true" /> : null}
              </Link>

              {/* Always in the DOM, hidden with the `hidden` attribute rather
                  than conditionally rendered. Rendering only on hover kept these
                  links out of the HTML entirely, so a crawler never saw them,
                  which defeats the point of the dropdown: the style pages only
                  earn rankings if they are linked from every page. `hidden` also
                  takes them out of the tab order until the parent is focused. */}
              {l.children ? (
                <ul
                  hidden={openMenu !== l.href}
                  className="absolute left-0 top-full pt-3 min-w-56 z-50"
                  style={{ fontFamily: FONT.body }}
                >
                  <li
                    className="py-2 shadow-xl"
                    style={{ background: BRAND.anthracite, border: "1px solid rgba(255,255,255,0.12)", borderRadius: 2 }}
                  >
                    <ul>
                      {l.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            className="block px-4 py-2 text-sm focus:outline-none"
                            style={{ color: "rgba(255,255,255,0.78)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = BRAND.yellow)}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.78)")}
                            onClick={() => setOpenMenu(null)}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              ) : null}
            </li>
          ))}
        </ul>

        <ButtonLink
          href={contactHref}
          size="xs"
          display="hidden md:inline-flex"
          onMouseEnter={(e) => (e.currentTarget.style.background = BRAND.yellowHover)}
          onMouseLeave={(e) => (e.currentTarget.style.background = BRAND.yellow)}
        >
          {dict.cta}
        </ButtonLink>

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
            {/* No hover menu on touch: submenus are simply listed, indented,
                under their parent. The drawer is already a disclosure, so a
                second level of tapping to open would be one tap too many. */}
            {dict.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium w-full block text-left focus:outline-none"
                  style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.85)" }}
                >
                  {l.label}
                </Link>

                {l.children ? (
                  <ul className="mt-2 ml-4 flex flex-col gap-2 border-l pl-3" style={{ borderColor: "rgba(255,255,255,0.14)" }}>
                    {l.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="text-sm w-full block text-left focus:outline-none"
                          style={{ fontFamily: FONT.body, color: "rgba(255,255,255,0.62)" }}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
            <li>
              <ButtonLink
                href={contactHref}
                size="sm"
                display="flex"
                className="w-full justify-center"
                onClick={() => setOpen(false)}
              >
                {dict.cta}
              </ButtonLink>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
