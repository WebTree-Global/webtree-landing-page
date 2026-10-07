import type { CSSProperties } from "react";
import HexTree from "@/components/HexTree";
import SectionHeading from "@/components/SectionHeading";
import RegionFocus from "@/components/home/RegionFocus";
import type { TreeRegion } from "@/lib/tree-geometry";
import { REGION_NAMES, TREE_STAGE_ID, TREE_TRACK_ID } from "@/lib/tree-journey";

interface Pillar {
  number: string;
  title: string;
  description: string;
  /** The part of the hex tree that stands for this pillar. */
  region: TreeRegion;
}

const PILLARS: Pillar[] = [
  {
    number: "01",
    title: "Capital",
    description:
      "Proprietary trading strategies across global markets. Disciplined risk management, systematic execution.",
    region: "roots",
  },
  {
    number: "02",
    title: "Technology",
    description:
      "Building and investing in technology platforms across maritime, AI, and enterprise software.",
    region: "branches",
  },
  {
    number: "03",
    title: "Ventures",
    description:
      "Strategic partnerships and early-stage investments in founders solving complex problems.",
    region: "canopy",
  },
];

/**
 * Where each annotation's leader line meets the tree, as a percentage of
 * the 420 x 460 view box: the outermost left point of each region
 * (canopy: leaf at 75,97; branches: leaf at 23,187; roots: ground line end).
 */
const ANNOTATIONS: { region: TreeRegion; x: number; y: number }[] = [
  { region: "canopy", x: 11.94, y: 21.11 },
  { region: "branches", x: 2.65, y: 40.54 },
  { region: "roots", x: 16.37, y: 89.24 },
];

/** Leader line from a label outside the tree to its anchor point. */
const leaderStyle = (x: number, y: number): CSSProperties => ({
  top: `${y}%`,
  left: "-2rem",
  width: `calc(2rem + ${x}%)`,
});

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="page-section">
      <div className="page-container">
        <SectionHeading title="About" id="about-title" />

        <div className="mt-12 grid gap-x-6 md:mt-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="reveal max-w-[30ch] font-serif text-display-2 font-light text-ivory">
              A Singapore-based holding company operating across strategic capital
              allocation, technology, and venture partnerships.
            </p>

            <ol className="mt-12 md:mt-20 lg:mt-8">
              {PILLARS.map((pillar) => (
                <li
                  key={pillar.number}
                  data-focus-region={pillar.region}
                  className="reveal grid grid-cols-[1fr_auto] items-start gap-x-6 border-b border-line py-10 last:border-b-0 md:py-14 lg:flex lg:min-h-[60svh] lg:flex-col lg:justify-center lg:py-16"
                >
                  <div>
                    <p className="label flex items-center gap-3">
                      <span className="tabular-nums text-gold">{pillar.number}</span>
                      <span aria-hidden="true" className="h-px w-6 bg-line" />
                      <span data-annotation={pillar.region}>{REGION_NAMES[pillar.region]}</span>
                    </p>
                    <h3 className="mt-4 font-serif text-display-3 font-light text-ivory">
                      {pillar.title}
                    </h3>
                    <p className="mt-4 max-w-[44ch] text-[1.0625rem] text-ivory-muted">
                      {pillar.description}
                    </p>
                  </div>
                  {/* Small screens have no sticky stage; each row shows its region. */}
                  <HexTree highlight={pillar.region} className="h-20 w-auto lg:hidden" />
                </li>
              ))}
            </ol>
          </div>

          {/* The travelling hero tree comes to rest in this stage (TravellingTree). */}
          <div id={TREE_TRACK_ID} className="hidden lg:col-span-6 lg:block">
            <div
              id={TREE_STAGE_ID}
              className="sticky top-[max(calc(var(--spacing-header)+2rem),calc(50svh-13rem))] ml-auto aspect-[420/460] w-[min(24rem,calc(100%-9rem))]"
            >
              <HexTree followsFocus className="stage-tree h-full w-full" />
              {ANNOTATIONS.map(({ region, x, y }) => (
                <div key={region} data-annotation={region} aria-hidden="true">
                  <span className="absolute h-px bg-current" style={leaderStyle(x, y)} />
                  <span
                    className="label absolute right-[calc(100%+2.75rem)] -translate-y-1/2"
                    style={{ top: `${y}%` }}
                  >
                    {REGION_NAMES[region]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <RegionFocus />
      </div>
    </section>
  );
}
