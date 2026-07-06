"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import {
  Field,
  ProductShell,
  SupabaseGate,
  btnPrimary,
  inputCls,
} from "@/components/product/shell";
import { AuthDivider, OAuthButtons } from "@/components/product/oauth";
import { getSupabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const supabase = getSupabase();
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
        return;
      }
      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <ProductShell>
      <SupabaseGate>
        <h1 className="text-2xl font-medium">Welcome back</h1>
        <p className="mt-1.5 text-[15px] text-body">Log in to view your plan and analysis.</p>

        <div className="mt-7">
          <OAuthButtons onError={(m) => setError(m || null)} />
        </div>
        <AuthDivider />

        <form onSubmit={onSubmit} className="grid gap-4">
          <Field label="Email">
            <input
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
              placeholder="you@example.com"
            />
          </Field>
          <label className="block">
            <span className="mb-1.5 flex items-center justify-between">
              <span className="text-sm font-medium">Password</span>
              <Link
                href="/forgot-password"
                className="text-[13px] font-medium text-body underline-offset-[3px] hover:text-ink hover:underline"
              >
                Forgot password?
              </Link>
            </span>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputCls}
              placeholder="••••••••"
            />
          </label>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button type="submit" disabled={busy} className={btnPrimary}>
            {busy ? "Logging in…" : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-body">
          New to Taiuo?{" "}
          <Link href="/signup" className="font-medium text-ink underline underline-offset-[3px]">
            Create your account
          </Link>
        </p>
      </SupabaseGate>
    </ProductShell>
  );
}
