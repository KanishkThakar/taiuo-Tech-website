"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { LogOut, MoonStar, Sparkles } from "lucide-react";
import { useTheme } from "@/components/app/theme";
import { useUser } from "@/components/app/session";
import { APP_NAV, APP_NAV_ACCOUNT } from "@/components/app/nav";

interface CommandCtxValue {
  open: boolean;
  setOpen: (o: boolean) => void;
}
const CommandCtx = createContext<CommandCtxValue | null>(null);

export function useCommand(): CommandCtxValue {
  const ctx = useContext(CommandCtx);
  if (!ctx) throw new Error("useCommand must be used within <CommandProvider>");
  return ctx;
}

const NAV = [...APP_NAV, ...APP_NAV_ACCOUNT];

export function CommandProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setChoice, resolved } = useTheme();
  const { signOut } = useUser();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <CommandCtx.Provider value={{ open, setOpen }}>
      {children}
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Command menu"
        className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh]"
      >
        <button
          type="button"
          aria-label="Close"
          className="fixed inset-0 -z-10 bg-ink/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <div className="app-card w-full max-w-xl overflow-hidden border-line p-0 shadow-float">
          <Command.Input
            placeholder="Search or jump to…"
            className="w-full border-b border-line bg-transparent px-5 py-4 text-[15px] text-ink outline-none placeholder:text-faint"
          />
          <Command.List className="max-h-[52vh] overflow-y-auto p-2">
            <Command.Empty className="px-4 py-8 text-center text-sm text-body">
              No results found.
            </Command.Empty>
            <Command.Group
              heading="Navigate"
              className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-faint [&_[cmdk-group-items]]:mt-1"
            >
              {NAV.map(({ href, label, Icon }) => (
                <Command.Item
                  key={href}
                  value={label}
                  onSelect={() => go(href)}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] text-ink data-[selected=true]:bg-surface-2"
                >
                  <Icon className="h-[18px] w-[18px] text-body" strokeWidth={1.75} />
                  {label}
                </Command.Item>
              ))}
            </Command.Group>
            <Command.Group
              heading="Actions"
              className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-faint [&_[cmdk-group-items]]:mt-1"
            >
              <Command.Item
                value="Start new scan"
                onSelect={() => go("/scan")}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] text-ink data-[selected=true]:bg-surface-2"
              >
                <Sparkles className="h-[18px] w-[18px] text-body" strokeWidth={1.75} />
                Start a new analysis
              </Command.Item>
              <Command.Item
                value="Toggle theme"
                onSelect={() => {
                  setChoice(resolved === "dark" ? "light" : "dark");
                  setOpen(false);
                }}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] text-ink data-[selected=true]:bg-surface-2"
              >
                <MoonStar className="h-[18px] w-[18px] text-body" strokeWidth={1.75} />
                Toggle {resolved === "dark" ? "light" : "dark"} theme
              </Command.Item>
              <Command.Item
                value="Sign out"
                onSelect={() => {
                  setOpen(false);
                  void signOut();
                }}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] text-ink data-[selected=true]:bg-surface-2"
              >
                <LogOut className="h-[18px] w-[18px] text-body" strokeWidth={1.75} />
                Sign out
              </Command.Item>
            </Command.Group>
          </Command.List>
        </div>
      </Command.Dialog>
    </CommandCtx.Provider>
  );
}
