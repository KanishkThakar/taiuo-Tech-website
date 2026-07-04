import Reveal from "@/components/motion/Reveal";
import { PRESS } from "@/lib/data";

/** 3.3 — "As Seen In" press bar: styled wordmarks, marquee on mobile. */
export default function TrustBar() {
  return (
    <section className="border-y border-line bg-white py-9" aria-label="As seen in">
      <div className="container-x flex items-center gap-10 max-md:flex-col max-md:gap-5">
        <span className="caption-label whitespace-nowrap text-[11px] text-faint">As Seen In</span>

        {/* desktop: spaced row */}
        <Reveal stagger className="flex flex-1 items-center justify-between gap-9 max-md:hidden">
          {PRESS.map((p) => (
            <span key={p.name} className={`pm pm-${p.styleKey}`}>
              {p.name}
            </span>
          ))}
        </Reveal>

        {/* mobile: marquee with edge fades */}
        <div className="relative hidden w-full overflow-hidden max-md:block [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
          <div className="press-marquee flex w-max items-center gap-9">
            {[...PRESS, ...PRESS].map((p, i) => (
              <span key={i} className={`pm pm-${p.styleKey}`}>
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
