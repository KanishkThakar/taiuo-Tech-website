"use client";

import { useState, type ReactElement } from "react";
import type { Provider } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase";

/** Google "G" mark, official four-colour, inlined (CSP blocks remote images). */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.82-.07-1.6-.2-2.36H12v4.46h6.47a5.53 5.53 0 0 1-2.4 3.63v3.02h3.88c2.27-2.09 3.57-5.17 3.57-8.75Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3.01c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.11A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.28a7.2 7.2 0 0 1 0-4.56V6.61H1.28a12 12 0 0 0 0 10.78l3.99-3.11Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44A11.98 11.98 0 0 0 12 0 12 12 0 0 0 1.28 6.61l3.99 3.11C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

/** Apple mark, inlined; uses currentColor so it reads on any button surface. */
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="currentColor" aria-hidden="true">
      <path d="M17.05 12.78c.02 2.35 2.06 3.13 2.08 3.14-.02.06-.33 1.13-1.08 2.23-.65.96-1.32 1.9-2.38 1.92-1.04.02-1.38-.62-2.57-.62-1.19 0-1.56.6-2.55.64-1.02.04-1.8-1.04-2.46-2-1.34-1.94-2.37-5.48-.99-7.88a3.83 3.83 0 0 1 3.23-1.97c1 .02 1.95.68 2.57.68.61 0 1.76-.84 2.97-.72.51.02 1.93.2 2.85 1.55-.07.05-1.7 1-1.68 2.98M15.1 5.38c.55-.67.92-1.6.82-2.53-.79.03-1.75.53-2.32 1.19-.51.59-.96 1.53-.84 2.44.88.07 1.79-.44 2.34-1.1" />
    </svg>
  );
}

const PROVIDER_META: Record<"google" | "apple", { label: string; Icon: () => ReactElement }> = {
  google: { label: "Continue with Google", Icon: GoogleIcon },
  apple: { label: "Continue with Apple", Icon: AppleIcon },
};

/**
 * Google + Apple sign-in. Uses Supabase OAuth (PKCE): the browser is redirected
 * to the provider and returns to /auth/callback. Works the moment the provider
 * is enabled in the Supabase dashboard; until then it surfaces a clear message.
 */
export function OAuthButtons({ onError }: { onError: (message: string) => void }) {
  const [pending, setPending] = useState<Provider | null>(null);

  const signIn = async (provider: "google" | "apple") => {
    onError("");
    setPending(provider);
    try {
      const { error } = await getSupabase().auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
      // On success the browser has already navigated away; reaching here means it failed.
      if (error) {
        onError(
          /provider is not enabled/i.test(error.message)
            ? `${PROVIDER_META[provider].label.replace("Continue with ", "")} sign-in isn't enabled yet.`
            : error.message,
        );
        setPending(null);
      }
    } catch {
      onError("Couldn't reach the sign-in provider. Please try again.");
      setPending(null);
    }
  };

  return (
    <div className="grid gap-2.5">
      {(["google", "apple"] as const).map((provider) => {
        const { label, Icon } = PROVIDER_META[provider];
        return (
          <button
            key={provider}
            type="button"
            onClick={() => void signIn(provider)}
            disabled={pending !== null}
            className="inline-flex h-[50px] w-full items-center justify-center gap-2.5 rounded-xl border border-line bg-white text-[15px] font-medium text-ink transition-colors hover:bg-cream disabled:opacity-50"
          >
            {pending === provider ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-line border-t-ink" />
            ) : (
              <Icon />
            )}
            {label}
          </button>
        );
      })}
    </div>
  );
}

/** "or" divider between social and email auth. */
export function AuthDivider() {
  return (
    <div className="my-5 flex items-center gap-3" aria-hidden="true">
      <span className="h-px flex-1 bg-line" />
      <span className="text-xs font-medium uppercase tracking-wider text-faint">or</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
