interface SectionHeadingProps {
  title: string;
  /** Lets the section use this heading as its accessible name. */
  id: string;
}

/** Ledger-style section opener: a full-width hairline, a small gold hexagon and the title. */
export default function SectionHeading({ title, id }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-4 border-t border-line pt-5">
      <svg viewBox="0 0 12 10.4" aria-hidden="true" className="h-2 w-auto fill-gold">
        <polygon points="3,0 9,0 12,5.2 9,10.4 3,10.4 0,5.2" />
      </svg>
      <h2 id={id} className="label text-ivory-muted">
        {title}
      </h2>
    </div>
  );
}
