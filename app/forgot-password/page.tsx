"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { MailCheck } from "lucide-react";
import { Field, ProductShell, SupabaseGate, btnPrimary, inputCls } from "@/components/product/shell";
import { getSupabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const { error: resetError } = await getSupabase().auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });
      if (resetError) {
        setError(resetError.message);
        return;
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <ProductShell>
      <SupabaseGate>
        {sent ? (
          <div className="text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-sage-base/20 text-[#4E5F5F]">
              <MailCheck className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <h1 className="mt-4 text-2xl font-medium">Check your inbox</h1>
            <p className="mt-2 text-[15px] text-body">
              If an account exists for <span className="font-medium text-ink">{email}</span>, a
              password-reset link is on its way. It expires in an hour.
            </p>
            <Link href="/login" className="btn btn-dark mt-6">
              Back to log in
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-medium">Reset your password</h1>
            <p className="mt-1.5 text-[15px] text-body">
              Enter your email and we&apos;ll send you a link to set a new one.
            </p>
            <form onSubmit={onSubmit} className="mt-7 grid gap-4">
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
              {error && (
                <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}
              <button type="submit" disabled={busy} className={btnPrimary}>
                {busy ? "Sending…" : "Send reset link"}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-body">
              Remembered it?{" "}
              <Link href="/login" className="font-medium text-ink underline underline-offset-[3px]">
                Log in
              </Link>
            </p>
          </>
        )}
      </SupabaseGate>
    </ProductShell>
  );
}
