import Reveal from "@/components/motion/Reveal";
import { TRUST_CHIPS } from "@/lib/data";

/**
 * 3.3 — Research-credibility bar.
 * ⟦PLACEHOLDER⟧ honesty rule: no real press logos until coverage exists —
 * neutral research chips instead. Static row on desktop, marquee on mobile.
 */
export default function TrustBar() {
  return (
    <section className="border-y border-line bg-white py-9" aria-label="Grounded in peer-reviewed research">
      <div className="container-x flex items-center gap-10 max-md:flex-col max-md:gap-5">
        <span className="caption-label whitespace-nowrap text-[11px] text-faint">
          Grounded in peer-reviewed research
        </span>

        {/* desktop: spaced row */}
        <Reveal stagger className="flex flex-1 items-center justify-between gap-9 max-md:hidden">
          {TRUST_CHIPS.map((chip) => (
            <span key={chip} className="whitespace-nowrap text-[15px] font-semibold text-ink/45 transition-opacity hover:text-ink/80">
              {chip}
            </span>
          ))}
        </Reveal>

        {/* mobile: marquee with edge fades */}
        <div className="relative hidden w-full overflow-hidden max-md:block [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <div className="press-marquee flex w-max gap-9">
            {[...TRUST_CHIPS, ...TRUST_CHIPS].map((chip, i) => (
              <span key={i} className="whitespace-nowrap text-sm font-semibold text-ink/45">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
