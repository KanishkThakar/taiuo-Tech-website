/** Domain models for the Taiuo product app. */

export interface Profile {
  id: string;
  full_name: string | null;
  display_name: string | null;
  avatar_url: string | null;
  birth_year: number | null;
  gender: string | null;
  goals: string[] | null;
  plan: string | null;
  role: string | null;
}

export type MetricStatus = "excellent" | "good" | "fair" | "attention";

export interface ScanMetric {
  key: string;
  label: string;
  score: number; // 0–100
  status: MetricStatus;
  note: string;
}

export interface FaceScan {
  id: string;
  created_at: string;
  overall_score: number; // 0–100
  confidence: number; // 0–100
  metrics: ScanMetric[];
  image_path: string | null;
  /** true when produced by the on-device demo (no ML backend yet) */
  simulated: boolean;
}

export interface HealthScore {
  overall: number; // 0–100
  delta: number; // vs previous scan
  confidence: number;
  potential: number; // achievable with the protocol
}

export interface WeeklyPoint {
  label: string; // e.g. "Mon"
  value: number; // 0–100
}

export interface Insight {
  id: string;
  title: string;
  body: string;
  tone: "positive" | "neutral" | "focus";
}

export interface Recommendation {
  id: string;
  title: string;
  detail: string;
  category: "skincare" | "lifestyle" | "treatment";
  impact: "high" | "medium" | "low";
}

export interface Habit {
  id: string;
  name: string;
  icon: string;
  cadence: string; // e.g. "Daily"
  streak: number;
  done_today: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  detail: string;
  icon: string;
  unlocked: boolean;
}

export type NotificationType = "scan" | "protocol" | "reminder" | "system";

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  created_at: string;
}

/* ---- Admin ---- */

export interface AdminUserRow {
  id: string;
  name: string;
  email: string;
  plan: "free" | "pro" | "yearly";
  scans: number;
  lastActive: string; // ISO
  status: "active" | "invited" | "churned";
}

export interface AdminActivity {
  id: string;
  user: string;
  action: string;
  at: string; // ISO
}

export interface AdminOverview {
  totalUsers: number;
  activeUsers: number;
  totalScans: number;
  avgScore: number;
  scansThisWeek: number;
  revenueMrr: number;
  signups: WeeklyPoint[]; // last 7 days
  planSplit: { plan: string; count: number }[];
  users: AdminUserRow[];
  activity: AdminActivity[];
  usingMock: boolean;
}

export interface DashboardData {
  profile: Profile | null;
  latestScan: FaceScan | null;
  scans: FaceScan[];
  health: HealthScore;
  weekly: WeeklyPoint[];
  insights: Insight[];
  recommendations: Recommendation[];
  habits: Habit[];
  achievements: Achievement[];
  /** true when any part is demo data (no backend rows yet) */
  usingMock: boolean;
}
