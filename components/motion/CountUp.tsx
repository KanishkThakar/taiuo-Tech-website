"use client";

import { useEffect, useRef } from "react";

/**
 * Animates the LAST number inside `value` from 0 to its target on first
 * view, preserving prefix/suffix — handles "10-15%", "$1,261", "2.3x",
 * "-8yr", "+0.4", "5min" correctly. Falls back to static text when the
 * user prefers reduced motion.
 */
export default function CountUp({
  value,
  className,
  duration = 1100,
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

    const m = value.match(/([\d,]+(?:\.\d+)?)(?!.*\d)/);
    if (!m || m.index === undefined) {
      el.textContent = value;
      return;
    }
    const numStr = m[1];
    const target = parseFloat(numStr.replace(/,/g, ""));
    const decimals = (numStr.split(".")[1] || "").length;
    const useComma = numStr.includes(",");
    const prefix = value.slice(0, m.index);
    const suffix = value.slice(m.index + numStr.length);

    let frameId = 0;
    const run = () => {
      const t0 = performance.now();
      const frame = (t: number) => {
        const p = Math.min((t - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        let v = (target * eased).toFixed(decimals);
        if (useComma) {
          v = Number(v).toLocaleString("en-US", { minimumFractionDigits: decimals });
        }
        el.textContent = prefix + v + suffix;
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
