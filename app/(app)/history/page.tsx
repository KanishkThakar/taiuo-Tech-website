"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Minus, TrendingDown, TrendingUp } from "lucide-react";
import { formatDate } from "@/lib/product/format";
import { useDashboard } from "@/components/app/hooks";
import { AreaTrend, RadialScore } from "@/components/app/charts";

function Skeleton() {
  return (
    <div className="grid gap-4">
      <div className="skeleton h-8 w-48" />
      <div className="skeleton h-40" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="skeleton h-20" />
      ))}
    </div>
  );
}

export default function HistoryPage() {
  const data = useDashboard();
  if (!data) return <Skeleton />;

  const { scans, weekly } = data;
  const oldest = scans[scans.length - 1];
  const latest = scans[0];
  const totalDelta = latest && oldest ? latest.overall_score - oldest.overall_score : 0;

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-ink">Scan history</h2>
        <p className="mt-1 text-[15px] text-body">Your progress over time, scan by scan.</p>
      </div>

      {/* progress summary */}
      <div className="app-card grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center">
        <div className="flex items-center gap-5">
          <RadialScore value={latest?.overall_score ?? 0} size={120} stroke={10} label="now" />
          <div>
            <p className="text-sm text-body">Since your first scan</p>
            <p
              className={`mt-1 flex items-center gap-1.5 text-2xl font-semibold ${
                totalDelta > 0
                  ? "text-[color:var(--status-excellent)]"
                  : totalDelta < 0
                    ? "text-[color:var(--status-attention)]"
                    : "text-ink"
              }`}
            >
              {totalDelta > 0 ? <TrendingUp className="h-5 w-5" /> : totalDelta < 0 ? <TrendingDown className="h-5 w-5" /> : <Minus className="h-5 w-5" />}
              {totalDelta > 0 ? "+" : ""}
              {totalDelta} pts
            </p>
          </div>
        </div>
        <div className="min-w-0">
          <AreaTrend points={weekly} height={110} />
        </div>
      </div>

      {/* timeline */}
      <div className="relative grid gap-3 pl-6 before:absolute before:bottom-4 before:left-[7px] before:top-4 before:w-px before:bg-line">
        {scans.map((scan, idx) => {
          const prev = scans[idx + 1];
          const delta = prev ? scan.overall_score - prev.overall_score : 0;
          return (
            <motion.div
              key={scan.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <span className="absolute -left-[22px] top-6 h-3.5 w-3.5 rounded-full border-2 border-surface bg-sage-mid" />
              <div className="app-card flex items-center gap-4 p-4">
                <div className="grid h-12 w-12 flex-none place-items-center rounded-full bg-sage-base/15 text-lg font-semibold text-ink">
                  {scan.overall_score}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-medium text-ink">
                    {idx === 0 ? "Latest analysis" : "Analysis"}
                  </p>
                  <p className="text-[12.5px] text-body">
                    {formatDate(scan.created_at)} · {scan.metrics.length} markers
                  </p>
                </div>
                {prev && (
                  <span
                    className={`hidden items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold sm:inline-flex ${
                      delta >= 0
                        ? "bg-[#5f8f7e]/15 text-[color:var(--status-excellent)]"
                        : "bg-[#c98a6a]/15 text-[color:var(--status-attention)]"
                    }`}
                  >
                    {delta >= 0 ? "+" : ""}
                    {delta}
                  </span>
                )}
                <Link href="/reports" className="icon-btn" aria-label="View report">
                  <ArrowUpRight className="h-[18px] w-[18px]" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
