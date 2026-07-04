"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";
import { clampPercent } from "@/lib/count-format";

/**
 * Draggable before/after comparison (pointer + touch + keyboard).
 * `after` is revealed with a clip-path so nothing distorts on drag.
 * On first scroll into view the divider sweeps 88% → 50%.
 */
export default function BeforeAfterSlider({
  before,
  after,
  ariaLabel,
}: {
  before: ReactNode;
  after: ReactNode;
  ariaLabel: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(50);
  const draggingRef = useRef(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const apply = () => {
      card.style.setProperty("--pos", `${posRef.current}%`);
      card.setAttribute("aria-valuenow", String(Math.round(posRef.current)));
    };
    apply();

    const fromEvent = (e: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      posRef.current = clampPercent(((e.clientX - rect.left) / rect.width) * 100);
      apply();
    };

    const onDown = (e: PointerEvent) => {
      draggingRef.current = true;
      card.setPointerCapture(e.pointerId);
      fromEvent(e);
    };
    const onMove = (e: PointerEvent) => {
      if (draggingRef.current) fromEvent(e);
    };
    const onUp = () => {
      draggingRef.current = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        posRef.current = clampPercent(posRef.current - 5);
        apply();
        e.preventDefault();
      }
      if (e.key === "ArrowRight") {
        posRef.current = clampPercent(posRef.current + 5);
        apply();
        e.preventDefault();
      }
    };

    card.addEventListener("pointerdown", onDown);
    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerup", onUp);
    card.addEventListener("pointercancel", onUp);
    card.addEventListener("keydown", onKey);

    /* intro sweep 88% → 50% on first view — plain IO + rAF, no library */
    let io: IntersectionObserver | undefined;
    let frameId = 0;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      posRef.current = 88;
      apply();
      io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          io?.disconnect();
          const t0 = performance.now() + 350;
          const frame = (t: number) => {
            if (draggingRef.current) return;
            const p = Math.min(Math.max((t - t0) / 1100, 0), 1);
            const eased = 1 - Math.pow(1 - p, 3);
            posRef.current = 88 + (50 - 88) * eased;
            apply();
            if (p < 1) frameId = requestAnimationFrame(frame);
          };
          frameId = requestAnimationFrame(frame);
        },
        { threshold: 0.4 },
      );
      io.observe(card);
    }

    return () => {
      card.removeEventListener("pointerdown", onDown);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerup", onUp);
      card.removeEventListener("pointercancel", onUp);
      card.removeEventListener("keydown", onKey);
      io?.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      role="slider"
      tabIndex={0}
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={50}
      className="relative aspect-[3/4] cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-2xl shadow-mid"
      style={{ "--pos": "50%" } as CSSProperties}
    >
      {/* before (base layer) */}
      <div className="absolute inset-0">{before}</div>
      {/* after, clipped from the divider rightwards */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ clipPath: "inset(0 0 0 var(--pos))" }}
      >
        {after}
      </div>
      {/* divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-[2px] -translate-x-px bg-white/90"
        style={{ left: "var(--pos)" }}
      >
        <div className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-deep">
          <svg
            viewBox="0 0 24 24"
            className="h-[18px] w-[18px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 6-6 6 6 6" />
            <path d="m15 6 6 6-6 6" />
          </svg>
        </div>
      </div>
      <span className="pointer-events-none absolute left-3 top-3 rounded-md bg-black/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-md bg-black/40 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm">
        After
      </span>
    </div>
  );
}
