import SectionHeading from "@/components/SectionHeading";

const PRINCIPLES = [
  {
    number: "01",
    title: "Discipline",
    detail: "Systematic process over intuition. Every decision has a framework.",
  },
  {
    number: "02",
    title: "Alignment",
    detail: "Skin in the game. Our capital alongside yours, always.",
  },
  {
    number: "03",
    title: "Compounding",
    detail: "Long-term value creation. We don’t optimise for quarters.",
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" aria-labelledby="philosophy-title" className="page-section">
      <div className="page-container">
        <SectionHeading title="Philosophy" id="philosophy-title" />

        {/* Mirror of About: here the statement stays pinned on the left while
            the principles scroll past on the right. */}
        <div className="mt-12 grid gap-x-6 gap-y-14 md:mt-16 lg:grid-cols-12">
          <p className="reveal max-w-[25ch] self-start font-serif text-display-2 font-light text-ivory lg:sticky lg:top-[max(calc(var(--spacing-header)+2rem),calc(50svh-9rem))] lg:col-span-6">
            We believe in the patient compounding of capital through disciplined,
            systematic processes&nbsp;&mdash; <em className="text-gold">not speculation.</em>
          </p>

          <ol className="lg:col-span-5 lg:col-start-8">
            {PRINCIPLES.map((principle) => (
              <li
                key={principle.number}
                className="reveal border-t border-line py-8 first:border-t-0 first:pt-0 lg:py-14"
              >
                <span className="label tabular-nums text-gold">{principle.number}</span>
                <h3 className="mt-4 font-serif text-[clamp(1.625rem,1.3rem+1vw,2.25rem)] leading-tight font-light text-ivory">
                  {principle.title}
                </h3>
                <p className="mt-3 max-w-[34ch] text-ivory-muted">{principle.detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
