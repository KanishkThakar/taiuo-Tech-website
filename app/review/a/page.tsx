import type { Metadata } from "next";
import { EditorialSite } from "@/components/brand/EditorialSite";
export const metadata: Metadata = {
  title: "Taiuo — Option A / Editorial",
  description:
    "Homepage design review. Compare the editorial and platform directions before choosing the final design.",
  robots: { index: false, follow: false },
};
export default function Review() {
  return <EditorialSite hero="couple" review />;
}
