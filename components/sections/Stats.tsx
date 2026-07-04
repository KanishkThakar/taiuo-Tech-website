"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { motion, type Variants } from "motion/react";
import CountUp from "@/components/motion/CountUp";
import Reveal from "@/components/motion/Reveal";
import { STAT_CATEGORIES, STATS } from "@/lib/data";

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const card: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } },
};

/** 3.5 — tabbed research evidence with count-up numbers. */
export default function Stats() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-x">
        <Reveal>
          <h2 className="h2-display max-w-[780px]">
            Studies show your looks influence
            <br />
            <span className="h-light">
              almost everything, from your career to your romantic life.
            </span>
          </h2>
        </Reveal>

        <Tabs.Root defaultValue="Finances">
          <Reveal>
            <Tabs.List className="mt-11 flex flex-wrap gap-2.5" aria-label="Study categories">
              {STAT_CATEGORIES.map((cat) => (
                <Tabs.Trigger key={cat} value={cat} className="pill-tab">
                  {cat}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
          </Reveal>

          {STAT_CATEGORIES.map((cat) => (
            <Tabs.Content key={cat} value={cat} className="outline-none">
              <motion.div
                variants={grid}
                initial="hidden"
                animate="show"
                className="mt-10 grid grid-cols-4 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1"
              >
                {STATS[cat].map((s) => (
                  <motion.div
                    key={s.title}
                    variants={card}
                    className="rounded-2xl bg-white p-[30px_26px] shadow-soft transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-[3px] hover:shadow-mid"
                  >
                    <p className="text-[clamp(2rem,3vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.02em] tabular-nums">
                      <CountUp value={s.num} />
                    </p>
                    <p className="mt-2.5 text-[17px] font-medium">{s.title}</p>
                    <p className="mt-2 text-sm text-body">{s.desc}</p>
                    <p className="mt-3.5 text-[11px] italic text-faint">{s.cite}</p>
                  </motion.div>
                ))}
              </motion.div>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </div>
    </section>
  );
}
