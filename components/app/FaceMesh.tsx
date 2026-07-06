/**
 * Decorative animated face-mesh overlay for the scan screen.
 * Clearly a stylized demo (no real landmark detection yet) — labelled as
 * such in the UI. Pure SVG so it composites cheaply over the video.
 */
const DOTS: [number, number][] = [
  [50, 18], [38, 24], [62, 24], [30, 36], [70, 36], [26, 50], [74, 50],
  [30, 64], [70, 64], [38, 76], [62, 76], [50, 84],
  [42, 40], [58, 40], [50, 48], [44, 58], [56, 58], [50, 66],
];
const LINKS: [number, number][] = [
  [0, 1], [0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [6, 8],
  [7, 9], [8, 10], [9, 11], [10, 11], [12, 14], [13, 14], [14, 15],
  [15, 16], [16, 17], [12, 3], [13, 4], [15, 7], [16, 8],
];

export function FaceMesh({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${active ? "opacity-100" : "opacity-40"}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g stroke="#c8d4d4" strokeWidth="0.4" opacity="0.7">
        {LINKS.map(([a, b], i) => {
          const pa = DOTS[a];
          const pb = DOTS[b];
          if (!pa || !pb) return null;
          return <line key={i} x1={pa[0]} y1={pa[1]} x2={pb[0]} y2={pb[1]} />;
        })}
      </g>
      <g fill="#e6ecec">
        {DOTS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="0.9">
            {active && (
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur="2s"
                begin={`${(i % 6) * 0.15}s`}
                repeatCount="indefinite"
              />
            )}
          </circle>
        ))}
      </g>
    </svg>
  );
}
