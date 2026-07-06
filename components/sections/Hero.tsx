"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ChevronDown, PlayCircle } from "lucide-react";
import MagneticButton from "@/components/motion/MagneticButton";
import { trackEvent } from "@/lib/analytics";
import { HERO } from "@/lib/data";

/**
 * The whole hero entrance is pure CSS (globals: .ha / .hl-line / .hp-enter)
 * so it starts at first paint with zero hydration dependency — desktop gets
 * the staged sequence, mobile paints instantly (LCP-first, v4 §10).
 * The portrait parallax is a lightweight post-paint rAF scroll handler.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 900px)").matches) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (parallaxRef.current && y < window.innerHeight) {
          parallaxRef.current.style.transform = `translateY(${y * 0.16}px)`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh items-center overflow-hidden pt-[76px] max-md:pt-16"
      style={{
        background: "linear-gradient(135deg, #A8B5B5 0%, #B8C5C5 50%, #C8D4D4 100%)",
      }}
    >
      {/* depth layers */}
      <div className="hero-radiance pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      <div className="hero-grain pointer-events-none absolute inset-0 z-0" aria-hidden="true" />
      <div
        className="hero-orb hero-orb-white right-[-8%] top-[-15%] z-0 h-[600px] w-[600px]"
        aria-hidden="true"
      />
      <div
        className="hero-orb hero-orb-sage bottom-[-12%] left-[-6%] z-0 h-[420px] w-[420px] [animation-direction:reverse] [animation-duration:15s]"
        aria-hidden="true"
      />

      {/* portrait — desktop only; CSS entrance, rAF parallax post-paint */}
      <div className="hp-enter absolute inset-y-0 right-0 z-[1] w-[46%] max-lg:w-[52%] max-[900px]:hidden">
        <div
          ref={parallaxRef}
          className="relative h-full w-full [mask-image:linear-gradient(to_right,transparent_0%,#000_22%)]"
        >
          <Image
            src="/images/hero-portrait.png"
            alt="Portrait of a woman with softly lit, natural features"
            fill
            priority
            sizes="(max-width: 900px) 0px, 46vw"
            className="object-cover object-top"
          />
        </div>
      </div>

      <div className="container-x relative z-[2] w-full py-16 max-[900px]:text-center">
        {/* premium eyebrow chip */}
        <div className="ha ha-label mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/50 bg-white/40 py-1.5 pl-1.5 pr-4 text-[13px] font-medium text-ink/75 shadow-soft backdrop-blur-sm max-[900px]:mx-auto">
          <span className="flex -space-x-2" aria-hidden="true">
            <span className="h-5 w-5 rounded-full bg-gradient-to-br from-[#dbe4e4] to-[#9dadad] ring-2 ring-white" />
            <span className="h-5 w-5 rounded-full bg-gradient-to-br from-[#c8d4d4] to-[#8b9a9a] ring-2 ring-white" />
            <span className="h-5 w-5 rounded-full bg-gradient-to-br from-[#b8c5c5] to-[#7d8c8c] ring-2 ring-white" />
          </span>
          {HERO.label}
        </div>

        <h1 className="h1-display">
          <span className="hl-mask">
            <span className="hl-line hl-line-1">{HERO.h1Line1}</span>
          </span>
          <span className="hl-mask">
            <span className="hl-line hl-line-2 font-light text-white/85">{HERO.h1Line2}</span>
          </span>
        </h1>

        <p className="ha ha-sub mt-6 max-w-[452px] text-lg leading-relaxed text-ink/70 max-[900px]:mx-auto">
          {HERO.subtitle}
        </p>

        <div className="ha ha-ctas mt-10 flex flex-wrap gap-3.5 max-[900px]:justify-center max-sm:[&>*]:flex-[1_1_100%]">
          <MagneticButton>
            <Link
              href="/onboarding"
              className="btn btn-white w-full"
              onClick={() => trackEvent({ name: "cta_click", props: { location: "hero" } })}
            >
              Start my plan
            </Link>
          </MagneticButton>
          <a href="#how" className="btn btn-glass group gap-2">
            <PlayCircle className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
            How it works
          </a>
        </div>

        <div className="ha ha-badges mt-[72px] flex max-w-[640px] max-[900px]:mx-auto max-[900px]:justify-center max-sm:mt-14 max-sm:flex-col max-sm:items-center max-sm:gap-5">
          {HERO.badges.map((b, i) => (
            <div
              key={b.title}
              className={`pr-7 max-sm:border-0 max-sm:p-0 ${i > 0 ? "border-l border-ink/15 pl-7" : ""}`}
            >
              <p className="flex items-center gap-2 text-sm font-medium max-[900px]:justify-center">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-sage-mid"
                  aria-hidden="true"
                />
                {b.title}
              </p>
              <p className="mt-1 text-[12.5px] text-ink/55">{b.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#transform"
        aria-label="Scroll to explore"
        className="scroll-cue absolute bottom-7 left-1/2 z-[2] -translate-x-1/2 text-ink/45 transition-colors hover:text-ink/70 max-md:hidden"
      >
        <ChevronDown className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
      </a>
    </section>
  );
}
