"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { motion } from "motion/react";
import LogoMark from "@/components/visuals/LogoMark";
import { isSupabaseConfigured } from "@/lib/supabase";

/** Shared input / button styles for the product pages. */
export const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-[15px] outline-none transition-[border-color,box-shadow] focus:border-sage-mid focus:shadow-[0_0_0_3px_rgba(168,181,181,0.25)]";

export const btnPrimary = "btn btn-dark w-full disabled:pointer-events-none disabled:opacity-50";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

/**
 * Sage-gradient page shell for auth/product pages — same design language
 * as the marketing site, minimal top bar with logo + back-home link.
 */
export function ProductShell({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <div
      className="flex min-h-svh flex-col"
      style={{
        background: "linear-gradient(160deg, #A8B5B5 0%, #C8D4D4 55%, #FAFAFA 100%)",
      }}
    >
      <header className="flex h-[72px] items-center max-md:h-16">
        <div className="container-x flex w-full items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Taiuo — home">
            <LogoMark />
            <span className="text-xl font-semibold tracking-[-0.02em]">Taiuo</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 pb-16 pt-6 sm:items-center sm:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`w-full rounded-3xl bg-white p-8 shadow-max max-sm:p-6 ${
            wide ? "max-w-2xl" : "max-w-md"
          }`}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}

/** Friendly guard shown when the Supabase env vars aren't set yet. */
export function SupabaseGate({ children }: { children: ReactNode }) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-medium">Backend not connected yet</h1>
        <p className="mt-3 text-[15px] text-body">
          Add{" "}
          <code className="rounded bg-cream px-1.5 py-0.5 text-[13px]">
            NEXT_PUBLIC_SUPABASE_URL
          </code>{" "}
          and{" "}
          <code className="rounded bg-cream px-1.5 py-0.5 text-[13px]">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>{" "}
          to <code className="rounded bg-cream px-1.5 py-0.5 text-[13px]">.env.local</code> (see{" "}
          <code className="rounded bg-cream px-1.5 py-0.5 text-[13px]">.env.example</code>), then
          restart the server.
        </p>
        <Link href="/" className="btn btn-dark mt-6">
          Back to home
        </Link>
      </div>
    );
  }
  return <>{children}</>;
}
