"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import MagneticButton from "@/components/motion/MagneticButton";
import { trackEvent } from "@/lib/analytics";
import { HERO } from "@/lib/data";

/**
 * The whole hero entrance is pure CSS (globals: .ha / .hl-line / .hp-enter)
 * so it starts at first paint with zero hydration dependency — desktop gets
 * the staged sequence, mobile paints instantly (LCP-first, v4 §10).
 * gsap is dynamic-imported post-paint purely for the portrait parallax.
 */
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  /* portrait parallax — a 6-line rAF scroll handler, no library */
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
      className="relative flex min-h-svh items-center overflow-hidden pt-[72px] max-md:pt-16"
      style={{
        background: "linear-gradient(135deg, #A8B5B5 0%, #B8C5C5 50%, #C8D4D4 100%)",
      }}
    >
      {/* ambient orbs */}
      <div
        className="hero-orb hero-orb-white right-[-8%] top-[-15%] h-[600px] w-[600px]"
        aria-hidden="true"
      />
      <div
        className="hero-orb hero-orb-sage bottom-[-12%] left-[-6%] h-[420px] w-[420px] [animation-direction:reverse] [animation-duration:15s]"
        aria-hidden="true"
      />

      {/* portrait — desktop only; CSS entrance, GSAP parallax post-paint */}
      <div className="hp-enter absolute inset-y-0 right-0 w-[46%] max-lg:w-[52%] max-[900px]:hidden">
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
        <p className="ha ha-label caption-label mb-6 text-ink/60">{HERO.label}</p>

        <h1 className="h1-display">
          <span className="hl-mask">
            <span className="hl-line hl-line-1">{HERO.h1Line1}</span>
          </span>
          <span className="hl-mask">
            <span className="hl-line hl-line-2 font-light text-white/85">{HERO.h1Line2}</span>
          </span>
        </h1>

        <p className="ha ha-sub mt-6 max-w-[440px] text-lg text-ink/70 max-[900px]:mx-auto">
          {HERO.subtitle}
        </p>

        <div className="ha ha-ctas mt-10 flex flex-wrap gap-4 max-[900px]:justify-center max-sm:[&>*]:flex-[1_1_100%]">
          <MagneticButton>
            <Link
              href="/onboarding"
              className="btn btn-white w-full"
              onClick={() => trackEvent({ name: "cta_click", props: { location: "hero" } })}
            >
              Start my plan
            </Link>
          </MagneticButton>
          <a href="#how" className="btn btn-glass">
            How it works
          </a>
        </div>

        <div className="ha ha-badges mt-[72px] flex max-w-[640px] max-[900px]:mx-auto max-[900px]:justify-center max-sm:mt-14 max-sm:flex-col max-sm:items-center max-sm:gap-4">
          {HERO.badges.map((b, i) => (
            <div
              key={b.title}
              className={`pr-7 max-sm:border-0 max-sm:p-0 ${i > 0 ? "border-l border-ink/15 pl-7" : ""}`}
            >
              <p className="text-sm font-medium">{b.title}</p>
              <p className="mt-0.5 text-[12.5px] text-ink/55">{b.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
