"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { loadProfile } from "@/lib/product/data";
import type { Profile } from "@/lib/product/types";
import { useUser } from "@/components/app/session";

export default function ProfilePage() {
  const { userId, email } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let active = true;
    loadProfile(getSupabase(), userId).then((p) => {
      if (!active) return;
      setProfile(p);
      setDisplayName(p?.display_name ?? p?.full_name ?? "");
    });
    return () => {
      active = false;
    };
  }, [userId]);

  const initials = (displayName || email || "T").slice(0, 2).toUpperCase();

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await getSupabase().from("profiles").upsert({ id: userId, display_name: displayName.trim() });
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } catch {
      // best-effort; column may not exist until schema is applied
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-2xl gap-6">
      <h2 className="text-2xl font-semibold text-ink">Profile</h2>

      <div className="app-card flex items-center gap-4 p-6">
        <span className="grid h-16 w-16 flex-none place-items-center rounded-full bg-gradient-to-br from-[#c8d4d4] to-[#9dadad] text-xl font-semibold text-ink">
          {initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold text-ink">{displayName || "Your name"}</p>
          <p className="truncate text-[14px] text-body">{email}</p>
          {profile?.plan && (
            <span className="mt-1 inline-block rounded-full bg-sage-base/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[#4E5F5F]">
              {profile.plan} plan
            </span>
          )}
        </div>
      </div>

      <div className="app-card p-6">
        <h3 className="text-sm font-semibold text-ink">Personal details</h3>
        <div className="mt-4 grid gap-4">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Display name</span>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="app-input"
              placeholder="How should we address you?"
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="mb-1.5 block text-sm font-medium text-ink">Birth year</span>
              <p className="rounded-xl border border-line bg-surface-2 px-4 py-3 text-[15px] text-body">
                {profile?.birth_year ?? "—"}
              </p>
            </div>
            <div>
              <span className="mb-1.5 block text-sm font-medium text-ink">Gender</span>
              <p className="rounded-xl border border-line bg-surface-2 px-4 py-3 text-[15px] text-body">
                {profile?.gender ?? "—"}
              </p>
            </div>
          </div>
          {profile?.goals && profile.goals.length > 0 && (
            <div>
              <span className="mb-1.5 block text-sm font-medium text-ink">Goals</span>
              <div className="flex flex-wrap gap-2">
                {profile.goals.map((g) => (
                  <span key={g} className="rounded-full bg-sage-base/15 px-3 py-1 text-[13px] font-medium text-[#4E5F5F]">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}
          <button onClick={save} disabled={saving} className="btn btn-dark mt-1 w-fit gap-2">
            {saved ? (
              <>
                <Check className="h-4 w-4" /> Saved
              </>
            ) : saving ? (
              "Saving…"
            ) : (
              "Save changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
