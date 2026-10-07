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
    const rows = [...document.querySelectorAll<HTMLElement>("[data-focus-region]")];

    // The observer only says when a row crosses the centre line. Which row
    // holds the line is read from the layout, so two changes reported in
    // separate callbacks never leave a frame with no region in focus.
    const updateFocus = () => {
      const centre = window.innerHeight / 2;
      const row = rows.find((candidate) => {
        const { top, bottom } = candidate.getBoundingClientRect();
        return top <= centre && bottom > centre;
      });
      if (row?.dataset.focusRegion) root.dataset.treeFocus = row.dataset.focusRegion;
      else delete root.dataset.treeFocus;
    };

    const observer = new IntersectionObserver(updateFocus, {
      // Shrink the viewport to its horizontal centre line.
      rootMargin: "-50% 0px -50% 0px",
    });
    rows.forEach((row) => observer.observe(row));
    return () => {
      observer.disconnect();
      delete root.dataset.treeFocus;
    };
  }, []);

  return null;
}
