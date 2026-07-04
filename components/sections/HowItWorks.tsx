import Reveal from "@/components/motion/Reveal";
import { HOW_STEPS } from "@/lib/data";

/** 3.12 — three steps with dashed connector. */
export default function HowItWorks() {
  return (
    <section className="section-pad bg-white" id="how">
      <div className="container-x">
        <Reveal stagger className="mx-auto mb-16 max-w-[640px] text-center">
          <h2 className="h2-display">How it works</h2>
          <p className="mt-[18px] text-[1.06rem] text-body">
            No clinic visits needed. Get your personalized facial analysis from the comfort of your
            home in three simple steps.
          </p>
        </Reveal>

        <Reveal stagger className="relative grid grid-cols-3 gap-12 before:absolute before:left-[18%] before:right-[18%] before:top-6 before:border-t-2 before:border-dashed before:border-line max-md:grid-cols-1 max-md:gap-10 max-md:before:hidden">
          {HOW_STEPS.map((s, i) => (
            <div key={s.title} className="relative bg-white text-center">
              <span className="relative z-[1] inline-grid h-12 w-12 place-items-center rounded-full bg-ink text-[19px] font-semibold text-white">
                {i + 1}
              </span>
              <h3 className="mt-6 text-[1.15rem] font-medium">{s.title}</h3>
              <p className="mx-auto mt-2.5 max-w-[300px] text-[15px] text-body">{s.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
