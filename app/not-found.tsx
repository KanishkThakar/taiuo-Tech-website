import Link from "next/link";
import type { Metadata } from "next";
import LogoMark from "@/components/visuals/LogoMark";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div
      className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center"
      style={{ background: "linear-gradient(160deg, #A8B5B5 0%, #C8D4D4 55%, #FAFAFA 100%)" }}
    >
      <Link href="/" aria-label="Taiuo — home" className="inline-flex items-center gap-2.5">
        <LogoMark />
        <span className="text-xl font-semibold tracking-[-0.02em]">Taiuo</span>
      </Link>
      <div>
        <p className="text-[64px] font-semibold leading-none tracking-tight text-ink">404</p>
        <h1 className="mt-3 text-xl font-medium text-ink">This page took a wrong turn</h1>
        <p className="mx-auto mt-2 max-w-sm text-[15px] text-ink/70">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
      </div>
      <div className="flex gap-3">
        <Link href="/" className="btn btn-dark">
          Back to home
        </Link>
        <Link href="/dashboard" className="btn btn-glass !bg-white/70">
          Go to dashboard
        </Link>
      </div>
    </div>
  );
}
