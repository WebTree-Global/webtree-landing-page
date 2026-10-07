import type { CSSProperties } from "react";
import HexTree from "@/components/HexTree";
import { SITE } from "@/lib/site";

const FACTS = [
  { term: "Headquarters", detail: SITE.location },
  { term: "Entity", detail: SITE.legalName },
  { term: "Correspondence", detail: SITE.email, href: `mailto:${SITE.email}` },
];

/** Entrance delay for one line of hero copy, read by the .rise animation. */
const riseDelay = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="flex min-h-svh flex-col pt-[4.5rem]">
      <div className="page-container grid flex-1 grid-cols-12 items-center gap-x-6 gap-y-12 py-14 lg:py-10">
        <div className="col-span-12 lg:col-span-7">
          <p className="label rise text-gold" style={riseDelay(0.1)}>
            {SITE.tagline}
          </p>

          <h1
            id="hero-title"
            className="mt-8 max-w-[17ch] font-serif text-display-1 font-light text-ivory"
          >
            <span className="rise block" style={riseDelay(0.2)}>
              A Singapore holding company
            </span>
            <span className="rise block italic text-ivory-muted" style={riseDelay(0.35)}>
              for capital, technology and ventures.
            </span>
          </h1>

          <div className="rise mt-12" style={riseDelay(0.55)}>
            <a
              href="#contact"
              className="label group inline-flex items-center gap-4 border border-gold/60 px-6 py-4 text-ivory transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
            >
              Get in touch
              <span
                aria-hidden="true"
                className="transition-transform duration-300 ease-out-quint group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>
          </div>
        </div>

        <div className="col-span-12 flex justify-center lg:col-span-5 lg:justify-end">
          <HexTree
            animated
            title="The WebTree hex-tree emblem"
            className="h-auto w-full max-w-[17rem] sm:max-w-[22rem] lg:max-h-[min(64svh,34rem)] lg:max-w-full"
          />
        </div>
      </div>

      <div className="page-container">
        <dl className="grid border-t border-line sm:grid-cols-3">
          {FACTS.map((fact, index) => (
            <div
              key={fact.term}
              className={`flex flex-col gap-1.5 py-5 sm:py-6 ${
                index > 0 ? "border-t border-line sm:border-t-0 sm:border-l sm:pl-6" : ""
              }`}
            >
              <dt className="label text-ivory-faint">{fact.term}</dt>
              <dd className="text-[0.9375rem] text-ivory">
                {fact.href ? (
                  <a
                    href={fact.href}
                    className="underline decoration-gold/40 underline-offset-4 transition-colors duration-300 hover:text-gold-bright hover:decoration-gold"
                  >
                    {fact.detail}
                  </a>
                ) : (
                  fact.detail
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
