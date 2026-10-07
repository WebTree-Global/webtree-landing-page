"use client";

import { useEffect } from "react";
import { TREE_TRACK_ID } from "@/lib/tree-journey";

/** How far below the pinned band the reading line sits on small screens (px). */
const READING_LINE_BELOW_BAND = 32;

/**
 * Scroll-spy for the About rows. The row that holds the reading line names
 * its tree region in data-tree-focus on <html>; CSS then lights that region
 * on every tree that follows focus, and the row's number.
 *
 * The reading line is where the eye is while reading the rows:
 * - small screens: just below the band pinned under the header, so a row
 *   stays lit until it has scrolled up under the band;
 * - wide screens: the middle of the viewport, beside the pinned tree.
 */
export default function RegionFocus() {
  useEffect(() => {
    const root = document.documentElement;
    const track = document.getElementById(TREE_TRACK_ID);
    const rows = [...document.querySelectorAll<HTMLElement>("[data-focus-region]")];
    let frame = 0;

    const readingLine = () => {
      const bandIsPinned = track !== null && getComputedStyle(track).position === "sticky";
      if (bandIsPinned) return track.getBoundingClientRect().bottom + READING_LINE_BELOW_BAND;
      return window.innerHeight / 2;
    };

    const updateFocus = () => {
      frame = 0;
      const line = readingLine();
      const row =
        line < window.innerHeight
          ? rows.find((candidate) => {
              const { top, bottom } = candidate.getBoundingClientRect();
              return top <= line && bottom > line;
            })
          : undefined;
      const region = row?.dataset.focusRegion;
      if (region === root.dataset.treeFocus) return;
      if (region) root.dataset.treeFocus = region;
      else delete root.dataset.treeFocus;
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateFocus);
    };

    updateFocus();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      delete root.dataset.treeFocus;
    };
  }, []);

  return null;
}
