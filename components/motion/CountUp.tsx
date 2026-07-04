"use client";

import { useEffect, useRef } from "react";
import { formatCountFrame, parseCountValue } from "@/lib/count-format";
import { COUNT_UP_MS } from "@/components/motion/spec";

/**
 * Animates the LAST number inside `value` from 0 to its target on first
 * view, preserving prefix/suffix — handles "10-15%", "$1,261", "2.3x",
 * "-8yr", "+0.4", "5min" correctly. Falls back to static text when the
 * user prefers reduced motion.
 */
export default function CountUp({
  value,
  className,
  duration = COUNT_UP_MS,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = value;
      return;
    }

    const spec = parseCountValue(value);
    if (!spec) {
      el.textContent = value;
      return;
    }

    let frameId = 0;
    const run = () => {
      const t0 = performance.now();
      const frame = (t: number) => {
        const p = Math.min((t - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = formatCountFrame(spec, eased);
        if (p < 1) frameId = requestAnimationFrame(frame);
        else el.textContent = value;
      };
      frameId = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
