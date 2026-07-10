"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";
import { AnimatedLogo } from "@/components/visuals/Logo";

/** Reads an OAuth/verification error out of the return URL (or config state). */
function initialError(): string | null {
  if (!isSupabaseConfigured()) return "Backend not connected.";
  if (typeof window === "undefined") return null;
  const q = new URL(window.location.href).searchParams;
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  return q.get("error_description") ?? hash.get("error_description") ?? null;
}

/**
 * Completion page for every redirect-based auth flow (Google/Apple OAuth,
 * email confirmation, password recovery). The browser client exchanges the
 * `?code=` automatically via `detectSessionInUrl`; here we just wait for the
 * resulting session and route the user onward.
 */
export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(initialError);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = getSupabase();
    let settled = false;

    const onward = (recovery: boolean) => {
      if (settled) return;
      settled = true;
      router.replace(recovery ? "/reset-password" : "/dashboard");
    };

    // A recovery link fires PASSWORD_RECOVERY; any other completed flow yields a session.
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY") onward(true);
      else if (session) onward(false);
    });

    // Cover the case where the session is already present before the listener attaches.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) onward(false);
    });

    const timeout = setTimeout(() => {
      if (!settled) setError("Sign-in is taking longer than expected. Please try again.");
    }, 8000);

    return () => {
      sub.subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="flex min-h-svh items-center justify-center bg-cream px-6">
      {error ? (
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-max">
          <h1 className="text-xl font-medium text-ink">We couldn&apos;t finish signing you in</h1>
          <p className="mt-3 text-[15px] text-body">{error}</p>
          <Link href="/login" className="btn btn-dark mt-6">
            Back to log in
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <AnimatedLogo className="h-12 w-12" />
          <span className="text-sm text-body">Completing sign-in…</span>
        </div>
      )}
    </div>
  );
}
