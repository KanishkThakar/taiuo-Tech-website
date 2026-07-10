"use client";

import { useState } from "react";
import { Download, LogOut, Trash2 } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { useUser } from "@/components/app/session";
import { ThemeSegmented } from "@/components/app/theme";

function Switch({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 flex-none rounded-full transition-colors ${on ? "bg-[#5f8f7e]" : "bg-surface-2"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${on ? "translate-x-[22px]" : "translate-x-0.5"}`}
      />
    </button>
  );
}

function Row({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3.5">
      <div className="min-w-0">
        <p className="text-[14.5px] font-medium text-ink">{title}</p>
        {desc && <p className="mt-0.5 text-[13px] text-body">{desc}</p>}
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { userId, email, signOut } = useUser();
  const [notif, setNotif] = useState({ scan: true, protocol: true, reminders: false });

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ userId, email, exportedAt: new Date().toISOString() }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "taiuo-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const deleteAccount = async () => {
    if (!window.confirm("Delete your account and all data? This can't be undone.")) return;
    try {
      await getSupabase().from("profiles").delete().eq("id", userId);
    } catch {
      // best-effort
    }
    await signOut();
  };

  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <h2 className="text-2xl font-semibold text-ink">Settings</h2>

      <section className="app-card p-6">
        <h3 className="text-sm font-semibold text-ink">Appearance</h3>
        <p className="mt-1 text-[13px] text-body">Choose how the app looks. The marketing site stays light.</p>
        <div className="mt-4">
          <ThemeSegmented />
        </div>
      </section>

      <section className="app-card p-6">
        <h3 className="text-sm font-semibold text-ink">Account</h3>
        <div className="mt-2 divide-y divide-line">
          <Row title="Email" desc={email ?? undefined}>
            <span className="text-[13px] text-faint">Verified</span>
          </Row>
          <Row title="Membership" desc="Taiuo yearly plan">
            <span className="rounded-full bg-sage-base/15 px-2.5 py-1 text-[12px] font-semibold text-[color:var(--sage-accent)]">
              Active
            </span>
          </Row>
          <Row title="Sign out" desc="End your session on this device">
            <button onClick={() => void signOut()} className="btn btn-glass !bg-surface-2 gap-2 text-sm">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </Row>
        </div>
      </section>

      <section className="app-card p-6">
        <h3 className="text-sm font-semibold text-ink">Notifications</h3>
        <div className="mt-2 divide-y divide-line">
          <Row title="Analysis ready" desc="When a new scan finishes processing">
            <Switch on={notif.scan} onChange={(v) => setNotif((n) => ({ ...n, scan: v }))} label="Analysis ready" />
          </Row>
          <Row title="Protocol updates" desc="New recommendations for your plan">
            <Switch on={notif.protocol} onChange={(v) => setNotif((n) => ({ ...n, protocol: v }))} label="Protocol updates" />
          </Row>
          <Row title="Habit reminders" desc="Gentle nudges to keep your streak">
            <Switch on={notif.reminders} onChange={(v) => setNotif((n) => ({ ...n, reminders: v }))} label="Habit reminders" />
          </Row>
        </div>
      </section>

      <section className="app-card p-6">
        <h3 className="text-sm font-semibold text-ink">Privacy &amp; data</h3>
        <div className="mt-2 divide-y divide-line">
          <Row title="Export my data" desc="Download a copy of your account data">
            <button onClick={exportData} className="btn btn-glass !bg-surface-2 gap-2 text-sm">
              <Download className="h-4 w-4" /> Export
            </button>
          </Row>
          <Row title="Delete account" desc="Permanently remove your data">
            <button
              onClick={() => void deleteAccount()}
              className="inline-flex items-center gap-2 rounded-full border border-[#e5484d]/30 px-4 py-2 text-sm font-medium text-[color:var(--danger-text)] transition-colors hover:bg-[#e5484d]/10"
            >
              <Trash2 className="h-4 w-4" /> Delete
            </button>
          </Row>
        </div>
      </section>
    </div>
  );
}
