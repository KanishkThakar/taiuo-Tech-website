/**
 * Deterministic in-app assistant. This is a curated, rules-based guide — NOT a
 * live language model — so it works offline, ships no user data anywhere, and
 * never invents answers. It matches a question against a small knowledge base
 * and returns a written answer plus optional quick actions.
 */

export interface AssistantAction {
  label: string;
  /** route → navigate; theme → toggle dark/light; scan → start a scan */
  kind: "route" | "theme" | "scan";
  href?: string;
}

export interface AssistantReply {
  text: string;
  actions?: AssistantAction[];
}

interface Entry {
  keywords: string[];
  reply: AssistantReply;
}

const KB: Entry[] = [
  {
    keywords: ["scan", "camera", "photo", "capture", "analyze", "analysis"],
    reply: {
      text: "A face scan uses your camera to read 160+ markers — skin, symmetry, hydration, jawline and more — then scores each. In this build the analysis is simulated until the engine is connected, and your capture stays on your device.",
      actions: [{ label: "Start a face scan", kind: "scan" }],
    },
  },
  {
    keywords: ["score", "health", "number", "rating", "mean", "overall"],
    reply: {
      text: "Your AI Health Score (0–100) is the average of every marker from your latest scan, shown with a confidence level and your achievable potential. Watch the weekly trend rather than any single number — consistency moves it.",
      actions: [{ label: "Open dashboard", kind: "route", href: "/dashboard" }],
    },
  },
  {
    keywords: ["improve", "better", "recommend", "recommendation", "protocol", "routine", "tips"],
    reply: {
      text: "Your recommendations are ranked by impact and tuned to your lowest markers first. The biggest levers are usually consistent sleep, daily SPF, and hydration — small habits compound over weeks.",
      actions: [
        { label: "See recommendations", kind: "route", href: "/dashboard" },
        { label: "Manage habits", kind: "route", href: "/goals" },
      ],
    },
  },
  {
    keywords: ["often", "frequency", "how many", "when", "schedule", "weeks"],
    reply: {
      text: "Scan every 2–4 weeks. Changes in skin and definition take time, and scanning too often just adds noise from lighting and angle differences.",
      actions: [{ label: "View history", kind: "route", href: "/history" }],
    },
  },
  {
    keywords: ["privacy", "private", "data", "secure", "delete", "gdpr", "photos"],
    reply: {
      text: "Your scans and photos are yours: stored under row-level security so only you can read them, and you can export or permanently delete everything from Settings at any time.",
      actions: [{ label: "Privacy & data", kind: "route", href: "/settings" }],
    },
  },
  {
    keywords: ["theme", "dark", "light", "mode", "appearance"],
    reply: {
      text: "The app has its own light, dark, and system themes (the marketing site stays light). Toggle it from the top bar, or pick a preference in Settings.",
      actions: [
        { label: "Toggle theme", kind: "theme" },
        { label: "Appearance settings", kind: "route", href: "/settings" },
      ],
    },
  },
  {
    keywords: ["report", "detail", "breakdown", "marker", "export"],
    reply: {
      text: "Reports give the full marker-by-marker breakdown of a scan with notes on each area. You can compare against earlier scans to see what's trending.",
      actions: [{ label: "Open reports", kind: "route", href: "/reports" }],
    },
  },
  {
    keywords: ["habit", "goal", "streak", "consistency", "reminder"],
    reply: {
      text: "Goals and habits keep the small daily actions on track — each habit tracks a streak, and staying consistent is what actually lifts your scores over time.",
      actions: [{ label: "Open goals", kind: "route", href: "/goals" }],
    },
  },
  {
    keywords: ["account", "password", "email", "sign", "login", "profile", "name"],
    reply: {
      text: "Manage your name and details in Profile, and your email, sign-out, and membership in Settings. Forgot your password? Use the reset link on the login screen.",
      actions: [
        { label: "Edit profile", kind: "route", href: "/profile" },
        { label: "Account settings", kind: "route", href: "/settings" },
      ],
    },
  },
];

const FALLBACK: AssistantReply = {
  text: "I can help with face scans, your health score, recommendations, privacy, themes, reports, habits, and your account. Try one of the suggestions below, or ask in your own words.",
};

/** Suggested starter questions shown when the conversation is empty. */
export const ASSISTANT_SUGGESTIONS = [
  "How does the face scan work?",
  "What does my health score mean?",
  "How do I improve my results?",
  "Is my data private?",
];

/** Normalise, then score each entry by how many of its keywords appear. */
export function matchAnswer(query: string): AssistantReply {
  const q = query.toLowerCase();
  let best: Entry | null = null;
  let bestScore = 0;
  for (const entry of KB) {
    const score = entry.keywords.reduce((n, k) => (q.includes(k) ? n + 1 : n), 0);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return best && bestScore > 0 ? best.reply : FALLBACK;
}
