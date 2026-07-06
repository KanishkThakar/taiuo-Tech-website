import Reveal from "@/components/motion/Reveal";
import { LogoLockup } from "@/components/visuals/Logo";
import { FOOTER_COLS } from "@/lib/data";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-white pt-20">
      <Reveal className="container-x">
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 max-md:grid-cols-2 max-[420px]:grid-cols-1">
          {/* brand masthead */}
          <div className="max-md:col-span-full">
            <LogoLockup size="lg" />
            <p className="mt-5 max-w-[280px] text-[15px] leading-relaxed text-body">
              Improve your looks without surgery — a personalized, science-backed plan for your
              unique features.
            </p>
            <a
              href="mailto:hello@taiuo.tech"
              className="mt-5 inline-block text-sm font-medium text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
            >
              hello@taiuo.tech
            </a>
            <p className="mt-8 max-w-[320px] text-xs leading-relaxed text-faint">
              Disclaimer: Results may vary. Taiuo provides research-backed recommendations, not
              medical advice.
            </p>
          </div>

          {FOOTER_COLS.map((col) => {
            const external = "external" in col && col.external;
            return (
              <div key={col.heading}>
                <h4 className="caption-label mb-5 text-xs font-semibold text-faint">
                  {col.heading}
                </h4>
                <ul className="grid gap-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="group inline-flex items-center gap-1 text-sm text-body transition-colors hover:text-ink"
                      >
                        {l}
                        {external ? (
                          <span
                            aria-hidden
                            className="text-xs text-faint transition-transform duration-200 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                          >
                            ↗
                          </span>
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* legal bar */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-line py-6 text-xs text-faint">
          <span>© {YEAR} Taiuo, Inc. All rights reserved.</span>
          <span className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-ink">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-ink">
              Terms
            </a>
          </span>
        </div>
      </Reveal>

      <div className="watermark mt-8" aria-hidden="true">
        TAIUO
      </div>
    </footer>
  );
}
