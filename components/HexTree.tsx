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
  /** Draw one region of the tree in gold and dim the rest. */
  highlight?: TreeRegion;
  /** Accessible name. Without one, the tree is decorative. */
  title?: string;
}

const GOLD = "var(--color-gold)";
/* Opaque mix, not transparency, so strokes that pass under a hexagon do
   not show through it. */
const DIMMED = "color-mix(in oklch, var(--color-gold) 20%, var(--color-ink))";

/** Timing variables read by the .tree-branch and .tree-leaf animations. */
function timing(delay: number, duration?: number): CSSProperties {
  const style: Record<string, string> = { "--delay": `${delay}s` };
  if (duration !== undefined) style["--duration"] = `${duration}s`;
  return style as CSSProperties;
}

/** The WebTree hex-tree logo, drawn from its vector geometry. */
export default function HexTree({
  className,
  animated = false,
  highlight,
  title,
}: HexTreeProps) {
  const colourOf = (region: TreeRegion) =>
    highlight === undefined || highlight === region ? GOLD : DIMMED;

  return (
    <svg
      viewBox={TREE_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g fill="none" strokeWidth={TREE_STROKE_WIDTH} strokeLinejoin="miter">
        {TREE_BRANCHES.map((branch) => (
          <polyline
            key={branch.points}
            points={branch.points}
            stroke={colourOf(branch.region)}
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
            fill={colourOf(leaf.region)}
            className={animated ? "tree-leaf" : undefined}
            style={animated ? timing(leaf.delay) : undefined}
          />
        ))}
      </g>
    </svg>
  );
}
