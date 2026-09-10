import type { Metadata } from "next";
import { EditorialSite } from "@/components/brand/EditorialSite";
import { TAIUO_DESCRIPTION } from "@/lib/brand";
export const metadata: Metadata = {
  title: "Taiuo — Understand your skin",
  description: TAIUO_DESCRIPTION,
  alternates: { canonical: "https://taiuo-tech-website.vercel.app/" },
  openGraph: {
    title: "Taiuo — Understand your skin",
    description: TAIUO_DESCRIPTION,
    url: "https://taiuo-tech-website.vercel.app/",
    siteName: "Taiuo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taiuo — Understand your skin",
    description: TAIUO_DESCRIPTION,
  },
};
export default function Website() {
  return <EditorialSite />;
}
