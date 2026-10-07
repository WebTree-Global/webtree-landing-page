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

/** Timing variables read by the .tree-branch and .tree-leaf animations. */
function timing(delay: number, duration?: number): CSSProperties {
  const style: Record<string, string> = { "--delay": `${delay}s` };
  if (duration !== undefined) style["--duration"] = `${duration}s`;
  return style as CSSProperties;
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
            style={animated ? timing(branch.delay, branch.duration) : undefined}
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
            style={animated ? timing(leaf.delay) : undefined}
          />
        ))}
      </g>
    </svg>
  );
}
