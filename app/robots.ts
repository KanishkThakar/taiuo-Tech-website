import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // private, session-gated surfaces — nothing useful to index
      disallow: ["/onboarding", "/dashboard"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
