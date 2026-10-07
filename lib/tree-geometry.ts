/**
 * Vector geometry of the WebTree hex-tree logo.
 *
 * Measured from public/webtree-logo.png (416 x 450 px) and redrawn as exact
 * hexagons and 7-unit strokes; the result overlaps the PNG at 95% IoU.
 * The tree is mirror-symmetric about x = 210 in a 420 x 460 view box.
 *
 * Each element carries a region (roots, branches, canopy), so a section can
 * highlight one part of the tree, and an entrance delay, so the hero tree can
 * grow from the ground up. Delays follow one growth speed: a branch starts
 * when its parent stroke reaches it, and a leaf opens when growth reaches it.
 */

export type TreeRegion = "roots" | "branches" | "canopy";

export const TREE_VIEWBOX = "0 0 420 460";
export const TREE_STROKE_WIDTH = 7;

export interface TreeBranch {
  region: TreeRegion;
  /** SVG polyline points, listed in the direction the branch grows. */
  points: string;
  /** Entrance delay and draw duration, in seconds. */
  delay: number;
  duration: number;
}

export interface TreeLeaf {
  region: TreeRegion;
  cx: number;
  cy: number;
  /** Circumradius: centre to corner. */
  r: number;
  /** "flat" has a flat top edge; "pointy" has a corner at the top. */
  orientation: "flat" | "pointy";
  /** Entrance delay, in seconds. */
  delay: number;
}

export const TREE_BRANCHES: TreeBranch[] = [
  { region: "roots", points: "210,441.5 103.75,441.5", delay: 0.1, duration: 0.33 },
  { region: "roots", points: "210,441.5 316.25,441.5", delay: 0.1, duration: 0.33 },
  { region: "roots", points: "160,441.5 210,391.5", delay: 0.26, duration: 0.22 },
  { region: "roots", points: "260,441.5 210,391.5", delay: 0.26, duration: 0.22 },
  { region: "roots", points: "191,410.5 68.75,410.5", delay: 0.4, duration: 0.38 },
  { region: "roots", points: "229,410.5 351.25,410.5", delay: 0.4, duration: 0.38 },
  { region: "branches", points: "181.75,410.5 181.75,263.5 144.75,226.5 29.75,226.5", delay: 0.43, duration: 0.98 },
  { region: "branches", points: "238.25,410.5 238.25,263.5 275.25,226.5 390.25,226.5", delay: 0.43, duration: 0.98 },
  { region: "roots", points: "210,391.5 210,162", delay: 0.48, duration: 0.72 },
  { region: "roots", points: "181.75,380.5 135.75,380.5 105.75,410.5", delay: 0.52, duration: 0.28 },
  { region: "roots", points: "238.25,380.5 284.25,380.5 314.25,410.5", delay: 0.52, duration: 0.28 },
  { region: "branches", points: "181.75,307.4 116.25,307.4", delay: 0.75, duration: 0.2 },
  { region: "branches", points: "238.25,307.4 303.75,307.4", delay: 0.75, duration: 0.2 },
  { region: "branches", points: "210,225.25 171.25,186.5 75.25,186.5", delay: 1, duration: 0.47 },
  { region: "branches", points: "210,225.25 248.75,186.5 344.75,186.5", delay: 1, duration: 0.47 },
  { region: "branches", points: "144.75,226.9 97.75,273.9 61.95,273.9", delay: 1.05, duration: 0.32 },
  { region: "branches", points: "275.25,226.9 322.25,273.9 358.05,273.9", delay: 1.05, duration: 0.32 },
  { region: "canopy", points: "210,60.9 178.35,60.9", delay: 1.19, duration: 0.1 },
  { region: "canopy", points: "210,60.9 241.65,60.9", delay: 1.19, duration: 0.1 },
  { region: "branches", points: "134.45,186.5 134.45,144 35.25,144", delay: 1.28, duration: 0.44 },
  { region: "branches", points: "285.55,186.5 285.55,144 384.75,144", delay: 1.28, duration: 0.44 },
  { region: "canopy", points: "178.35,60.9 178.35,114.5", delay: 1.29, duration: 0.17 },
  { region: "canopy", points: "241.65,60.9 241.65,114.5", delay: 1.29, duration: 0.17 },
];

export const TREE_LEAVES: TreeLeaf[] = [
  { region: "branches", cx: 141.15, cy: 340.5, r: 12, orientation: "flat", delay: 0.79 },
  { region: "branches", cx: 278.85, cy: 340.5, r: 12, orientation: "flat", delay: 0.79 },
  { region: "branches", cx: 342.05, cy: 315.7, r: 12, orientation: "flat", delay: 0.86 },
  { region: "branches", cx: 77.95, cy: 315.7, r: 12, orientation: "flat", delay: 0.86 },
  { region: "branches", cx: 116.25, cy: 307.4, r: 18, orientation: "flat", delay: 0.88 },
  { region: "branches", cx: 303.75, cy: 307.4, r: 18, orientation: "flat", delay: 0.88 },
  { region: "branches", cx: 141.05, cy: 269.6, r: 12, orientation: "flat", delay: 1.01 },
  { region: "branches", cx: 278.95, cy: 269.6, r: 12, orientation: "flat", delay: 1.01 },
  { region: "branches", cx: 210, cy: 162, r: 25, orientation: "pointy", delay: 1.1 },
  { region: "canopy", cx: 178.35, cy: 60.9, r: 25, orientation: "flat", delay: 1.2 },
  { region: "canopy", cx: 241.65, cy: 60.9, r: 25, orientation: "flat", delay: 1.2 },
  { region: "branches", cx: 151.25, cy: 207.6, r: 12, orientation: "flat", delay: 1.2 },
  { region: "branches", cx: 268.75, cy: 207.6, r: 12, orientation: "flat", delay: 1.2 },
  { region: "branches", cx: 23.15, cy: 186.5, r: 12, orientation: "flat", delay: 1.27 },
  { region: "branches", cx: 396.85, cy: 186.5, r: 12, orientation: "flat", delay: 1.27 },
  { region: "branches", cx: 61.95, cy: 273.9, r: 25, orientation: "flat", delay: 1.28 },
  { region: "branches", cx: 358.05, cy: 273.9, r: 25, orientation: "flat", delay: 1.28 },
  { region: "branches", cx: 134.45, cy: 144, r: 25, orientation: "flat", delay: 1.32 },
  { region: "branches", cx: 285.55, cy: 144, r: 25, orientation: "flat", delay: 1.32 },
  { region: "branches", cx: 29.75, cy: 226.5, r: 18, orientation: "flat", delay: 1.34 },
  { region: "branches", cx: 390.25, cy: 226.5, r: 18, orientation: "flat", delay: 1.34 },
  { region: "branches", cx: 344.75, cy: 186.5, r: 25, orientation: "flat", delay: 1.38 },
  { region: "branches", cx: 75.25, cy: 186.5, r: 25, orientation: "flat", delay: 1.38 },
  { region: "canopy", cx: 178.15, cy: 114.5, r: 21, orientation: "flat", delay: 1.38 },
  { region: "canopy", cx: 241.85, cy: 114.5, r: 21, orientation: "flat", delay: 1.38 },
  { region: "canopy", cx: 344.85, cy: 97.1, r: 25, orientation: "flat", delay: 1.4 },
  { region: "canopy", cx: 75.15, cy: 97.1, r: 25, orientation: "flat", delay: 1.4 },
  { region: "canopy", cx: 137.25, cy: 89.4, r: 21, orientation: "flat", delay: 1.42 },
  { region: "canopy", cx: 282.75, cy: 89.4, r: 21, orientation: "flat", delay: 1.42 },
  { region: "canopy", cx: 115.55, cy: 54.4, r: 12, orientation: "flat", delay: 1.53 },
  { region: "canopy", cx: 304.45, cy: 54.4, r: 12, orientation: "flat", delay: 1.53 },
  { region: "canopy", cx: 210, cy: 26.4, r: 12, orientation: "pointy", delay: 1.62 },
  { region: "branches", cx: 35.25, cy: 144, r: 21, orientation: "flat", delay: 1.64 },
  { region: "branches", cx: 384.75, cy: 144, r: 21, orientation: "flat", delay: 1.64 },
];

/** Corner points of a regular hexagon, as an SVG points string. */
export function hexagonPoints(leaf: TreeLeaf): string {
  const firstCornerDegrees = leaf.orientation === "flat" ? 0 : 30;
  const corners: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = ((firstCornerDegrees + 60 * i) * Math.PI) / 180;
    const x = leaf.cx + leaf.r * Math.cos(angle);
    const y = leaf.cy + leaf.r * Math.sin(angle);
    corners.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return corners.join(" ");
}
