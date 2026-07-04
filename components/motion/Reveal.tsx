"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { REVEAL } from "@/components/motion/spec";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** animate direct children one by one instead of the wrapper */
  stagger?: boolean;
  delay?: number;
  y?: number;
}

/**
 * Scroll reveal per motion spec §11 — pure IntersectionObserver + CSS
 * transitions (globals: .reveal-item). No animation library on the
 * critical path, no forced layouts; content is visible whenever JS
 * is slow or absent, and instantly under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  y = REVEAL.y,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets: HTMLElement[] = stagger ? (Array.from(el.children) as HTMLElement[]) : [el];

    // never hide content already in the viewport
    if (el.getBoundingClientRect().top < window.innerHeight * 0.86) return;

    targets.forEach((t, i) => {
      t.classList.add("reveal-item");
      t.style.setProperty("--reveal-y", `${y}px`);
      t.style.transitionDelay = `${delay + (stagger ? i * REVEAL.stagger : 0)}s`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        targets.forEach((t) => t.classList.add("revealed"));
      },
      { rootMargin: "0px 0px -14% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      targets.forEach((t) => {
        t.classList.remove("reveal-item", "revealed");
        t.style.removeProperty("--reveal-y");
        t.style.transitionDelay = "";
      });
    };
  }, [stagger, delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
