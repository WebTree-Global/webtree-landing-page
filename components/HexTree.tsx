import type { CSSProperties } from "react";
import {
  TREE_BRANCHES,
  TREE_LEAVES,
  TREE_STROKE_WIDTH,
  TREE_VIEWBOX,
  hexagonPoints,
  type TreeRegion,
} from "@/lib/tree-geometry";

interface HexTreeProps {
  className?: string;
  /** Grow the tree from the ground up on first paint. */
  animated?: boolean;
  /** Always draw this region in gold and dim the rest. */
  highlight?: TreeRegion;
  /** Light the region named by `data-tree-focus` on <html> (set by RegionFocus). */
  followsFocus?: boolean;
  /** "ghost" draws the faint background silhouette. */
  variant?: "ghost";
  /** Accessible name. Without one, the tree is decorative. */
  title?: string;
}

/** Seconds over which a region lights up, from its first-grown part to its last. */
const LIGHT_SPREAD_SECONDS = 0.45;

/** Growth delays of the first and last part of each region. */
const GROWTH_SPAN = (() => {
  const span = {} as Record<TreeRegion, { first: number; last: number }>;
  for (const { region, delay } of [...TREE_BRANCHES, ...TREE_LEAVES]) {
    const current = span[region] ?? { first: delay, last: delay };
    span[region] = { first: Math.min(current.first, delay), last: Math.max(current.last, delay) };
  }
  return span;
})();

/** A region lights in growth order: up the trunk, then out to the leaves. */
function lightDelay(region: TreeRegion, growthDelay: number): number {
  const { first, last } = GROWTH_SPAN[region];
  return ((growthDelay - first) / (last - first)) * LIGHT_SPREAD_SECONDS;
}

interface TreePart {
  region: TreeRegion;
  delay: number;
  duration?: number;
}

/**
 * Per-part timing variables: --delay and --duration for the growth
 * animation, --light-delay for the region highlight (see globals.css).
 */
function partStyle(part: TreePart, animated: boolean, followsFocus: boolean) {
  const style: Record<string, string> = {};
  if (animated) {
    style["--delay"] = `${part.delay}s`;
    if (part.duration !== undefined) style["--duration"] = `${part.duration}s`;
  }
  if (followsFocus) {
    style["--light-delay"] = `${lightDelay(part.region, part.delay).toFixed(3)}s`;
  }
  return Object.keys(style).length > 0 ? (style as CSSProperties) : undefined;
}

/**
 * The WebTree hex-tree logo, drawn from its vector geometry.
 * Colours come from the .hex-tree rules in globals.css, keyed on each
 * element's data-region, so a region can be lit or dimmed with CSS alone.
 */
export default function HexTree({
  className = "",
  animated = false,
  highlight,
  followsFocus = false,
  variant,
  title,
}: HexTreeProps) {
  return (
    <svg
      viewBox={TREE_VIEWBOX}
      className={`hex-tree ${className}`}
      data-highlight={highlight}
      data-follow-focus={followsFocus ? "" : undefined}
      data-variant={variant}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g strokeWidth={TREE_STROKE_WIDTH} strokeLinejoin="miter">
        {TREE_BRANCHES.map((branch) => (
          <polyline
            key={branch.points}
            points={branch.points}
            data-region={branch.region}
            pathLength={1}
            className={animated ? "tree-branch" : undefined}
            style={partStyle(branch, animated, followsFocus)}
          />
        ))}
      </g>
      <g>
        {TREE_LEAVES.map((leaf) => (
          <polygon
            key={`${leaf.cx},${leaf.cy}`}
            points={hexagonPoints(leaf)}
            data-region={leaf.region}
            className={animated ? "tree-leaf" : undefined}
            style={partStyle(leaf, animated, followsFocus)}
          />
        ))}
      </g>
    </svg>
  );
}
