/**
 * 5A — Editorial face-scan portrait.
 * Abstract head-and-shoulders silhouette on a soft sage gradient, overlaid
 * with a faint 512-point landmark mesh (thin sage lines + dots).
 * Pure SVG: renders offline, zero CLS, swappable for real art later.
 */

const JAW: [number, number][] = [
  [180, 340], [190, 400], [205, 450], [230, 495], [263, 522], [300, 530],
  [337, 522], [370, 495], [395, 450], [410, 400], [420, 340],
];
const BROW_L: [number, number][] = [[225, 258], [252, 246], [283, 252]];
const BROW_R: [number, number][] = [[317, 252], [348, 246], [375, 258]];
const EYE_L: [number, number][] = [[234, 288], [258, 279], [282, 288], [258, 295]];
const EYE_R: [number, number][] = [[318, 288], [342, 279], [366, 288], [342, 295]];
const NOSE: [number, number][] = [[300, 285], [296, 330], [300, 362], [286, 372], [314, 372]];
const LIPS: [number, number][] = [[264, 420], [300, 411], [336, 420], [300, 434]];
const FOREHEAD: [number, number][] = [[235, 185], [300, 168], [365, 185]];

const ALL_POINTS = [...JAW, ...BROW_L, ...BROW_R, ...EYE_L, ...EYE_R, ...NOSE, ...LIPS, ...FOREHEAD];

const toPoints = (pts: [number, number][]) => pts.map((p) => p.join(",")).join(" ");

/* light triangulation lines for the "mesh" feel */
const MESH_LINKS: [[number, number], [number, number]][] = [
  [FOREHEAD[0], BROW_L[0]], [FOREHEAD[1], NOSE[0]], [FOREHEAD[2], BROW_R[2]],
  [BROW_L[2], NOSE[0]], [BROW_R[0], NOSE[0]],
  [EYE_L[2], NOSE[1]], [EYE_R[0], NOSE[1]],
  [EYE_L[0], JAW[0]], [EYE_R[3], JAW[10]],
  [NOSE[3], LIPS[0]], [NOSE[4], LIPS[2]],
  [LIPS[0], JAW[3]], [LIPS[2], JAW[7]], [LIPS[3], JAW[5]],
];

export default function HeroPortrait({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 800"
      className={className}
      role="img"
      aria-label="Illustration: abstract portrait overlaid with a facial landmark mesh"
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id="hp-skin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8E1E1" />
          <stop offset="60%" stopColor="#BCC9C9" />
          <stop offset="100%" stopColor="#A8B5B5" />
        </linearGradient>
        <radialGradient id="hp-glow" cx="50%" cy="38%" r="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <filter id="hp-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* soft halo behind the head */}
      <circle cx="300" cy="330" r="240" fill="url(#hp-glow)" />

      {/* silhouette — head, neck, shoulders */}
      <g filter="url(#hp-soft)">
        <path
          d="M300 110
             C 400 110, 452 200, 448 320
             C 445 420, 400 505, 355 540
             L 355 590
             C 440 615, 520 680, 545 800
             L 55 800
             C 80 680, 160 615, 245 590
             L 245 540
             C 200 505, 155 420, 152 320
             C 148 200, 200 110, 300 110 Z"
          fill="url(#hp-skin)"
          opacity="0.95"
        />
      </g>

      {/* 512-point landmark mesh (abstracted) */}
      <g className="mesh-shimmer" stroke="#546666" strokeWidth="1" fill="none" opacity="0.7">
        <polyline points={toPoints(JAW)} strokeOpacity="0.45" />
        <polyline points={toPoints(BROW_L)} strokeOpacity="0.5" />
        <polyline points={toPoints(BROW_R)} strokeOpacity="0.5" />
        <polygon points={toPoints(EYE_L)} strokeOpacity="0.5" />
        <polygon points={toPoints(EYE_R)} strokeOpacity="0.5" />
        <polyline points={toPoints(NOSE)} strokeOpacity="0.45" />
        <polygon points={toPoints(LIPS)} strokeOpacity="0.5" />
        <polyline points={toPoints(FOREHEAD)} strokeOpacity="0.4" />
        {MESH_LINKS.map(([a, b], i) => (
          <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} strokeOpacity="0.22" />
        ))}
        <g fill="#415252" stroke="none">
          {ALL_POINTS.map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r="2.4" fillOpacity="0.75" />
          ))}
        </g>
      </g>
    </svg>
  );
}
