import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/motion/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taiuo Tech - Improve Your Looks Without Surgery",
  description:
    "Get your personalized facial analysis and transformation plan based on your unique features. 160+ beauty markers, 450+ evidence-based methods — no surgery needed.",
  openGraph: {
    title: "Taiuo Tech - Improve Your Looks Without Surgery",
    description:
      "Personalized facial analysis and transformation plan based on your unique features. Science-based. Non-surgical.",
    type: "website",
    siteName: "Taiuo Tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taiuo Tech - Improve Your Looks Without Surgery",
    description:
      "Personalized facial analysis and transformation plan based on your unique features.",
  },
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
      </body>
    </html>
  );
}
