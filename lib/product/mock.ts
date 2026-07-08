import type {
  Achievement,
  AdminActivity,
  AdminOverview,
  AdminUserRow,
  AppNotification,
  DashboardData,
  FaceScan,
  Habit,
  HealthScore,
  Insight,
  MetricStatus,
  Profile,
  Recommendation,
  ScanMetric,
  WeeklyPoint,
} from "@/lib/product/types";

/** Small deterministic PRNG so demo data is stable per user (no hydration drift). */
function makeRng(seedStr: string) {
  let h = 2166136261;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  let state = h >>> 0;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return ((state >>> 0) % 100000) / 100000;
  };
}

function statusFor(score: number): MetricStatus {
  if (score >= 85) return "excellent";
  if (score >= 70) return "good";
  if (score >= 55) return "fair";
  return "attention";
}

const METRIC_DEFS: { key: string; label: string; note: string }[] = [
  { key: "skin", label: "Skin quality", note: "Even tone with healthy clarity." },
  { key: "hydration", label: "Hydration", note: "Well-hydrated; maintain your routine." },
  { key: "pigmentation", label: "Pigmentation", note: "Minor uneven areas around the cheeks." },
  { key: "texture", label: "Texture", note: "Smooth overall with fine pores." },
  { key: "wrinkles", label: "Fine lines", note: "Early expression lines near the eyes." },
  { key: "eyes", label: "Eye area", note: "Slight puffiness; prioritise sleep." },
  { key: "symmetry", label: "Symmetry", note: "Balanced proportions across the midline." },
  { key: "jaw", label: "Jaw definition", note: "Good structure; posture work can help." },
];

/** A fixed baseline offset per date so the timeline trends upward over time. */
function buildScan(rng: () => number, id: string, createdAt: string, base: number): FaceScan {
  const metrics: ScanMetric[] = METRIC_DEFS.map((d) => {
    const score = Math.max(38, Math.min(96, Math.round(base + (rng() - 0.5) * 26)));
    return { ...d, score, status: statusFor(score) };
  });
  const overall = Math.round(metrics.reduce((s, m) => s + m.score, 0) / metrics.length);
  return {
    id,
    created_at: createdAt,
    overall_score: overall,
    confidence: 90 + Math.round(rng() * 8),
    metrics,
    image_path: null,
    simulated: true,
  };
}

/** ISO date `n` days before the fixed reference (kept static → deterministic SSG). */
function daysAgoISO(n: number): string {
  const ref = Date.parse("2026-07-06T09:00:00Z");
  return new Date(ref - n * 86400000).toISOString();
}

export function mockScans(seed: string): FaceScan[] {
  const rng = makeRng(seed + ":scans");
  // oldest → newest, gently improving baseline
  const plan = [
    { d: 84, base: 63 },
    { d: 56, base: 68 },
    { d: 28, base: 73 },
    { d: 2, base: 78 },
  ];
  return plan
    .map((p, i) => buildScan(rng, `mock-scan-${i}`, daysAgoISO(p.d), p.base))
    .reverse(); // newest first
}

export function mockWeekly(seed: string): WeeklyPoint[] {
  const rng = makeRng(seed + ":weekly");
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let v = 72;
  return labels.map((label) => {
    v = Math.max(60, Math.min(90, v + Math.round((rng() - 0.4) * 6)));
    return { label, value: v };
  });
}

export function mockHealth(scans: FaceScan[]): HealthScore {
  const latest = scans[0];
  const prev = scans[1];
  const overall = latest?.overall_score ?? 78;
  return {
    overall,
    delta: latest && prev ? latest.overall_score - prev.overall_score : 4,
    confidence: latest?.confidence ?? 94,
    potential: Math.min(98, overall + 11),
  };
}

export const MOCK_INSIGHTS: Insight[] = [
  {
    id: "i1",
    title: "Hydration is trending up",
    body: "Your hydration score rose 6 points this month — keep the morning routine going.",
    tone: "positive",
  },
  {
    id: "i2",
    title: "Focus area: under-eye",
    body: "Consistent sleep and a caffeine eye serum could lift your eye-area score.",
    tone: "focus",
  },
  {
    id: "i3",
    title: "Symmetry looks balanced",
    body: "Facial proportions are well within a natural, harmonious range.",
    tone: "neutral",
  },
];

export const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    id: "r1",
    title: "Add a vitamin-C serum (AM)",
    detail: "Brightens tone and supports collagen — apply before sunscreen.",
    category: "skincare",
    impact: "high",
  },
  {
    id: "r2",
    title: "Sleep 7–8h consistently",
    detail: "The single biggest lever for your under-eye and skin scores.",
    category: "lifestyle",
    impact: "high",
  },
  {
    id: "r3",
    title: "Daily SPF 30+",
    detail: "Prevents pigmentation and preserves texture gains.",
    category: "skincare",
    impact: "medium",
  },
  {
    id: "r4",
    title: "Mewing & posture drills",
    detail: "Non-surgical support for jaw definition over time.",
    category: "lifestyle",
    impact: "low",
  },
];

export const MOCK_HABITS: Habit[] = [
  { id: "h1", name: "Morning skincare", icon: "sun", cadence: "Daily", streak: 12, done_today: true },
  { id: "h2", name: "SPF application", icon: "shield", cadence: "Daily", streak: 9, done_today: true },
  { id: "h3", name: "8 glasses of water", icon: "droplet", cadence: "Daily", streak: 5, done_today: false },
  { id: "h4", name: "Evening routine", icon: "moon", cadence: "Daily", streak: 18, done_today: false },
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: "a1", title: "First scan", detail: "Completed your baseline analysis", icon: "scan", unlocked: true },
  { id: "a2", title: "7-day streak", detail: "A week of consistent routine", icon: "flame", unlocked: true },
  { id: "a3", title: "+5 glow-up", detail: "Raised your score by 5 points", icon: "trending", unlocked: true },
  { id: "a4", title: "Hydration hero", detail: "Hit 85+ hydration", icon: "droplet", unlocked: false },
  { id: "a5", title: "30-day streak", detail: "A full month of consistency", icon: "trophy", unlocked: false },
  { id: "a6", title: "Protocol master", detail: "Complete every protocol step", icon: "star", unlocked: false },
];

export function mockNotifications(): AppNotification[] {
  return [
    {
      id: "n1",
      type: "scan",
      title: "Your analysis is ready",
      body: "Your latest face scan has been processed — view your results.",
      read: false,
      created_at: daysAgoISO(1),
    },
    {
      id: "n2",
      type: "protocol",
      title: "New recommendation added",
      body: "We added a vitamin-C serum to your morning protocol.",
      read: false,
      created_at: daysAgoISO(3),
    },
    {
      id: "n3",
      type: "reminder",
      title: "Evening routine",
      body: "Don't forget your evening skincare to keep your streak alive.",
      read: true,
      created_at: daysAgoISO(4),
    },
  ];
}

export function mockDashboard(uid: string, profile: Profile | null): DashboardData {
  const scans = mockScans(uid);
  return {
    profile,
    latestScan: scans[0] ?? null,
    scans,
    health: mockHealth(scans),
    weekly: mockWeekly(uid),
    insights: MOCK_INSIGHTS,
    recommendations: MOCK_RECOMMENDATIONS,
    habits: MOCK_HABITS,
    achievements: MOCK_ACHIEVEMENTS,
    usingMock: true,
  };
}

/** Produce a believable simulated scan result for the on-device face scan. */
export function simulateScanResult(seed: string): FaceScan {
  const rng = makeRng(seed);
  return buildScan(rng, `scan-${seed}`, daysAgoISO(0), 74 + Math.round(rng() * 8));
}

/* ---- Admin ---- */

const ADMIN_NAMES = [
  "Ava Chen", "Liam Okafor", "Sofia Rossi", "Noah Patel", "Mia Nguyen",
  "Ethan Brooks", "Isabella Costa", "Lucas Meyer", "Amara Diallo", "Yuki Tanaka",
  "Oliver Grant", "Chloe Dubois", "Marcus Webb", "Priya Rao", "Elena Petrova",
];
const ADMIN_ACTIONS = [
  "completed a face scan",
  "upgraded to Pro",
  "updated their protocol",
  "signed up",
  "hit a 30-day streak",
  "exported their data",
];

export function mockAdminOverview(): AdminOverview {
  const rng = makeRng("taiuo:admin");
  const plans: AdminUserRow["plan"][] = ["free", "pro", "yearly"];
  const statuses: AdminUserRow["status"][] = ["active", "active", "active", "invited", "churned"];

  const users: AdminUserRow[] = ADMIN_NAMES.map((name, i) => {
    const plan = plans[Math.floor(rng() * plans.length)] ?? "free";
    const status = statuses[Math.floor(rng() * statuses.length)] ?? "active";
    const handle = name.toLowerCase().replace(/[^a-z]+/g, ".");
    return {
      id: `u${i + 1}`,
      name,
      email: `${handle}@example.com`,
      plan,
      scans: Math.floor(rng() * 14),
      lastActive: daysAgoISO(Math.floor(rng() * 20)),
      status,
    };
  });

  const activity: AdminActivity[] = Array.from({ length: 8 }, (_, i) => {
    const who = ADMIN_NAMES[Math.floor(rng() * ADMIN_NAMES.length)] ?? "A member";
    const what = ADMIN_ACTIONS[Math.floor(rng() * ADMIN_ACTIONS.length)] ?? "was active";
    return { id: `act${i}`, user: who, action: what, at: daysAgoISO(0) };
  });

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const signups: WeeklyPoint[] = labels.map((label) => ({
    label,
    value: 20 + Math.round(rng() * 60),
  }));

  return {
    totalUsers: 2847,
    activeUsers: 1932,
    totalScans: 11408,
    avgScore: 76,
    scansThisWeek: signups.reduce((s, p) => s + p.value, 0),
    revenueMrr: 18640,
    signups,
    planSplit: [
      { plan: "Free", count: users.filter((u) => u.plan === "free").length },
      { plan: "Pro", count: users.filter((u) => u.plan === "pro").length },
      { plan: "Yearly", count: users.filter((u) => u.plan === "yearly").length },
    ],
    users,
    activity,
    usingMock: true,
  };
}
