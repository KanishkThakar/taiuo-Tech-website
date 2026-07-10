"use client";

import Link from "next/link";
import { Download, Share2, Sparkles } from "lucide-react";
import { formatDate } from "@/lib/product/format";
import type { Recommendation } from "@/lib/product/types";
import { useDashboard } from "@/components/app/hooks";
import { MetricBar, RadialScore, STATUS_TEXT } from "@/components/app/charts";

const CATEGORY_LABEL: Record<Recommendation["category"], string> = {
  skincare: "Skincare",
  lifestyle: "Lifestyle",
  treatment: "Treatments",
};

function Skeleton() {
  return (
    <div className="grid gap-4">
      <div className="skeleton h-8 w-40" />
      <div className="skeleton h-52" />
      <div className="skeleton h-64" />
    </div>
  );
}

export default function ReportsPage() {
  const data = useDashboard();
  if (!data) return <Skeleton />;

  const { latestScan, recommendations } = data;
  if (!latestScan) {
    return (
      <div className="app-card p-10 text-center">
        <h2 className="text-xl font-semibold text-ink">No report yet</h2>
        <p className="mt-2 text-[15px] text-body">Run your first scan to generate a report.</p>
        <Link href="/scan" className="btn btn-dark mt-5">
          Start a scan
        </Link>
      </div>
    );
  }

  const grouped = recommendations.reduce<Record<string, Recommendation[]>>((acc, r) => {
    (acc[r.category] ??= []).push(r);
    return acc;
  }, {});

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Your report</h2>
          <p className="mt-1 text-[15px] text-body">
            {formatDate(latestScan.created_at)} · {latestScan.metrics.length} markers analyzed
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="btn btn-glass !bg-surface-2 gap-2 text-sm">
            <Download className="h-4 w-4" /> Save PDF
          </button>
          <button className="btn btn-glass !bg-surface-2 gap-2 text-sm">
            <Share2 className="h-4 w-4" /> Share
          </button>
        </div>
      </div>

      <div className="app-card grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center">
        <RadialScore value={latestScan.overall_score} label="of 100" sub={`${latestScan.confidence}% confidence`} />
        <div>
          <h3 className="text-lg font-semibold text-ink">A strong, balanced result</h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-body">
            Your features score well overall. The protocol below prioritises your lowest markers so
            small, consistent changes compound into a visible difference.
          </p>
        </div>
      </div>

      <div className="app-card p-6">
        <h3 className="mb-5 text-sm font-semibold text-ink">Marker breakdown</h3>
        <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {latestScan.metrics.map((m) => (
            <div key={m.key}>
              <div className="mb-1.5 flex items-center justify-between text-[13.5px]">
                <span className="font-medium text-ink">{m.label}</span>
                <span className="font-semibold tabular-nums" style={{ color: STATUS_TEXT[m.status] }}>
                  {m.score} · {m.status}
                </span>
              </div>
              <MetricBar score={m.score} status={m.status} />
              <p className="mt-1.5 text-[12.5px] text-body">{m.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="app-card p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
          <Sparkles className="h-4 w-4 text-sage-mid" /> Your personalized protocol
        </h3>
        <div className="grid gap-5">
          {Object.entries(grouped).map(([cat, recs]) => (
            <div key={cat}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-faint">
                {CATEGORY_LABEL[cat as Recommendation["category"]]}
              </p>
              <div className="grid gap-2.5">
                {recs.map((r) => (
                  <div key={r.id} className="flex items-start gap-3 rounded-xl border border-line p-3">
                    <span className="mt-1.5 h-2 w-2 flex-none rounded-full bg-sage-mid" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-medium text-ink">{r.title}</p>
                        <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-faint">
                          {r.impact} impact
                        </span>
                      </div>
                      <p className="mt-0.5 text-[13px] text-body">{r.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-[11px] text-faint">
        Demo report — analysis is simulated until the engine is connected.
      </p>
    </div>
  );
}
