import { BadgeCheck, BookOpenCheck, Stethoscope, type LucideIcon } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { DERM_POINTS } from "@/lib/data";

const ICONS: Record<(typeof DERM_POINTS)[number]["icon"], LucideIcon> = {
  stethoscope: Stethoscope,
  badge: BadgeCheck,
  book: BookOpenCheck,
};

/** Clinical-oversight credibility section. */
export default function Dermatology() {
  return (
    <section className="section-pad bg-white">
      <div className="container-x">
        <Reveal stagger className="mx-auto mb-14 max-w-[640px] text-center">
          <span className="badge-pill">Clinical Oversight</span>
          <h2 className="h2-display mt-5">
            Reviewed by <span className="h-light">dermatologists</span>
          </h2>
          <p className="mt-[18px] text-[1.06rem] text-body">
            Taiuo is built with clinicians, not influencers. Every recommendation that reaches your
            protocol passes through medical review.
          </p>
        </Reveal>

        <Reveal stagger className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
          {DERM_POINTS.map((p) => {
            const Icon = ICONS[p.icon];
            return (
              <div
                key={p.title}
                className="rounded-2xl border border-line bg-white p-8 shadow-soft transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-deep"
              >
                <div className="grid h-12 w-12 place-items-center rounded-[13px] border border-sage-base/30 bg-sage-base/15 text-[#5F7070]">
                  <Icon className="h-[23px] w-[23px]" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-medium">{p.title}</h3>
                <p className="mt-2 text-sm text-body">{p.desc}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
