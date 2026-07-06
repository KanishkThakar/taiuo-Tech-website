import type { MetricStatus, WeeklyPoint } from "@/lib/product/types";

/* status → sage-family colour (kept within the brand palette) */
export const STATUS_COLOR: Record<MetricStatus, string> = {
  excellent: "#5f8f7e",
  good: "#7fa08f",
  fair: "#b79a5e",
  attention: "#c98a6a",
};

/** Circular progress ring with the score centred. Sage gradient stroke. */
export function RadialScore({
  value,
  size = 168,
  stroke = 12,
  label,
  sub,
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  sub?: string;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  const dash = (pct / 100) * circ;
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="radial-sage" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#c8d4d4" />
            <stop offset="1" stopColor="#8b9a9a" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-line)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="url(#radial-sage)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
          style={{ transition: "stroke-dasharray 0.9s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-[2.4rem] font-semibold leading-none tracking-tight text-ink tabular-nums">
            {Math.round(value)}
          </div>
          {label && <div className="mt-1 text-xs font-medium uppercase tracking-wider text-faint">{label}</div>}
          {sub && <div className="mt-0.5 text-xs text-body">{sub}</div>}
        </div>
      </div>
    </div>
  );
}

/** Small area trend chart from weekly points. */
export function AreaTrend({ points, height = 120 }: { points: WeeklyPoint[]; height?: number }) {
  const w = 320;
  const h = height;
  const pad = 8;
  const vals = points.map((p) => p.value);
  const min = Math.min(...vals) - 4;
  const max = Math.max(...vals) + 4;
  const span = Math.max(1, max - min);
  const stepX = (w - pad * 2) / Math.max(1, points.length - 1);
  const xy = points.map((p, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (p.value - min) / span) * (h - pad * 2);
    return [x, y] as const;
  });
  const line = xy.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${xy[xy.length - 1]?.[0].toFixed(1)},${h - pad} L${xy[0]?.[0].toFixed(1)},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" preserveAspectRatio="none" style={{ height }}>
      <defs>
        <linearGradient id="area-sage" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9dadad" stopOpacity="0.35" />
          <stop offset="1" stopColor="#9dadad" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#area-sage)" />
      <path d={line} fill="none" stroke="#8b9a9a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {xy.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="var(--color-surface)" stroke="#8b9a9a" strokeWidth="2" />
      ))}
    </svg>
  );
}

/** Horizontal metric bar coloured by status. */
export function MetricBar({ score, status }: { score: number; status: MetricStatus }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
      <div
        className="h-full rounded-full"
        style={{
          width: `${Math.max(4, Math.min(100, score))}%`,
          background: STATUS_COLOR[status],
          transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}
      />
    </div>
  );
}
