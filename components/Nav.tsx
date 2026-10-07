"use client";

import { useEffect, useState } from "react";
import HexTree from "@/components/HexTree";
import Wordmark from "@/components/Wordmark";
import { NAV_LINKS } from "@/lib/site";

/** Scroll distance (px) after which the header gets its solid background. */
const SOLID_HEADER_OFFSET = 24;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > SOLID_HEADER_OFFSET);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-500 ${
        solid ? "border-line bg-ink" : "border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="page-container flex h-header items-center justify-between">
        <a href="#top" className="flex items-center gap-3" aria-label="WebTree Global, back to top">
          <HexTree className="h-7 w-auto" />
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-ivory-muted transition-colors duration-300 hover:text-ivory"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[7px] md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {/* Two lines that cross into an X; 4px = half the 7px gap plus the 1px line. */}
          <span
            className={`block h-px w-5 bg-ivory transition-transform duration-300 ${
              menuOpen ? "translate-y-[4px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-5 bg-ivory transition-transform duration-300 ${
              menuOpen ? "-translate-y-[4px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Height animates through grid rows, so no layout property is tweened. */}
      <div
        id="mobile-menu"
        className={`grid transition-[grid-template-rows] duration-500 ease-out-quint md:hidden ${
          menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
        inert={!menuOpen}
      >
        <ul className="page-container overflow-hidden">
          {NAV_LINKS.map((link) => (
            <li key={link.href} className="border-t border-line first:border-t-0">
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block py-4 font-serif text-2xl font-light text-ivory"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li aria-hidden="true" className="h-4" />
        </ul>
      </div>
    </header>
  );
}
