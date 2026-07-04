import { FOOTER_COLS } from "@/lib/data";

/** 3.17 — footer + giant outlined TAIUO watermark. */
export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-line bg-white pt-20">
      <div className="container-x grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 max-md:grid-cols-2 max-[420px]:grid-cols-1">
        <div className="max-md:col-span-full">
          <h4 className="caption-label mb-[18px] text-xs font-semibold text-faint">TAIUO, INC.</h4>
          <a href="mailto:hello@taiuo.tech" className="text-sm underline underline-offset-[3px]">
            hello@taiuo.tech
          </a>
          <p className="mt-8 max-w-[300px] text-xs leading-normal text-faint">
            Disclaimer: Results may vary. Taiuo provides research-backed recommendations, not
            medical advice.
          </p>
        </div>

        {FOOTER_COLS.map((col) => (
          <div key={col.heading}>
            <h4 className="caption-label mb-[18px] text-xs font-semibold text-faint">
              {col.heading}
            </h4>
            <ul className="grid gap-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-body transition-colors hover:text-ink">
                    {l}
                    {"external" in col && col.external ? (
                      <span className="ml-1 text-xs">↗</span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="watermark mt-14" aria-hidden="true">
        TAIUO
      </div>
    </footer>
  );
}
