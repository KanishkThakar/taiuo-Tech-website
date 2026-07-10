"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { AnimatedLogo } from "@/components/visuals/Logo";

interface UserCtxValue {
  userId: string;
  email: string | null;
  signOut: () => Promise<void>;
}

const UserCtx = createContext<UserCtxValue | null>(null);

export function useUser(): UserCtxValue {
  const ctx = useContext(UserCtx);
  if (!ctx) throw new Error("useUser must be used within <AppSession>");
  return ctx;
}

type Status = "loading" | "authed" | "anon";

/** Full-height loader shown while the session resolves. */
function AppLoading() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-canvas">
      <div className="flex flex-col items-center gap-4">
        <AnimatedLogo className="h-12 w-12" />
        <span className="text-sm text-body">Preparing your space…</span>
      </div>
    </div>
  );
}

function BackendNotConnected() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-canvas px-6">
      <div className="app-card max-w-md p-8 text-center">
        <h1 className="text-xl font-medium text-ink">Backend not connected</h1>
        <p className="mt-3 text-[15px] text-body">
          Set <code className="rounded bg-surface-2 px-1.5 py-0.5 text-[13px]">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
          and <code className="rounded bg-surface-2 px-1.5 py-0.5 text-[13px]">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>,
          then reload.
        </p>
        <Link href="/" className="btn btn-dark mt-6">
          Back to home
        </Link>
      </div>
    </div>
  );
}

/** Gates the app: redirects unauthenticated users to /login; provides user. */
export function AppSession({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [configured] = useState(() => isSupabaseConfigured());
  const [status, setStatus] = useState<Status>(configured ? "loading" : "anon");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!configured) return;
    const supabase = getSupabase();
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      const s = data.session;
      if (s) {
        setUserId(s.user.id);
        setEmail(s.user.email ?? null);
        setStatus("authed");
      } else {
        setStatus("anon");
        router.replace("/login");
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!active) return;
      if (session) {
        setUserId(session.user.id);
        setEmail(session.user.email ?? null);
        setStatus("authed");
      } else {
        router.replace("/login");
      }
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [configured, router]);

  const signOut = useCallback(async () => {
    if (configured) await getSupabase().auth.signOut();
    router.replace("/");
  }, [configured, router]);

  if (!configured) return <BackendNotConnected />;
  if (status !== "authed") return <AppLoading />;

  return <UserCtx.Provider value={{ userId, email, signOut }}>{children}</UserCtx.Provider>;
}
