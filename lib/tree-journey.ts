/**
 * Shared names for the hero-to-About tree journey. They live outside the
 * client components so server components can import the plain values.
 */

/** The sticky box in About where the travelling tree comes to rest. */
export const TREE_STAGE_ID = "tree-stage";

/** The column that holds the stage; its top is where the stage starts. */
export const TREE_TRACK_ID = "tree-track";

/** Display names of the tree's regions, used by row labels and annotations. */
export const REGION_NAMES = {
  roots: "Roots",
  branches: "Branches",
  canopy: "Canopy",
} as const;
