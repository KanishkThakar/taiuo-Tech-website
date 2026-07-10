"use client";

import Link from "next/link";
import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Field, ProductShell, SupabaseGate, btnPrimary, inputCls } from "@/components/product/shell";
import { getSupabase } from "@/lib/supabase";

type Gate = "checking" | "ready" | "invalid";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [gate, setGate] = useState<Gate>("checking");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // A valid recovery link signs the user in with a temporary session; without
  // one there is nothing to update, so we show a "request a new link" message.
  useEffect(() => {
    const supabase = getSupabase();
    let active = true;
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (!active) return;
      if (event === "PASSWORD_RECOVERY" || session) setGate("ready");
    });
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setGate((g) => (g === "ready" ? g : data.session ? "ready" : "invalid"));
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    setBusy(true);
    try {
      const { error: updateError } = await getSupabase().auth.updateUser({ password });
      if (updateError) {
        setError(updateError.message);
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
        {gate === "invalid" ? (
          <div className="text-center">
            <h1 className="text-2xl font-medium">This link has expired</h1>
            <p className="mt-2 text-[15px] text-body">
              Password-reset links are single-use and expire after an hour. Request a fresh one.
            </p>
            <Link href="/forgot-password" className="btn btn-dark mt-6">
              Send a new link
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-medium">Set a new password</h1>
            <p className="mt-1.5 text-[15px] text-body">Choose something you haven&apos;t used before.</p>
            <form onSubmit={onSubmit} className="mt-7 grid gap-4">
              <Field label="New password">
                <input
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputCls}
                  placeholder="At least 6 characters"
                />
              </Field>
              <Field label="Confirm password">
                <input
                  type="password"
                  required
                  minLength={6}
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={inputCls}
                  placeholder="Re-enter your password"
                />
              </Field>
              {error && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}
              <button type="submit" disabled={busy || gate === "checking"} className={btnPrimary}>
                {busy ? "Saving…" : "Update password"}
              </button>
            </form>
          </>
        )}
      </SupabaseGate>
    </ProductShell>
  );
}
