"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO } from "@/lib/data";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: EASE },
  }),
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  /* GSAP scrubbed parallax on the portrait (Section 1E) */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.to(parallaxRef.current, {
      y: 130,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
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
      <div className="hero-orb right-[-8%] top-[-15%] h-[600px] w-[600px] bg-white/20" aria-hidden="true" />
      <div
        className="hero-orb bottom-[-12%] left-[-6%] h-[420px] w-[420px] bg-[#9DADAD]/50 [animation-direction:reverse] [animation-duration:15s]"
        aria-hidden="true"
      />

      {/* portrait */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
        className="absolute inset-y-0 right-0 w-[46%] max-lg:w-[52%] max-[900px]:hidden"
      >
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
      </motion.div>

      <div className="container-x relative z-[2] w-full py-16 max-[900px]:text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.35}
          className="caption-label mb-6 text-ink/60"
        >
          {HERO.label}
        </motion.p>

        <h1 className="h1-display">
          <motion.span variants={fadeUp} initial="hidden" animate="show" custom={0.5} className="block">
            {HERO.h1Line1}
          </motion.span>
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.65}
            className="block font-light text-white/85"
          >
            {HERO.h1Line2}
          </motion.span>
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.8}
          className="mt-6 max-w-[440px] text-lg text-ink/70 max-[900px]:mx-auto"
        >
          {HERO.subtitle}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0.95}
          className="mt-10 flex flex-wrap gap-4 max-[900px]:justify-center max-sm:[&>a]:flex-[1_1_100%]"
        >
          <Link href="/onboarding" className="btn btn-white">
            Start my plan
          </Link>
          <a href="#how" className="btn btn-glass">
            How it works
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1.15}
          className="mt-[72px] flex max-w-[640px] max-[900px]:mx-auto max-[900px]:justify-center max-sm:mt-14 max-sm:flex-col max-sm:items-center max-sm:gap-4"
        >
          {HERO.badges.map((b, i) => (
            <div
              key={b.title}
              className={`pr-7 max-sm:border-0 max-sm:p-0 ${i > 0 ? "border-l border-ink/15 pl-7" : ""}`}
            >
              <p className="text-sm font-medium">{b.title}</p>
              <p className="mt-0.5 text-[12.5px] text-ink/55">{b.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
