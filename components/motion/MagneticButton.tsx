"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { MAGNET_PULL } from "@/components/motion/spec";

/**
 * Magnetic pull on the primary CTA (motion spec §11) — the wrapped element
 * leans a few px toward the cursor. Desktop pointer:fine only; disabled
 * under prefers-reduced-motion; transform-only (compositor-friendly).
 */
export default function MagneticButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `translate(${relX * MAGNET_PULL * 2}px, ${relY * MAGNET_PULL * 2}px)`;
    };
    const onLeave = () => {
      el.style.transform = "translate(0, 0)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ transition: "transform 0.2s ease-out" }}>
      {children}
    </div>
  );
}
