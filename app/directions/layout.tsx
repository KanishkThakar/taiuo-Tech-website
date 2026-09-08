import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Taiuo — Design directions",
  robots: { index: false, follow: false },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
