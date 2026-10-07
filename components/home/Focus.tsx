import HexTree from "@/components/HexTree";
import SectionHeading from "@/components/SectionHeading";
import type { TreeRegion } from "@/lib/tree-geometry";

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

export default function Focus() {
  return (
    <section id="focus" aria-labelledby="focus-title" className="page-section">
      <div className="page-container">
        <SectionHeading index="01" title="Focus" id="focus-title" />

        <ol className="mt-6">
          {PILLARS.map((pillar) => (
            <li
              key={pillar.number}
              className="reveal grid grid-cols-[auto_1fr_auto] items-start gap-x-6 gap-y-4 border-b border-line py-10 last:border-b-0 md:grid-cols-12 md:items-center md:py-14"
            >
              <span className="label pt-3 tabular-nums text-gold md:col-span-1 md:pt-0">
                {pillar.number}
              </span>
              <h3 className="font-serif text-display-3 font-light text-ivory md:col-span-4">
                {pillar.title}
              </h3>
              <HexTree
                highlight={pillar.region}
                className="row-span-2 h-20 w-auto md:order-last md:col-span-2 md:row-span-1 md:h-28 md:justify-self-end"
              />
              <p className="col-start-2 max-w-[44ch] text-[1.0625rem] text-ivory-muted md:col-span-5 md:col-start-auto">
                {pillar.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
