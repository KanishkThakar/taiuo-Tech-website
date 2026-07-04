"use client";

import { type ReactNode, useEffect } from "react";
import { MotionConfig } from "motion/react";

/**
 * Site-wide motion foundation:
 * - Lenis buttered smooth scroll, synced to GSAP's ticker/ScrollTrigger
 * - Smooth anchor navigation with fixed-nav offset
 * - MotionConfig honours prefers-reduced-motion for all `motion` components
 *
 * gsap + lenis are dynamic-imported inside the effect so they evaluate
 * AFTER first paint — they were pushing FCP out by seconds on throttled
 * mobile CPUs (v4 §10).
 */
export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const lenis = new Lenis({ lerp: 0.12 });
      let rafId = 0;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      // smooth-scroll in-page anchors through Lenis, offset for the fixed nav
      const onClick = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        if (!anchor) return;
        const hash = anchor.getAttribute("href");
        if (!hash || hash === "#") return;
        const target = document.querySelector(hash);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -88 });
      };
      document.addEventListener("click", onClick);

      cleanup = () => {
        document.removeEventListener("click", onClick);
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
