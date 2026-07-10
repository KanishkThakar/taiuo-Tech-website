"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ThemeProvider, useTheme } from "@/components/app/theme";
import { AppSession } from "@/components/app/session";
import { CommandProvider } from "@/components/app/command";
import { AssistantProvider } from "@/components/app/assistant";
import AppShell from "@/components/app/AppShell";

function ThemedRoot({ children }: { children: ReactNode }) {
  const { resolved } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  // The stored/system choice is only known on the client, so the server always
  // renders `data-theme="light"`. `suppressHydrationWarning` stops React from
  // reconciling that attribute during hydration — which also means it never
  // corrects it. Sync it imperatively so the DOM always matches `resolved`.
  useEffect(() => {
    ref.current?.setAttribute("data-theme", resolved);
  }, [resolved]);

  return (
    <div ref={ref} className="app-theme min-h-svh" data-theme={resolved} suppressHydrationWarning>
      {children}
    </div>
  );
}

/** Client provider stack for the authenticated app: theme → session → ⌘K → shell. */
export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <ThemedRoot>
        <AppSession>
          <AssistantProvider>
            <CommandProvider>
              <AppShell>{children}</AppShell>
            </CommandProvider>
          </AssistantProvider>
        </AppSession>
      </ThemedRoot>
    </ThemeProvider>
  );
}
