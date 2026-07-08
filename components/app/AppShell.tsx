"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LogOut, Menu, Plus, Search, Sparkles, X } from "lucide-react";
import { LogoLockup } from "@/components/visuals/Logo";
import { ThemeToggle } from "@/components/app/theme";
import { useUser } from "@/components/app/session";
import { useCommand } from "@/components/app/command";
import { useAssistant } from "@/components/app/assistant";
import { useAdminAccess } from "@/components/app/hooks";
import { Notifications } from "@/components/app/Notifications";
import {
  APP_NAV,
  APP_NAV_ACCOUNT,
  APP_NAV_ADMIN,
  APP_NAV_ALL,
  type AppNavItem,
} from "@/components/app/nav";

function initialsFromEmail(email: string | null): string {
  if (!email) return "T";
  return email.slice(0, 2).toUpperCase();
}

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavList({
  items,
  pathname,
  onNavigate = () => {},
}: {
  items: AppNavItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="grid gap-1">
      {items.map(({ href, label, Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-medium transition-colors ${
              active ? "bg-surface-2 text-ink" : "text-body hover:bg-surface-2/60 hover:text-ink"
            }`}
          >
            <Icon
              className={`h-[18px] w-[18px] ${active ? "text-sage-mid" : ""}`}
              strokeWidth={1.75}
            />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarContent({ onNavigate = () => {} }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { email, signOut } = useUser();
  const admin = useAdminAccess();
  const nav = admin === "granted" ? [...APP_NAV, ...APP_NAV_ADMIN] : APP_NAV;
  return (
    <div className="flex h-full flex-col gap-6 p-4">
      <Link href="/dashboard" onClick={onNavigate} className="px-2 py-1">
        <LogoLockup />
      </Link>
      <Link href="/scan" onClick={onNavigate} className="btn btn-dark w-full gap-2">
        <Plus className="h-[18px] w-[18px]" strokeWidth={2} />
        New scan
      </Link>
      <NavList items={nav} pathname={pathname} onNavigate={onNavigate} />
      <div className="mt-auto grid gap-1">
        <NavList items={APP_NAV_ACCOUNT} pathname={pathname} onNavigate={onNavigate} />
        <div className="mt-2 flex items-center gap-3 rounded-xl border border-line p-2.5">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-gradient-to-br from-[#c8d4d4] to-[#9dadad] text-xs font-semibold text-ink">
            {initialsFromEmail(email)}
          </span>
          <span className="min-w-0 flex-1 truncate text-[13px] text-body">{email ?? "Signed in"}</span>
          <button
            type="button"
            onClick={() => void signOut()}
            aria-label="Sign out"
            className="icon-btn h-8 w-8"
          >
            <LogOut className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
}

function pageTitle(pathname: string): string {
  const seg = `/${pathname.split("/")[1] ?? ""}`;
  const found = APP_NAV_ALL.find((i) => i.href === seg);
  return found?.label ?? "Taiuo";
}

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { setOpen } = useCommand();
  const { setOpen: setAssistantOpen } = useAssistant();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-svh">
        {/* desktop sidebar */}
        <aside className="sticky top-0 hidden h-svh w-[264px] flex-none border-r border-line bg-surface lg:block">
          <SidebarContent />
        </aside>

        {/* mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm lg:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-y-0 left-0 z-[61] w-[280px] border-r border-line bg-surface lg:hidden"
              >
                <button
                  type="button"
                  aria-label="Close menu"
                  className="icon-btn absolute right-3 top-3"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
                <SidebarContent onNavigate={() => setMobileOpen(false)} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-line bg-canvas/80 px-4 backdrop-blur-md sm:px-6">
            <button
              type="button"
              className="icon-btn lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-[15px] font-semibold text-ink">{pageTitle(pathname)}</h1>
            <div className="ml-auto flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="hidden items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 text-[13px] text-faint transition-colors hover:text-body sm:flex"
              >
                <Search className="h-4 w-4" strokeWidth={1.75} />
                Search
                <kbd className="ml-2 rounded border border-line px-1.5 py-0.5 text-[10px] font-medium">
                  ⌘K
                </kbd>
              </button>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="icon-btn sm:hidden"
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => setAssistantOpen(true)}
                className="icon-btn"
                aria-label="Open assistant"
              >
                <Sparkles className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </button>
              <Notifications />
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
  );
}
