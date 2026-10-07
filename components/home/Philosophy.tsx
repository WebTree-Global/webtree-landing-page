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

        <p className="reveal mt-12 max-w-[25ch] font-serif text-display-2 font-light text-ivory md:mt-16">
          We believe in the patient compounding of capital through disciplined,
          systematic processes&nbsp;&mdash; <em className="text-gold">not speculation.</em>
        </p>

        <ol className="mt-16 grid gap-x-6 gap-y-10 md:mt-24 md:grid-cols-3">
          {PRINCIPLES.map((principle) => (
            <li key={principle.number} className="reveal border-t border-line pt-6">
              <span className="label tabular-nums text-gold">{principle.number}</span>
              <h3 className="mt-5 font-serif text-[1.625rem] leading-tight text-ivory">
                {principle.title}
              </h3>
              <p className="mt-3 max-w-[34ch] text-ivory-muted">{principle.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
