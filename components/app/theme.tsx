"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Monitor, Moon, Sun } from "lucide-react";

export type ThemeChoice = "light" | "dark" | "system";
type Resolved = "light" | "dark";

const STORAGE_KEY = "taiuo-theme";

interface ThemeCtxValue {
  choice: ThemeChoice;
  resolved: Resolved;
  setChoice: (c: ThemeChoice) => void;
}

const ThemeCtx = createContext<ThemeCtxValue | null>(null);

function systemPrefersDark(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function readStoredChoice(): ThemeChoice {
  if (typeof window === "undefined") return "system";
  const s = localStorage.getItem(STORAGE_KEY);
  return s === "light" || s === "dark" || s === "system" ? s : "system";
}

/**
 * App-only theme. Wraps the authenticated shell; the marketing site never
 * renders this provider, so it stays in its signature light sage design.
 * Dark tokens are re-mapped under `.app-theme[data-theme="dark"]` in globals.
 *
 * Lazy initializers read the stored/system preference at mount, and only the
 * system-change listener calls setState (in its callback) — so there is no
 * synchronous setState in an effect body.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [choice, setChoiceState] = useState<ThemeChoice>(readStoredChoice);
  const [systemDark, setSystemDark] = useState<boolean>(systemPrefersDark);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemDark(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resolved: Resolved = choice === "system" ? (systemDark ? "dark" : "light") : choice;

  const setChoice = useCallback((c: ThemeChoice) => {
    localStorage.setItem(STORAGE_KEY, c);
    setChoiceState(c);
  }, []);

  return <ThemeCtx.Provider value={{ choice, resolved, setChoice }}>{children}</ThemeCtx.Provider>;
}

export function useTheme(): ThemeCtxValue {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}

/** Quick sun/moon toggle for the topbar. */
export function ThemeToggle() {
  const { resolved, setChoice } = useTheme();
  return (
    <button
      type="button"
      className="icon-btn"
      aria-label={`Switch to ${resolved === "dark" ? "light" : "dark"} theme`}
      onClick={() => setChoice(resolved === "dark" ? "light" : "dark")}
    >
      {resolved === "dark" ? (
        <Sun className="h-[18px] w-[18px]" strokeWidth={1.75} />
      ) : (
        <Moon className="h-[18px] w-[18px]" strokeWidth={1.75} />
      )}
    </button>
  );
}

/** Three-way segmented control for settings. */
export function ThemeSegmented() {
  const { choice, setChoice } = useTheme();
  const opts: { value: ThemeChoice; label: string; Icon: typeof Sun }[] = [
    { value: "light", label: "Light", Icon: Sun },
    { value: "dark", label: "Dark", Icon: Moon },
    { value: "system", label: "System", Icon: Monitor },
  ];
  return (
    <div className="inline-flex rounded-xl border border-line bg-surface-2 p-1">
      {opts.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          onClick={() => setChoice(value)}
          className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            choice === value ? "bg-surface text-ink shadow-card" : "text-body hover:text-ink"
          }`}
          aria-pressed={choice === value}
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} />
          {label}
        </button>
      ))}
    </div>
  );
}
