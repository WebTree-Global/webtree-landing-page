interface SectionHeadingProps {
  /** Two-digit section number, e.g. "01". */
  index: string;
  title: string;
  /** Lets the section use this heading as its accessible name. */
  id: string;
}

/** Ledger-style section opener: a full-width hairline, number and title. */
export default function SectionHeading({ index, title, id }: SectionHeadingProps) {
  return (
    <div className="flex items-baseline gap-5 border-t border-line pt-5">
      <span className="label tabular-nums text-gold">{index}</span>
      <h2 id={id} className="label text-ivory-muted">
        {title}
      </h2>
    </div>
  );
}
