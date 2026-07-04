"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Field, ProductShell, SupabaseGate, btnPrimary, inputCls } from "@/components/product/shell";
import { getSupabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setBusy(true);
    try {
      const supabase = getSupabase();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (signUpError) {
        setError(signUpError.message);
        return;
      }
      if (data.session) {
        // signed in immediately (email confirmation disabled) → onboarding
        await supabase.from("profiles").upsert({ id: data.session.user.id, full_name: fullName });
        router.replace("/onboarding");
      } else {
        // email confirmation is enabled on the Supabase project
        setNotice(
          "Almost there — check your inbox and confirm your email, then log in to continue.",
        );
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <ProductShell>
      <SupabaseGate>
        <h1 className="text-2xl font-medium">Create your account</h1>
        <p className="mt-1.5 text-[15px] text-body">
          Start your personalized facial analysis in minutes.
        </p>

        <form onSubmit={onSubmit} className="mt-7 grid gap-4">
          <Field label="Full name">
            <input
              type="text"
              required
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={inputCls}
              placeholder="Your name"
            />
          </Field>
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
          <Field label="Password">
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

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}
          {notice && (
            <p role="status" className="rounded-xl bg-sage-base/15 px-4 py-3 text-sm text-ink">
              {notice}
            </p>
          )}

          <button type="submit" disabled={busy} className={btnPrimary}>
            {busy ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-body">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-ink underline underline-offset-[3px]">
            Log in
          </Link>
        </p>
      </SupabaseGate>
    </ProductShell>
  );
}
