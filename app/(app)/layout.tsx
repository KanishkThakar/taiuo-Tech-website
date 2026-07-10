import type { Metadata } from "next";
import AppProviders from "@/components/app/AppProviders";

export const metadata: Metadata = {
  title: "Your space",
  robots: { index: false, follow: false },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AppProviders>{children}</AppProviders>;
}
