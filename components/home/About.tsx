import HexTree from "@/components/HexTree";
import SectionHeading from "@/components/SectionHeading";
import RegionFocus from "@/components/home/RegionFocus";
import type { TreeRegion } from "@/lib/tree-geometry";
import { TREE_STAGE_ID, TREE_TRACK_ID } from "@/lib/tree-journey";

interface Pillar {
  number: string;
  title: string;
  description: string;
  /** The part of the hex tree that lights up while this row is in view. */
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
 * Layout of the tree stage:
 * - Small screens: a band pinned under the header, tree centred, while the
 *   rows scroll beneath it.
 * - lg and up: a column beside the rows, with the stage pinned in it.
 * The row at mid-viewport lights its region (RegionFocus). On wide screens
 * TravellingTree flies the hero tree into the stage.
 */
export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="page-section">
      <div className="page-container">
        <SectionHeading title="About" id="about-title" />

        <div className="mt-12 grid gap-x-6 md:mt-16 lg:grid-cols-12 lg:grid-rows-[auto_1fr]">
          <p className="reveal max-w-[30ch] font-serif text-display-2 font-light text-ivory lg:col-span-6">
            A Singapore-based holding company operating across strategic capital
            allocation, technology, and venture partnerships.
          </p>

          <div
            id={TREE_TRACK_ID}
            className="sticky top-header z-30 -mx-gutter mt-12 border-b border-line bg-ink px-gutter py-4 lg:static lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:mt-0 lg:border-0 lg:bg-transparent lg:p-0"
          >
            <div
              id={TREE_STAGE_ID}
              className="mx-auto aspect-[420/460] h-36 sm:h-44 lg:sticky lg:top-[max(calc(var(--spacing-header)+2rem),calc(50svh-13rem))] lg:mr-0 lg:h-auto lg:w-[min(24rem,100%)]"
            >
              <HexTree followsFocus className="stage-tree h-full w-full" />
            </div>
          </div>

          <ol className="lg:col-span-6 lg:row-start-2 lg:mt-8">
            {PILLARS.map((pillar) => (
              <li
                key={pillar.number}
                data-focus-region={pillar.region}
                className="reveal border-b border-line py-12 last:border-b-0 md:py-14 lg:flex lg:min-h-[60svh] lg:flex-col lg:justify-center lg:py-16"
              >
                <div className="flex items-baseline gap-4">
                  <span data-region-marker={pillar.region} className="label tabular-nums">
                    {pillar.number}
                  </span>
                  <span aria-hidden="true" className="h-px w-6 shrink-0 self-center bg-line" />
                  <h3 className="font-serif text-display-3 font-light text-ivory">
                    {pillar.title}
                  </h3>
                </div>
                <p className="mt-4 max-w-[44ch] text-[1.0625rem] text-ivory-muted">
                  {pillar.description}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <RegionFocus />
      </div>
    </section>
  );
}
