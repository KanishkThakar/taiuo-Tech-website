"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Droplet,
  Flame,
  Moon,
  ScanFace,
  Shield,
  Sparkles,
  Star,
  Sun,
  Target,
  TrendingUp,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { loadDashboard } from "@/lib/product/data";
import { relativeTime } from "@/lib/product/format";
import type { DashboardData } from "@/lib/product/types";
import { useUser } from "@/components/app/session";
import { AreaTrend, MetricBar, RadialScore, STATUS_COLOR } from "@/components/app/charts";

const HABIT_ICONS: Record<string, LucideIcon> = { sun: Sun, shield: Shield, droplet: Droplet, moon: Moon };
const ACHIEVE_ICONS: Record<string, LucideIcon> = {
  scan: ScanFace,
  flame: Flame,
  trending: TrendingUp,
  droplet: Droplet,
  trophy: Trophy,
  star: Star,
};

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } }),
};

function Skeleton() {
  return (
    <div className="grid gap-5">
      <div className="skeleton h-8 w-64" />
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="skeleton h-64" />
        <div className="skeleton h-64" />
        <div className="skeleton h-64" />
      </div>
      <div className="skeleton h-72" />
    </div>
  );
}

export default function DashboardPage() {
  const { userId } = useUser();
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    let active = true;
    loadDashboard(getSupabase(), userId).then((d) => active && setData(d));
    return () => {
      active = false;
    };
  }, [userId]);

  if (!data) return <Skeleton />;

  const firstName = data.profile?.full_name?.split(" ")[0] ?? data.profile?.display_name ?? "there";
  const { health, latestScan, weekly, insights, recommendations, habits, achievements, scans } = data;
  const weekAvg = Math.round(weekly.reduce((s, p) => s + p.value, 0) / weekly.length);

  let i = 0;
  const item = () => ({ variants: fade, initial: "hidden" as const, animate: "show" as const, custom: i++ });

  return (
    <div className="grid gap-6">
      {/* header */}
      <motion.div {...item()} className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Good to see you, {firstName}</h2>
          <p className="mt-1 text-[15px] text-body">Here&apos;s how your glow-up is progressing.</p>
        </div>
        {data.usingMock && (
          <span className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-body">
            Demo data
          </span>
        )}
      </motion.div>

      {/* top row */}
      <div className="grid gap-5 lg:grid-cols-3">
        <motion.div {...item()} className="app-card flex flex-col items-center p-6 text-center">
          <span className="self-start text-sm font-semibold text-ink">AI Health Score</span>
          <RadialScore value={health.overall} label="of 100" sub={`${health.confidence}% confidence`} />
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                health.delta >= 0 ? "bg-[#5f8f7e]/15 text-[#4d7c6b]" : "bg-[#c98a6a]/15 text-[#b06a4a]"
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" /> {health.delta >= 0 ? "+" : ""}
              {health.delta} vs last
            </span>
            <span className="text-xs text-body">Potential {health.potential}</span>
          </div>
        </motion.div>

        <motion.div {...item()} className="app-card p-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-ink">Weekly trend</span>
            <span className="text-xs text-body">avg {weekAvg}</span>
          </div>
          <div className="mt-4">
            <AreaTrend points={weekly} />
          </div>
          <div className="mt-3 flex justify-between text-[11px] text-faint">
            {weekly.map((p) => (
              <span key={p.label}>{p.label}</span>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...item()}
          className="relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 text-[#1a2424]"
          style={{ background: "linear-gradient(150deg,#c8d4d4,#a8b5b5)" }}
        >
          <div>
            <Sparkles className="h-6 w-6" strokeWidth={1.75} />
            <h3 className="mt-3 text-lg font-semibold">Ready for a new scan?</h3>
            <p className="mt-1 text-sm text-[#1a2424]/70">
              A fresh analysis every few weeks tracks your real progress.
            </p>
          </div>
          <Link
            href="/scan"
            className="btn mt-5 w-full gap-2 bg-[#181e1d] text-white shadow-mid hover:shadow-deep"
          >
            <ScanFace className="h-[18px] w-[18px]" strokeWidth={1.75} /> Start face scan
          </Link>
        </motion.div>
      </div>

      {/* latest metrics */}
      {latestScan && (
        <motion.div {...item()} className="app-card p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-ink">Latest analysis</h3>
              <p className="mt-0.5 text-xs text-body">{relativeTime(latestScan.created_at)} · {latestScan.metrics.length} markers</p>
            </div>
            <Link href="/reports" className="inline-flex items-center gap-1 text-sm font-medium text-body hover:text-ink">
              Full report <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {latestScan.metrics.map((m) => (
              <div key={m.key}>
                <div className="mb-1.5 flex items-center justify-between text-[13.5px]">
                  <span className="text-ink">{m.label}</span>
                  <span className="font-semibold tabular-nums" style={{ color: STATUS_COLOR[m.status] }}>
                    {m.score}
                  </span>
                </div>
                <MetricBar score={m.score} status={m.status} />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* insights */}
      <div className="grid gap-5 md:grid-cols-3">
        {insights.map((ins) => (
          <motion.div {...item()} key={ins.id} className="app-card p-5">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                ins.tone === "positive" ? "bg-[#5f8f7e]" : ins.tone === "focus" ? "bg-[#c98a6a]" : "bg-sage-mid"
              }`}
            />
            <h4 className="mt-3 text-[15px] font-semibold text-ink">{ins.title}</h4>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-body">{ins.body}</p>
          </motion.div>
        ))}
      </div>

      {/* recommendations + habits */}
      <div className="grid gap-5 lg:grid-cols-2">
        <motion.div {...item()} className="app-card p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
            <Sparkles className="h-4 w-4 text-sage-mid" /> Recommendations
          </h3>
          <div className="grid gap-3">
            {recommendations.map((r) => (
              <div key={r.id} className="flex items-start gap-3 rounded-xl border border-line p-3">
                <span className="mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-lg bg-sage-base/15 text-[#5F7070]">
                  <Target className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-medium text-ink">{r.title}</p>
                    <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-faint">
                      {r.impact}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[13px] text-body">{r.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div {...item()} className="app-card p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
            <Flame className="h-4 w-4 text-[#c98a6a]" /> Today&apos;s habits
          </h3>
          <div className="grid gap-2.5">
            {habits.map((hb) => {
              const Icon = HABIT_ICONS[hb.icon] ?? Sun;
              return (
                <div key={hb.id} className="flex items-center gap-3 rounded-xl border border-line p-3">
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-sage-base/15 text-[#5F7070]">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-medium text-ink">{hb.name}</p>
                    <p className="text-[12px] text-body">
                      {hb.cadence} · {hb.streak}-day streak
                    </p>
                  </div>
                  <span
                    className={`h-5 w-5 flex-none rounded-full border-2 ${
                      hb.done_today ? "border-[#5f8f7e] bg-[#5f8f7e]" : "border-line"
                    }`}
                    aria-label={hb.done_today ? "Done" : "Not done"}
                  />
                </div>
              );
            })}
          </div>
          <Link href="/goals" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-body hover:text-ink">
            Manage habits <ArrowUpRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>

      {/* achievements */}
      <motion.div {...item()} className="app-card p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
          <Trophy className="h-4 w-4 text-[#b79a5e]" /> Achievements
        </h3>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {achievements.map((a) => {
            const Icon = ACHIEVE_ICONS[a.icon] ?? Star;
            return (
              <div
                key={a.id}
                title={a.detail}
                className={`flex flex-col items-center gap-2 rounded-xl border border-line p-3 text-center ${
                  a.unlocked ? "" : "opacity-45"
                }`}
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-full ${
                    a.unlocked ? "bg-sage-base/20 text-[#4E5F5F]" : "bg-surface-2 text-faint"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <span className="text-[11px] font-medium leading-tight text-ink">{a.title}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {scans.length > 0 && (
        <p className="text-center text-xs text-faint">
          {scans.length} scan{scans.length > 1 ? "s" : ""} on record ·{" "}
          <Link href="/history" className="underline underline-offset-2 hover:text-body">
            view history
          </Link>
        </p>
      )}
    </div>
  );
}
