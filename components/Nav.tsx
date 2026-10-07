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
        solid ? "border-line bg-ink/95" : "border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className="page-container flex h-[4.5rem] items-center justify-between">
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
          className="label -mr-2 px-2 py-3 text-ivory-muted md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? "Close" : "Menu"}
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
