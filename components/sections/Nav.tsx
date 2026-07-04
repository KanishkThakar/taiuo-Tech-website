"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import LogoMark from "@/components/visuals/LogoMark";
import { NAV_LINKS } from "@/lib/data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 h-[72px] max-md:h-16 border-b transition-[background,border-color,box-shadow] duration-300 ${
          menuOpen
            ? "z-[70] border-transparent bg-transparent"
            : scrolled
              ? "z-50 border-line bg-white/90 backdrop-blur-md"
              : "z-50 border-transparent bg-transparent"
        }`}
      >
        <div className="container-x flex h-full items-center justify-between gap-6">
          <a href="#top" className="inline-flex items-center gap-2.5" aria-label="Taiuo — home">
            <LogoMark />
            <span className="text-xl font-semibold tracking-[-0.02em]">Taiuo</span>
          </a>

          <nav className="flex gap-8 max-md:hidden" aria-label="Primary">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="py-2 text-sm font-medium text-body transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a href="#" className="text-sm font-medium hover:opacity-70 max-md:hidden">
              Log in
            </a>
            <a
              href="#pricing"
              className={`btn max-md:hidden min-h-[42px] px-6 py-[11px] text-sm ${
                scrolled ? "btn-dark" : "btn-white shadow-soft"
              }`}
            >
              Start my plan
            </a>
            <button
              className="hidden h-11 w-11 flex-col items-center justify-center gap-[5px] max-md:flex"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className={`block h-0.5 w-[22px] rounded bg-ink transition-transform duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-0.5 w-[22px] rounded bg-ink transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-[22px] rounded bg-ink transition-transform duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
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
              className="fixed inset-0 z-[55] bg-black/35"
              onClick={() => setMenuOpen(false)}
            />
            <motion.aside
              key="panel"
              id="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-[60] w-[min(320px,85vw)] bg-white px-8 pt-24 shadow-max"
            >
              <nav className="flex flex-col" aria-label="Mobile">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="border-b border-line py-[13px] text-lg font-medium"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#"
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-line py-[13px] text-lg font-medium"
                >
                  Log in
                </a>
                <a href="#pricing" onClick={() => setMenuOpen(false)} className="btn btn-dark mt-6">
                  Start my plan
                </a>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
