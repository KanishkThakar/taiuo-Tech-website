/**
 * MOTION SPEC — the single source of truth for motion values (v4 §11).
 * Calm, intentional, physical. If two animations compete at the same
 * scroll position, cut one.
 */

/** Signature ease — used for practically everything. */
export const EASE_SMOOTH: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Springy pop — dots, checkmarks. Use sparingly. */
export const EASE_SPRING: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

export const DURATION = {
  fast: 0.15, // hovers, presses
  normal: 0.3, // tab crossfades, menu
  slow: 0.65, // scroll reveals
  xslow: 0.8, // hero entrance beats
} as const;

/** Scroll-reveal geometry (GSAP Reveal component). */
export const REVEAL = {
  y: 36,
  duration: DURATION.slow,
  stagger: 0.1,
  /** trigger when element top crosses this viewport line */
  start: "top 86%",
  ease: "power3.out",
} as const;

/** Hero entrance beat timings (seconds) — content first, visual last. */
export const HERO_BEATS = {
  label: 0.35,
  h1Line1: 0.5,
  h1Line2: 0.65,
  subtitle: 0.8,
  ctas: 0.95,
  badges: 1.15,
  visual: 1.2,
} as const;

/** Count-up duration (ms). */
export const COUNT_UP_MS = 1100;

/** Magnetic CTA: max pull in px, applied desktop pointer:fine only. */
export const MAGNET_PULL = 5;
