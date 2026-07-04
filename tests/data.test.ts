import { describe, expect, it } from "vitest";
import {
  BENEFITS,
  CONSIDER_CHECKS,
  DERM_POINTS,
  FACTORS,
  FAQ,
  FAQ_CATEGORIES,
  FEATURES,
  HOW_STEPS,
  LEARN_ITEMS,
  PHOTO_SLOTS,
  PRESS,
  PRICE_FEATURES,
  STAT_CATEGORIES,
  STATS,
} from "@/lib/data";

/** Content-integrity gates (v4 §12): the page is data-driven, so the data must be sound. */
describe("stats data", () => {
  it("has all 8 categories, 4 complete stats each", () => {
    expect(STAT_CATEGORIES).toHaveLength(8);
    for (const cat of STAT_CATEGORIES) {
      const stats = STATS[cat];
      expect(stats, cat).toHaveLength(4);
      for (const s of stats) {
        expect(s.num.length).toBeGreaterThan(0);
        expect(s.title.length).toBeGreaterThan(0);
        expect(s.desc.length).toBeGreaterThan(0);
        expect(s.cite.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("faq data", () => {
  it("has 12 well-formed items covering every category", () => {
    expect(FAQ).toHaveLength(12);
    for (const cat of FAQ_CATEGORIES) {
      expect(FAQ.filter((f) => f.cat === cat).length, cat).toBeGreaterThan(0);
    }
    for (const f of FAQ) {
      expect(f.q.endsWith("?"), f.q).toBe(true);
      expect(f.a.length).toBeGreaterThan(20);
    }
  });
});

describe("onboarding data", () => {
  it("defines exactly 6 photo slots with unique keys", () => {
    expect(PHOTO_SLOTS).toHaveLength(6);
    const keys = PHOTO_SLOTS.map((s) => s.key);
    expect(new Set(keys).size).toBe(6);
    for (const key of keys) {
      // keys become storage object names — keep them URL/path-safe
      expect(key).toMatch(/^[a-z0-9-]+$/);
    }
  });
});

describe("section data shapes", () => {
  it("matches the master-prompt cardinalities", () => {
    expect(PRESS).toHaveLength(8);
    expect(BENEFITS).toHaveLength(5);
    expect(FEATURES).toHaveLength(6);
    expect(FACTORS).toHaveLength(5);
    expect(LEARN_ITEMS).toHaveLength(5);
    expect(HOW_STEPS).toHaveLength(3);
    expect(PRICE_FEATURES).toHaveLength(8);
    expect(DERM_POINTS).toHaveLength(3);
    expect(CONSIDER_CHECKS).toHaveLength(4);
  });
});
