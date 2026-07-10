"use client";

import { useEffect, useState } from "react";
import { Droplet, Flame, Moon, Plus, Sun, Target, type LucideIcon } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { loadDashboard } from "@/lib/product/data";
import type { DashboardData, Habit } from "@/lib/product/types";
import { useUser } from "@/components/app/session";

const ICONS: Record<string, LucideIcon> = { sun: Sun, shield: Target, droplet: Droplet, moon: Moon };

function Skeleton() {
  return (
    <div className="grid gap-4">
      <div className="skeleton h-8 w-40" />
      <div className="skeleton h-28" />
      <div className="skeleton h-64" />
    </div>
  );
}

export default function GoalsPage() {
  const { userId } = useUser();
  const [data, setData] = useState<DashboardData | null>(null);
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    let active = true;
    loadDashboard(getSupabase(), userId).then((d) => {
      if (!active) return;
      setData(d);
      setHabits(d.habits);
    });
    return () => {
      active = false;
    };
  }, [userId]);

  if (!data) return <Skeleton />;

  const goals = data.profile?.goals ?? ["Overall glow-up", "Clearer skin"];
  const doneCount = habits.filter((h) => h.done_today).length;
  const bestStreak = habits.reduce((m, h) => Math.max(m, h.streak), 0);

  const toggle = (id: string) =>
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id
          ? { ...h, done_today: !h.done_today, streak: h.done_today ? Math.max(0, h.streak - 1) : h.streak + 1 }
          : h,
      ),
    );

  return (
    <div className="grid gap-6">
      <div>
        <h2 className="text-2xl font-semibold text-ink">Goals &amp; habits</h2>
        <p className="mt-1 text-[15px] text-body">Small, consistent actions compound into results.</p>
      </div>

      {/* summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="app-card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-faint">Today</p>
          <p className="mt-2 text-2xl font-semibold text-ink">
            {doneCount}/{habits.length}
          </p>
          <p className="text-[13px] text-body">habits complete</p>
        </div>
        <div className="app-card flex items-center gap-3 p-5">
          <Flame className="h-8 w-8 text-[#c98a6a]" strokeWidth={1.5} />
          <div>
            <p className="text-2xl font-semibold text-ink">{bestStreak}</p>
            <p className="text-[13px] text-body">day best streak</p>
          </div>
        </div>
        <div className="app-card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-faint">Focus goals</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {goals.map((g) => (
              <span key={g} className="rounded-full bg-sage-base/15 px-2.5 py-1 text-[12px] font-medium text-[color:var(--sage-accent)]">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* habits */}
      <div className="app-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-ink">Daily habits</h3>
          <button className="inline-flex items-center gap-1 text-sm font-medium text-body hover:text-ink">
            <Plus className="h-4 w-4" /> Add habit
          </button>
        </div>
        <div className="grid gap-2.5">
          {habits.map((hb) => {
            const Icon = ICONS[hb.icon] ?? Sun;
            return (
              <button
                key={hb.id}
                onClick={() => toggle(hb.id)}
                className="flex items-center gap-3 rounded-xl border border-line p-3 text-left transition-colors hover:border-sage-base/40"
              >
                <span className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-sage-base/15 text-[color:var(--sage-accent)]">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[14.5px] font-medium text-ink">{hb.name}</p>
                  <p className="text-[12.5px] text-body">
                    {hb.cadence} · {hb.streak}-day streak
                  </p>
                </div>
                <span
                  className={`grid h-6 w-6 flex-none place-items-center rounded-full border-2 transition-colors ${
                    hb.done_today ? "border-[#5f8f7e] bg-[#5f8f7e] text-white" : "border-line text-transparent"
                  }`}
                >
                  ✓
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
