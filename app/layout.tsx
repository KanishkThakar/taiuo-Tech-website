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
    default: "Taiuo — Understand your skin",
    template: "%s · Taiuo",
  },
  description:
    "Taiuo is an AI-powered beauty tech platform that helps you explore your skin, build a more informed care routine, and track visible changes over time.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Taiuo — Understand your skin",
    description:
      "Taiuo is an AI-powered beauty tech platform that helps you explore your skin, build a more informed care routine, and track visible changes over time.",
    type: "website",
    siteName: "Taiuo",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Taiuo — Understand your skin",
    description:
      "Taiuo is an AI-powered beauty tech platform that helps you explore your skin, build a more informed care routine, and track visible changes over time.",
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
