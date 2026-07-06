"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { loadDashboard } from "@/lib/product/data";
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
