"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { loadDashboard, loadProfile } from "@/lib/product/data";
import type { DashboardData } from "@/lib/product/types";
import { useUser } from "@/components/app/session";

/** Loads the full dashboard bundle (Supabase → mock fallback) for the current user. */
export function useDashboard(): DashboardData | null {
  const { userId } = useUser();
  const [data, setData] = useState<DashboardData | null>(null);
  useEffect(() => {
    let active = true;
    loadDashboard(getSupabase(), userId).then((d) => active && setData(d));
    return () => {
      active = false;
    };
  }, [userId]);
  return data;
}

export type AdminAccess = "loading" | "granted" | "denied";

/**
 * Admin gate. Access is granted when the profile carries `role = 'admin'`.
 * A user with no profile row yet (fresh account / demo, no analytics backend)
 * is granted a clearly-labelled preview; an existing non-admin row is denied.
 */
export function useAdminAccess(): AdminAccess {
  const { userId } = useUser();
  const [access, setAccess] = useState<AdminAccess>("loading");
  useEffect(() => {
    let active = true;
    loadProfile(getSupabase(), userId).then((p) => {
      if (!active) return;
      setAccess(p == null || p.role === "admin" ? "granted" : "denied");
    });
    return () => {
      active = false;
    };
  }, [userId]);
  return access;
}
