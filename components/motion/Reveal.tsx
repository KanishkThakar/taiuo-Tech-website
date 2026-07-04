"use client";

import { type ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** animate direct children one by one instead of the wrapper */
  stagger?: boolean;
  delay?: number;
  y?: number;
}

/** GSAP ScrollTrigger fade-up reveal (once), per master-prompt Section 1E. */
export default function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  y = 36,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const targets: Element[] = stagger ? Array.from(el.children) : [el];
    gsap.set(targets, { opacity: 0, y });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 86%",
      once: true,
      onEnter: () =>
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          delay,
          ease: "power3.out",
          stagger: stagger ? 0.1 : 0,
          overwrite: true,
        }),
    });

    return () => {
      st.kill();
      gsap.set(targets, { clearProps: "opacity,transform" });
    };
  }, [stagger, delay, y]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
