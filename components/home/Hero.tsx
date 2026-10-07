import type { CSSProperties } from "react";
import HexTree from "@/components/HexTree";
import TravellingTree from "@/components/home/TravellingTree";
import { SITE } from "@/lib/site";

/** Entrance delay for one line of hero copy, read by the .rise animation. */
const riseDelay = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

/** Deliberately understated: the mark, the wordmark and the tagline only. */
export default function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 pt-header pb-28 text-center"
    >
      {/* Faint silhouette of the mark behind the content; it drifts slower
          than the page as you scroll (see .parallax-far). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center [mask-image:linear-gradient(to_bottom,black_86%,transparent)]"
      >
        <HexTree variant="ghost" className="parallax-far h-[min(84svh,46rem)] w-auto" />
      </div>

      <div className="relative flex flex-col items-center">
        <TravellingTree className="w-32 sm:w-40 md:w-44" />

        <h1 id="hero-title" className="mt-12 flex flex-col items-center gap-3 md:mt-14">
          <span
            className="rise font-serif text-[clamp(3.25rem,1.6rem+6.4vw,7.5rem)] leading-none font-light tracking-[0.08em] text-ivory uppercase"
            style={riseDelay(0.5)}
          >
            WebTree
          </span>
          <span
            className="rise label text-[clamp(1.125rem,0.8rem+1.2vw,1.75rem)] tracking-[0.42em] text-ivory-faint"
            style={riseDelay(0.65)}
          >
            Global
          </span>
        </h1>

        <p
          className="rise label mt-14 text-balance text-ivory-muted md:mt-16"
          style={riseDelay(0.9)}
        >
          {SITE.tagline}
        </p>
      </div>

      <span aria-hidden="true" className="absolute bottom-10 left-1/2 h-10 w-px bg-gold/40" />
    </section>
  );
}
