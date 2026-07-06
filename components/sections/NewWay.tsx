"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Clock, Sparkles } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { ADVISOR_QUOTE, NEW_WAY, OLD_WAY, type WayStep } from "@/lib/data";

function WaySteps({ steps, light }: { steps: WayStep[]; light?: boolean }) {
  return (
    <ol className="way-steps grid grid-cols-5 gap-3 max-md:grid-cols-1 max-md:gap-0">
      {steps.map((s) => (
        <li
          key={s.text}
          className="text-center max-md:grid max-md:grid-cols-[10px_1fr] max-md:items-center max-md:gap-x-[18px] max-md:py-2.5 max-md:text-left"
        >
          <span
            className={`way-step-label mb-2.5 block text-[10px] font-semibold uppercase tracking-[0.08em] max-md:col-start-2 max-md:row-start-1 max-md:mb-0.5 ${
              light ? "text-white/70" : "text-faint"
            }`}
          >
            {s.label}
          </span>
          <span className="way-dot max-md:col-start-1 max-md:row-span-2 max-md:row-start-1 max-md:m-0" />
          <span
            className={`mx-auto block max-w-[150px] text-sm max-md:m-0 max-md:max-w-none ${light ? "text-white/90" : ""}`}
          >
            {s.text}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** 3.6 — old way vs new way, timeline line-draw + dot pops on scroll. */
export default function NewWay() {
  const oldRef = useRef<HTMLDivElement>(null);
  const newRef = useRef<HTMLDivElement>(null);

  /* plain IntersectionObserver — no library needed to add a class */
  useEffect(() => {
    const cards = [oldRef.current, newRef.current].filter(Boolean) as HTMLDivElement[];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((c) => c.classList.add("revealed"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 },
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section-pad bg-white" id="why">
      <div className="container-x">
        <Reveal stagger className="mx-auto mb-14 max-w-[640px] text-center">
          <span className="badge-pill">
            <span className="badge-dot" aria-hidden="true" />
            Personalized Analysis
          </span>
          <h2 className="h2-display mt-5">
            A new way to <span className="h-light">glow-up</span>
          </h2>
          <p className="mt-[18px] text-[1.06rem] text-body">
            The beauty industry is broken. Taiuo replaces guesswork with data-driven insights
            tailored to your unique facial structure.
          </p>
        </Reveal>

        <div
          ref={oldRef}
          className="way-card way-old rounded-2xl bg-cream p-[32px_36px] text-body max-md:p-[26px_22px]"
        >
          <div className="mb-[30px] flex items-center gap-3 text-[17px] font-medium text-ink">
            <Clock className="h-[22px] w-[22px] text-faint" strokeWidth={1.5} aria-hidden="true" />
            <span>The old way</span>
          </div>
          <WaySteps steps={OLD_WAY} />
        </div>

        <div
          ref={newRef}
          className="way-card way-new mt-[22px] rounded-2xl bg-ink p-[32px_36px] text-white max-md:p-[26px_22px]"
        >
          <div className="mb-[30px] flex items-center gap-3 text-[17px] font-medium">
            <Sparkles
              className="h-[22px] w-[22px] text-sage-light"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <span>The new way</span>
          </div>
          <WaySteps steps={NEW_WAY} light />
        </div>

        <Reveal className="mx-auto mt-16 grid max-w-[820px] grid-cols-[64px_1fr] items-start gap-6 max-md:grid-cols-1">
          <Image
            src={ADVISOR_QUOTE.photo}
            alt={ADVISOR_QUOTE.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
          />
          <figure>
            <blockquote>
              <p className="text-[1.06rem] text-body">{ADVISOR_QUOTE.quote}</p>
            </blockquote>
            <figcaption className="mt-3.5 text-sm">
              <strong className="font-semibold">{ADVISOR_QUOTE.name}</strong>
              <span className="ml-2.5 text-body">{ADVISOR_QUOTE.role}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
