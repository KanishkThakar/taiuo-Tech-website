import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  AdminOverview,
  AppNotification,
  DashboardData,
  FaceScan,
  Habit,
  Profile,
} from "@/lib/product/types";
import {
  MOCK_ACHIEVEMENTS,
  MOCK_HABITS,
  MOCK_INSIGHTS,
  MOCK_RECOMMENDATIONS,
  mockAdminOverview,
  mockDashboard,
  mockHealth,
  mockNotifications,
  mockWeekly,
} from "@/lib/product/mock";

/**
 * Product data services. Each tries Supabase and gracefully falls back to
 * deterministic demo data when a table/column is absent (schema not yet run)
 * or empty — so every screen works immediately, and lights up with real data
 * once `supabase/schema.sql` is applied and rows exist.
 */

export async function loadProfile(
  supabase: SupabaseClient,
  uid: string,
): Promise<Profile | null> {
  try {
    const { data } = await supabase.from("profiles").select("*").eq("id", uid).maybeSingle();
    if (!data) return null;
    const row = data as Record<string, unknown>;
    return {
      id: uid,
      full_name: (row.full_name as string) ?? null,
      display_name: (row.display_name as string) ?? null,
      avatar_url: (row.avatar_url as string) ?? null,
      birth_year: (row.birth_year as number) ?? null,
      gender: (row.gender as string) ?? null,
      goals: (row.goals as string[]) ?? null,
      plan: (row.plan as string) ?? null,
      role: (row.role as string) ?? null,
    };
  } catch {
    return null;
  }
}

async function loadRealScans(supabase: SupabaseClient, uid: string): Promise<FaceScan[] | null> {
  try {
    const { data, error } = await supabase
      .from("face_scans")
      .select("id, created_at, overall_score, confidence, metrics, image_path")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return null;
    return data.map((r) => ({
      id: String(r.id),
      created_at: r.created_at as string,
      overall_score: Number(r.overall_score ?? 0),
      confidence: Number(r.confidence ?? 92),
      metrics: Array.isArray(r.metrics) ? r.metrics : [],
      image_path: (r.image_path as string) ?? null,
      simulated: true,
    }));
  } catch {
    return null;
  }
}

export async function loadDashboard(
  supabase: SupabaseClient,
  uid: string,
): Promise<DashboardData> {
  const profile = await loadProfile(supabase, uid);
  const real = await loadRealScans(supabase, uid);
  if (!real) return mockDashboard(uid, profile);
  return {
    profile,
    latestScan: real[0] ?? null,
    scans: real,
    health: mockHealth(real),
    weekly: mockWeekly(uid),
    insights: MOCK_INSIGHTS,
    recommendations: MOCK_RECOMMENDATIONS,
    habits: MOCK_HABITS,
    achievements: MOCK_ACHIEVEMENTS,
    usingMock: false,
  };
}

export async function saveScan(
  supabase: SupabaseClient,
  uid: string,
  scan: FaceScan,
): Promise<boolean> {
  try {
    const { error } = await supabase.from("face_scans").insert({
      user_id: uid,
      overall_score: scan.overall_score,
      confidence: scan.confidence,
      metrics: scan.metrics,
      image_path: scan.image_path,
    });
    return !error;
  } catch {
    return false;
  }
}

export async function loadNotifications(
  supabase: SupabaseClient,
  uid: string,
): Promise<AppNotification[]> {
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select("id, type, title, body, read, created_at")
      .eq("user_id", uid)
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return mockNotifications();
    return data as AppNotification[];
  } catch {
    return mockNotifications();
  }
}

/**
 * Aggregated admin overview. Real counts are pulled where the schema allows
 * (head-count queries), and the richer breakdowns fall back to demo data so the
 * admin surface renders before any analytics backend exists.
 */
export async function loadAdminOverview(supabase: SupabaseClient): Promise<AdminOverview> {
  const mock = mockAdminOverview();
  try {
    const [{ count: users }, { count: scans }] = await Promise.all([
      supabase.from("profiles").select("id", { count: "exact", head: true }),
      supabase.from("face_scans").select("id", { count: "exact", head: true }),
    ]);
    if (users == null && scans == null) return mock;
    return {
      ...mock,
      totalUsers: users ?? mock.totalUsers,
      totalScans: scans ?? mock.totalScans,
      usingMock: false,
    };
  } catch {
    return mock;
  }
}

export async function loadHabits(supabase: SupabaseClient, uid: string): Promise<Habit[]> {
  try {
    const { data, error } = await supabase
      .from("habits")
      .select("id, name, icon, cadence, streak, done_today")
      .eq("user_id", uid);
    if (error || !data || data.length === 0) return MOCK_HABITS;
    return data as Habit[];
  } catch {
    return MOCK_HABITS;
  }
}
