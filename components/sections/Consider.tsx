import { Check } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { SceneSocial } from "@/components/visuals/Scenes";
import { CONSIDER_CHECKS, CONSIDER_POINTS } from "@/lib/data";

/** 3.16 — closing argument over the warm social-event scene. */
export default function Consider() {
  return (
    <section className="section-pad relative isolate overflow-hidden text-white">
      <SceneSocial />
      <div className="container-x grid grid-cols-[1.1fr_1fr] items-center gap-16 max-lg:grid-cols-1">
        <Reveal stagger>
          <h2 className="h2-display text-white">
            Consider this...
            <br />
            <span className="font-light text-white/60">Your best self has been waiting</span>
          </h2>
          <div className="mt-10 grid gap-3.5">
            {CONSIDER_POINTS.map((p) => (
              <p key={p} className="text-xl text-white/90">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal className="max-w-[440px] lg:justify-self-end">
          <div className="rounded-[20px] border border-white/10 bg-black/40 p-10 backdrop-blur-lg max-md:p-[30px_24px]">
            <h3 className="text-[1.3rem] font-medium text-white">
              The key is approaching it intelligently
            </h3>
            <ul className="mt-5">
              {CONSIDER_CHECKS.map((c) => (
                <li
                  key={c}
                  className="flex items-center gap-3.5 border-b border-white/10 py-[13px] text-[15.5px] text-white last:border-b-0"
                >
                  <Check className="h-5 w-5 flex-none text-green-400" strokeWidth={2} aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
