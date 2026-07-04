import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Providers from "@/components/motion/Providers";
import { validateEnv } from "@/lib/env";
import { SITE_URL } from "@/lib/site";

// fail the build (not the user) on malformed environment configuration
validateEnv();

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
    default: "Taiuo Tech - Improve Your Looks Without Surgery",
    template: "%s · Taiuo Tech",
  },
  description:
    "Get your personalized facial analysis and transformation plan based on your unique features. 160+ beauty markers, 450+ evidence-based methods — no surgery needed.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Taiuo Tech - Improve Your Looks Without Surgery",
    description:
      "Personalized facial analysis and transformation plan based on your unique features. Science-based. Non-surgical.",
    type: "website",
    siteName: "Taiuo Tech",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Taiuo Tech - Improve Your Looks Without Surgery",
    description:
      "Personalized facial analysis and transformation plan based on your unique features.",
  },
};

export const viewport: Viewport = {
  themeColor: "#A8B5B5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
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
