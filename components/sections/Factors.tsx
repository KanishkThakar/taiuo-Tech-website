import {
  Activity,
  Globe,
  Hourglass,
  Landmark,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { FACTORS } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  globe: Globe,
  sliders: SlidersHorizontal,
  activity: Activity,
  hourglass: Hourglass,
  landmark: Landmark,
};

/** 3.9 — demographic & lifestyle factors grid. */
export default function Factors() {
  return (
    <section className="section-pad bg-white">
      <div className="container-x">
        <Reveal>
          <h2 className="h2-display text-center">
            Taking into <span className="h-light">account your...</span>
          </h2>
        </Reveal>
        <Reveal
          stagger
          className="mt-16 grid grid-cols-5 gap-8 max-lg:grid-cols-3 max-lg:gap-y-11 max-md:grid-cols-2 max-[420px]:grid-cols-1"
        >
          {FACTORS.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <div key={f.title} className="text-center">
                <div className="mx-auto grid h-[60px] w-[60px] place-items-center rounded-[17px] border border-sage-base/30 bg-sage-base/15 text-[#5F7070]">
                  <Icon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-[1.02rem] font-medium">{f.title}</h3>
                <p className="mt-2 text-[13.5px] text-body">{f.desc}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
