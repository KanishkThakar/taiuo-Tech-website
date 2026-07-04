import { track as vercelTrack } from "@vercel/analytics";

/**
 * Typed, consent-friendly analytics wrapper (v4 §14).
 * One narrow event union — no free-form event spam, easy to swap providers.
 * Vercel Web Analytics is cookieless; only meaningful interactions are tracked.
 */
export type AnalyticsEvent =
  | { name: "cta_click"; props: { location: "nav" | "hero" | "cta_band" | "pricing" } }
  | { name: "stats_tab"; props: { category: string } }
  | { name: "faq_tab"; props: { category: string } }
  | { name: "onboarding_step"; props: { step: number } }
  | { name: "onboarding_submitted"; props?: undefined };

export function trackEvent(event: AnalyticsEvent): void {
  try {
    vercelTrack(event.name, event.props ?? {});
  } catch {
    // analytics must never break the product
  }
}
