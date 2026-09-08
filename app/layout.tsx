import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Providers from "@/components/motion/Providers";
import { validateEnv } from "@/lib/env";
import { SITE_URL } from "@/lib/site";

// fail the build (not the user) on malformed environment configuration
validateEnv();

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  // "optional": no late font-swap repaint — the swap was re-triggering LCP at
  // ~4s on throttled mobile. First uncached visit may keep the metric-adjusted
  // fallback; cached visits render Inter. (v4 §10 LCP budget)
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Taiuo — Intelligent beauty. Real you.",
    template: "%s · Taiuo",
  },
  description:
    "Less guesswork. More you. Discover personal skin insights, a daily routine that fits, and a clearer picture of your progress. Start your first scan free.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Taiuo — Intelligent beauty. Real you.",
    description:
      "Your skin has a story. Get to know it with personal insights, everyday routines and progress tracking.",
    type: "website",
    siteName: "Taiuo",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Taiuo — Intelligent beauty. Real you.",
    description: "Personal skin insights. Thoughtful daily routines. A little more you.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F4EE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        {/* platform scripts only exist on Vercel — skip locally so the console stays clean */}
        {process.env.VERCEL ? (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        ) : null}
      </body>
    </html>
  );
}
