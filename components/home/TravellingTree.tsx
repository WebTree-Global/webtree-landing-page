"use client";

import { useLayoutEffect, useRef } from "react";
import HexTree from "@/components/HexTree";
import { TREE_STAGE_ID, TREE_TRACK_ID } from "@/lib/tree-journey";

/**
 * Only wide screens fly the tree: there it drifts sideways, clear of the
 * centred wordmark. On a narrow screen the path would run through the text,
 * so the tree scrolls away with the hero and the About band shows its own.
 */
const WIDE_QUERY = "(min-width: 64rem)";
const MOTION_QUERY = "(prefers-reduced-motion: no-preference)";

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);


/**
 * The hero tree. On wide screens it leaves the hero as the visitor scrolls
 * and glides into the sticky stage beside the About rows, where it lights
 * the region of the row in view.
 *
 * The tree is never moved in the DOM, so its growth animation is not
 * restarted: while travelling it is position: fixed and placed each frame
 * between two boxes, its own hero slot and the About stage. Progress runs
 * from 0 at the top of the page to 1 when the stage reaches its sticky top.
 * Without JavaScript, on narrow screens or with reduced motion, it stays in
 * the hero and the stage shows its own tree.
 */
export default function TravellingTree({ className = "" }: { className?: string }) {
  const slotRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const slot = slotRef.current;
    const tree = treeRef.current;
    const stage = document.getElementById(TREE_STAGE_ID);
    const track = document.getElementById(TREE_TRACK_ID);
    if (!slot || !tree || !stage || !track) return;

    const wide = window.matchMedia(WIDE_QUERY);
    const motionAllowed = window.matchMedia(MOTION_QUERY);
    const root = document.documentElement;
    let frame = 0;

    const stayInHero = () => {
      tree.style.removeProperty("position");
      tree.style.removeProperty("left");
      tree.style.removeProperty("top");
      tree.style.removeProperty("width");
      delete root.dataset.treeTravel;
    };

    const place = () => {
      frame = 0;
      if (!wide.matches || !motionAllowed.matches) {
        stayInHero();
        return;
      }
      // On wide screens the track is a static column and the stage sticks
      // inside it, so the journey ends when the track top meets the stage's
      // sticky offset.
      const stickyTop = parseFloat(getComputedStyle(stage).top) || 0;
      const journeyLength = track.getBoundingClientRect().top + window.scrollY - stickyTop;
      const progress = easeInOutCubic(clamp01(window.scrollY / journeyLength));
      const from = slot.getBoundingClientRect();
      const to = stage.getBoundingClientRect();

      root.dataset.treeTravel = "";
      tree.style.position = "fixed";
      tree.style.left = `${lerp(from.left, to.left, progress)}px`;
      tree.style.top = `${lerp(from.top, to.top, progress)}px`;
      tree.style.width = `${lerp(from.width, to.width, progress)}px`;
    };

    const schedulePlace = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };

    place();
    window.addEventListener("scroll", schedulePlace, { passive: true });
    window.addEventListener("resize", schedulePlace);
    wide.addEventListener("change", schedulePlace);
    motionAllowed.addEventListener("change", schedulePlace);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedulePlace);
      window.removeEventListener("resize", schedulePlace);
      wide.removeEventListener("change", schedulePlace);
      motionAllowed.removeEventListener("change", schedulePlace);
      stayInHero();
    };
  }, []);

  return (
    <div ref={slotRef} className={`aspect-[420/460] ${className}`}>
      <div ref={treeRef} className="pointer-events-none z-40 w-full">
        <HexTree animated followsFocus className="block h-auto w-full" />
      </div>
    </div>
  );
}
