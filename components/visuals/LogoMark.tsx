/**
 * Taiuo logo mark — refined (V2).
 * Identity preserved: ink rounded-square tile + sage "T" (crossbar + stem).
 * Refinements: subtle vertical ink gradient + top sheen for depth, a sage
 * gradient on the mark, and a faint baseline "scan line" that nods to the
 * facial-analysis product without altering the recognizable T.
 * Server-safe (no hooks); duplicate gradient ids across instances are
 * identical so `url(#…)` resolves consistently.
 */
export default function LogoMark({
  className = "h-[30px] w-[30px]",
  title,
  animated = false,
}: {
  className?: string;
  title?: string;
  animated?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`${animated ? "logo-animated" : ""} ${className}`.trim()}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <linearGradient id="taiuo-tile" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#242c2c" />
          <stop offset="1" stopColor="#141818" />
        </linearGradient>
        <linearGradient id="taiuo-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#dbe4e4" />
          <stop offset="1" stopColor="#9dadad" />
        </linearGradient>
      </defs>
      <rect className="logo-tile" width="32" height="32" rx="9" fill="url(#taiuo-tile)" />
      {/* premium top sheen */}
      <rect x="1" y="1" width="30" height="30" rx="8" fill="none" stroke="#fff" strokeOpacity="0.06" />
      {/* faint scan baseline (product nod) */}
      <path
        d="M11.6 24h8.8"
        stroke="#c8d4d4"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeOpacity="0.34"
      />
      {/* the "T" — optically centered crossbar + stem */}
      <path
        className="logo-stroke"
        d="M9 10.6h14M16 10.6v11.3"
        stroke="url(#taiuo-stroke)"
        strokeWidth="2.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
