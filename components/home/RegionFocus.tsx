"use client";

import { useEffect } from "react";

/**
 * Scroll-spy for the About rows. The row that crosses the middle of the
 * viewport names its tree region in data-tree-focus on <html>; CSS then
 * lights that region on every tree that follows focus, and its labels.
 */
export default function RegionFocus() {
  useEffect(() => {
    const root = document.documentElement;
    const rows = document.querySelectorAll<HTMLElement>("[data-focus-region]");
    const rowsAtCentre = new Set<HTMLElement>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const row = entry.target as HTMLElement;
          if (entry.isIntersecting) rowsAtCentre.add(row);
          else rowsAtCentre.delete(row);
        }
        const [row] = rowsAtCentre;
        if (row?.dataset.focusRegion) root.dataset.treeFocus = row.dataset.focusRegion;
        else delete root.dataset.treeFocus;
      },
      // Shrink the viewport to its horizontal centre line.
      { rootMargin: "-50% 0px -50% 0px" },
    );

    rows.forEach((row) => observer.observe(row));
    return () => {
      observer.disconnect();
      delete root.dataset.treeFocus;
    };
  }, []);

  return null;
}
