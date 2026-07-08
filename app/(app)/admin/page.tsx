"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  Activity,
  BarChart3,
  DollarSign,
  ScanFace,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { loadAdminOverview } from "@/lib/product/data";
import { formatCurrency, formatNumber, relativeTime } from "@/lib/product/format";
import type { AdminOverview, AdminUserRow } from "@/lib/product/types";
import { useAdminAccess } from "@/components/app/hooks";
import { AreaTrend } from "@/components/app/charts";

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const STATUS_STYLE: Record<AdminUserRow["status"], string> = {
  active: "bg-[#5f8f7e]/15 text-[#4d7c6b]",
  invited: "bg-[#b79a5e]/15 text-[#8a7238]",
  churned: "bg-[#c98a6a]/15 text-[#b06a4a]",
};

const PLAN_STYLE: Record<AdminUserRow["plan"], string> = {
  free: "text-faint",
  pro: "text-ink",
  yearly: "text-[#4d7c6b]",
};

function Stat({
  Icon,
  label,
  value,
  hint,
}: {
  Icon: LucideIcon;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="app-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-medium text-body">{label}</span>
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-sage-base/15 text-[#5F7070]">
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
      </div>
      <p className="mt-3 text-2xl font-semibold tabular-nums text-ink">{value}</p>
      {hint && <p className="mt-0.5 text-xs text-faint">{hint}</p>}
    </div>
  );
}

function AdminSkeleton() {
  return (
    <div className="grid gap-6">
      <div className="skeleton h-8 w-48" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton h-28" />
        ))}
      </div>
      <div className="skeleton h-72" />
    </div>
  );
}

export default function AdminPage() {
  const access = useAdminAccess();
  const router = useRouter();
  const [data, setData] = useState<AdminOverview | null>(null);

  useEffect(() => {
    if (access !== "granted") return;
    let active = true;
    loadAdminOverview(getSupabase()).then((d) => active && setData(d));
    return () => {
      active = false;
    };
  }, [access]);

  useEffect(() => {
    if (access === "denied") router.replace("/dashboard");
  }, [access, router]);

  if (access === "denied") {
    return (
      <div className="mx-auto grid max-w-md place-items-center gap-3 py-20 text-center">
        <ShieldCheck className="h-10 w-10 text-faint" strokeWidth={1.5} />
        <h2 className="text-xl font-semibold text-ink">Admin access required</h2>
        <p className="text-[15px] text-body">Redirecting you to your dashboard…</p>
      </div>
    );
  }

  if (access === "loading" || !data) return <AdminSkeleton />;

  const signupAvg = Math.round(data.signups.reduce((s, p) => s + p.value, 0) / data.signups.length);
  const maxPlan = Math.max(...data.planSplit.map((p) => p.count), 1);

  let i = 0;
  const item = () => ({ variants: fade, initial: "hidden" as const, animate: "show" as const, custom: i++ });

  return (
    <div className="grid gap-6">
      <motion.div {...item()} className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-ink">
            <ShieldCheck className="h-6 w-6 text-sage-mid" strokeWidth={1.75} /> Admin
          </h2>
          <p className="mt-1 text-[15px] text-body">Platform health, members, and activity at a glance.</p>
        </div>
        {data.usingMock && (
          <span className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-medium text-body">
            Demo preview
          </span>
        )}
      </motion.div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { Icon: Users, label: "Total users", value: formatNumber(data.totalUsers), hint: `${formatNumber(data.activeUsers)} active` },
          { Icon: Activity, label: "Active this month", value: formatNumber(data.activeUsers), hint: `${Math.round((data.activeUsers / data.totalUsers) * 100)}% of base` },
          { Icon: ScanFace, label: "Total scans", value: formatNumber(data.totalScans), hint: `${formatNumber(data.scansThisWeek)} this week` },
          { Icon: BarChart3, label: "Avg health score", value: `${data.avgScore}`, hint: "across all members" },
          { Icon: TrendingUp, label: "Signups / day", value: `${signupAvg}`, hint: "7-day average" },
          { Icon: DollarSign, label: "MRR", value: formatCurrency(data.revenueMrr), hint: "recurring revenue" },
        ].map((s) => (
          <motion.div key={s.label} {...item()}>
            <Stat {...s} />
          </motion.div>
        ))}
      </div>

      {/* trend + plan split */}
      <div className="grid gap-5 lg:grid-cols-3">
        <motion.div {...item()} className="app-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-ink">New signups</span>
            <span className="text-xs text-body">avg {signupAvg}/day</span>
          </div>
          <div className="mt-4">
            <AreaTrend points={data.signups} />
          </div>
          <div className="mt-3 flex justify-between text-[11px] text-faint">
            {data.signups.map((p) => (
              <span key={p.label}>{p.label}</span>
            ))}
          </div>
        </motion.div>

        <motion.div {...item()} className="app-card p-6">
          <span className="text-sm font-semibold text-ink">Plan mix</span>
          <div className="mt-4 grid gap-3.5">
            {data.planSplit.map((p) => (
              <div key={p.plan}>
                <div className="mb-1 flex items-center justify-between text-[13px]">
                  <span className="text-body">{p.plan}</span>
                  <span className="font-semibold tabular-nums text-ink">{p.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full bg-sage-mid"
                    style={{ width: `${(p.count / maxPlan) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* members table */}
      <motion.div {...item()} className="app-card overflow-hidden p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <h3 className="text-sm font-semibold text-ink">Members</h3>
          <span className="text-xs text-body">{data.users.length} shown</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[13.5px]">
            <thead>
              <tr className="border-y border-line text-[12px] uppercase tracking-wide text-faint">
                <th className="px-6 py-2.5 font-medium">Member</th>
                <th className="px-6 py-2.5 font-medium">Plan</th>
                <th className="px-6 py-2.5 font-medium">Scans</th>
                <th className="px-6 py-2.5 font-medium">Last active</th>
                <th className="px-6 py-2.5 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((u) => (
                <tr key={u.id} className="border-b border-line last:border-b-0 hover:bg-surface-2/50">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-gradient-to-br from-[#c8d4d4] to-[#9dadad] text-[11px] font-semibold text-ink">
                        {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-ink">{u.name}</p>
                        <p className="truncate text-[12px] text-faint">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className={`px-6 py-3 font-medium capitalize ${PLAN_STYLE[u.plan]}`}>{u.plan}</td>
                  <td className="px-6 py-3 tabular-nums text-body">{u.scans}</td>
                  <td className="px-6 py-3 text-body">{relativeTime(u.lastActive)}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${STATUS_STYLE[u.status]}`}>
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* activity */}
      <motion.div {...item()} className="app-card p-6">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-ink">
          <Activity className="h-4 w-4 text-sage-mid" /> Recent activity
        </h3>
        <div className="grid gap-1">
          {data.activity.map((a) => (
            <div key={a.id} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-surface-2/50">
              <span className="h-1.5 w-1.5 flex-none rounded-full bg-sage-mid" />
              <p className="min-w-0 flex-1 truncate text-[13.5px] text-body">
                <span className="font-medium text-ink">{a.user}</span> {a.action}
              </p>
              <span className="flex-none text-[12px] text-faint">{relativeTime(a.at)}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
