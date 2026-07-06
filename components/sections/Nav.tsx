"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogoLockup } from "@/components/visuals/Logo";
import MagneticButton from "@/components/motion/MagneticButton";
import { NAV_LINKS } from "@/lib/data";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll-spy: highlight the nav link whose section is crossing mid-viewport */
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.href.slice(1))).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) setActive(`#${top.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  /* session-aware nav: "Log in" ↔ "My plan"; supabase-js loaded lazily off-critical-path */
  useEffect(() => {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;
    (async () => {
      const { getSupabase, isSupabaseConfigured } = await import("@/lib/supabase");
      if (cancelled || !isSupabaseConfigured()) return;
      const supabase = getSupabase();
      const { data } = await supabase.auth.getSession();
      if (!cancelled) setHasSession(Boolean(data.session));
      const { data: sub } = supabase.auth.onAuthStateChange((_e, session) =>
        setHasSession(Boolean(session)),
      );
      unsubscribe = () => sub.subscription.unsubscribe();
    })();
    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const accountHref = hasSession ? "/dashboard" : "/login";
  const accountLabel = hasSession ? "My plan" : "Log in";

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,height] duration-300 ease-smooth ${
          scrolled ? "h-[60px] max-md:h-[60px]" : "h-[76px] max-md:h-16"
        } ${
          menuOpen
            ? "border-transparent bg-transparent"
            : scrolled
              ? "border-line/70 bg-white/70 shadow-[0_1px_0_rgb(0_0_0/0.02),0_10px_30px_-24px_rgb(26_34_34/0.5)] backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent"
        } ${menuOpen ? "z-[70]" : "z-50"}`}
      >
        <div className="container-x flex h-full items-center justify-between gap-6">
          <a
            href="#top"
            aria-label="Taiuo — home"
            className="-m-2 rounded-lg p-2 transition-opacity hover:opacity-90"
          >
            <LogoLockup animated />
          </a>

          <nav className="flex gap-1 max-md:hidden" aria-label="Primary">
            {NAV_LINKS.map((l) => {
              const isActive = active === l.href;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-ink" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {l.label}
                  <span
                    className={`pointer-events-none absolute inset-x-3 -bottom-0.5 mx-auto h-px origin-center rounded-full bg-ink transition-transform duration-300 ease-smooth ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 max-md:gap-1">
            <Link
              href={accountHref}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink/70 transition-colors hover:text-ink max-md:hidden"
            >
              {accountLabel}
            </Link>
            <MagneticButton className="max-md:hidden">
              <Link
                href="/onboarding"
                className={`btn min-h-[42px] px-6 py-[11px] text-sm ${
                  scrolled ? "btn-dark" : "btn-white shadow-mid"
                }`}
              >
                Start my plan
              </Link>
            </MagneticButton>
            <button
              type="button"
              className="hidden h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-lg max-md:flex"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span
                className={`block h-0.5 w-[22px] rounded-full bg-ink transition-transform duration-300 ease-smooth ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-[22px] rounded-full bg-ink transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-[22px] rounded-full bg-ink transition-transform duration-300 ease-smooth ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[55] bg-ink/20 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              key="panel"
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="fixed inset-y-0 right-0 z-[60] flex w-[min(340px,86vw)] flex-col bg-white px-7 pb-8 pt-6 shadow-float"
            >
              <div className="mb-8 flex h-10 items-center">
                <LogoLockup />
              </div>
              <nav className="flex flex-col" aria-label="Mobile">
                {NAV_LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.35, ease: EASE }}
                    className="flex items-center justify-between border-b border-line py-4 text-[17px] font-medium text-ink"
                  >
                    {l.label}
                    <span aria-hidden className="text-faint">
                      ↗
                    </span>
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + NAV_LINKS.length * 0.05, duration: 0.35, ease: EASE }}
                >
                  <Link
                    href={accountHref}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between border-b border-line py-4 text-[17px] font-medium text-ink"
                  >
                    {accountLabel}
                  </Link>
                </motion.div>
              </nav>
              <Link
                href="/onboarding"
                onClick={() => setMenuOpen(false)}
                className="btn btn-dark mt-auto w-full"
              >
                Start my plan
              </Link>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
