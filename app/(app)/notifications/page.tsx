"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Bell, CheckCheck, FileText, ScanFace, Sparkles } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { loadNotifications } from "@/lib/product/data";
import { relativeTime } from "@/lib/product/format";
import type { AppNotification, NotificationType } from "@/lib/product/types";
import { useUser } from "@/components/app/session";

const ICONS: Record<NotificationType, typeof Bell> = {
  scan: ScanFace,
  protocol: Sparkles,
  reminder: Bell,
  system: FileText,
};

type Filter = "all" | "unread";

export default function NotificationsPage() {
  const { userId } = useUser();
  const [items, setItems] = useState<AppNotification[] | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    let active = true;
    loadNotifications(getSupabase(), userId).then((n) => active && setItems(n));
    return () => {
      active = false;
    };
  }, [userId]);

  const markAll = () => setItems((prev) => prev?.map((n) => ({ ...n, read: true })) ?? prev);
  const toggle = (id: string) =>
    setItems((prev) => prev?.map((n) => (n.id === id ? { ...n, read: !n.read } : n)) ?? prev);

  const unread = items?.filter((n) => !n.read).length ?? 0;
  const shown = (items ?? []).filter((n) => (filter === "unread" ? !n.read : true));

  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Notifications</h2>
          <p className="mt-1 text-[15px] text-body">
            {unread > 0 ? `You have ${unread} unread` : "You're all caught up."}
          </p>
        </div>
        {unread > 0 && (
          <button
            onClick={markAll}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-body transition-colors hover:text-ink"
          >
            <CheckCheck className="h-4 w-4" /> Mark all read
          </button>
        )}
      </div>

      <div className="inline-flex w-fit rounded-xl border border-line bg-surface-2 p-1">
        {(["all", "unread"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
              filter === f ? "bg-surface text-ink shadow-card" : "text-body hover:text-ink"
            }`}
            aria-pressed={filter === f}
          >
            {f}
            {f === "unread" && unread > 0 ? ` (${unread})` : ""}
          </button>
        ))}
      </div>

      <div className="grid gap-2.5">
        {items === null ? (
          Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-20" />)
        ) : shown.length === 0 ? (
          <div className="app-card grid place-items-center gap-2 py-14 text-center">
            <Bell className="h-8 w-8 text-faint" strokeWidth={1.5} />
            <p className="text-[15px] text-body">
              {filter === "unread" ? "No unread notifications." : "Nothing here yet."}
            </p>
          </div>
        ) : (
          shown.map((n, idx) => {
            const Icon = ICONS[n.type];
            return (
              <motion.button
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => toggle(n.id)}
                className={`app-card flex items-start gap-3.5 p-4 text-left transition-colors hover:border-sage-base/40 ${
                  n.read ? "" : "border-sage-base/30"
                }`}
              >
                <span className="mt-0.5 grid h-9 w-9 flex-none place-items-center rounded-lg bg-sage-base/15 text-[color:var(--sage-accent)]">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[14.5px] font-medium text-ink">{n.title}</p>
                    {!n.read && <span className="h-2 w-2 flex-none rounded-full bg-sage-mid" />}
                  </div>
                  <p className="mt-0.5 text-[13.5px] leading-relaxed text-body">{n.body}</p>
                  <p className="mt-1.5 text-[12px] text-faint">{relativeTime(n.created_at)}</p>
                </div>
              </motion.button>
            );
          })
        )}
      </div>
    </div>
  );
}
