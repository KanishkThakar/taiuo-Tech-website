"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bell, CheckCheck, FileText, ScanFace, Sparkles } from "lucide-react";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
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

export function Notifications() {
  const { userId } = useUser();
  const [items, setItems] = useState<AppNotification[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    if (isSupabaseConfigured()) {
      loadNotifications(getSupabase(), userId).then((n) => active && setItems(n));
    }
    return () => {
      active = false;
    };
  }, [userId]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const unread = items.filter((i) => !i.read).length;
  const markAll = () => setItems((prev) => prev.map((i) => ({ ...i, read: true })));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        className="icon-btn relative"
        aria-label={`Notifications${unread ? `, ${unread} unread` : ""}`}
        onClick={() => setOpen((o) => !o)}
      >
        <Bell className="h-[18px] w-[18px]" strokeWidth={1.75} />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-sage-mid ring-2 ring-surface" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="app-card absolute right-0 z-50 mt-2 w-[340px] overflow-hidden p-0 shadow-float"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="text-sm font-semibold text-ink">Notifications</span>
              {unread > 0 && (
                <button
                  type="button"
                  onClick={markAll}
                  className="inline-flex items-center gap-1 text-xs font-medium text-body transition-colors hover:text-ink"
                >
                  <CheckCheck className="h-3.5 w-3.5" /> Mark all read
                </button>
              )}
            </div>
            <div className="max-h-[360px] overflow-y-auto">
              {items.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-body">You&apos;re all caught up.</p>
              ) : (
                items.map((n) => {
                  const Icon = ICONS[n.type];
                  return (
                    <div
                      key={n.id}
                      className={`flex gap-3 border-b border-line px-4 py-3 last:border-b-0 ${
                        n.read ? "" : "bg-surface-2/60"
                      }`}
                    >
                      <span className="mt-0.5 grid h-8 w-8 flex-none place-items-center rounded-lg bg-sage-base/15 text-[#5F7070]">
                        <Icon className="h-4 w-4" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[13.5px] font-medium text-ink">{n.title}</p>
                        <p className="mt-0.5 text-[13px] leading-snug text-body">{n.body}</p>
                        <p className="mt-1 text-[11px] text-faint">{relativeTime(n.created_at)}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
