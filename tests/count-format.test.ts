import { describe, expect, it } from "vitest";
import { clampPercent, formatCountFrame, parseCountValue } from "@/lib/count-format";

/** Every number format that appears on the page must round-trip exactly. */
const FORMATS = [
  "10-15%",
  "55%",
  "$1,261",
  "+32%",
  "3x",
  "68%",
  "+40%",
  "5min",
  "2.3x",
  "-8yr",
  "+0.4",
  "-31%",
];

describe("parseCountValue + formatCountFrame", () => {
  it.each(FORMATS)("round-trips %s at progress 1", (value) => {
    const spec = parseCountValue(value);
    expect(spec).not.toBeNull();
    expect(formatCountFrame(spec!, 1)).toBe(value);
  });

  it("animates only the LAST number in a range", () => {
    const spec = parseCountValue("10-15%")!;
    expect(spec.prefix).toBe("10-");
    expect(spec.target).toBe(15);
    expect(spec.suffix).toBe("%");
  });

  it("keeps thousands separators while animating", () => {
    const spec = parseCountValue("$1,261")!;
    expect(spec.useComma).toBe(true);
    expect(formatCountFrame(spec, 0.5)).toMatch(/^\$\d{3}(\.\d+)?$|^\$\d,?\d*$/);
    expect(formatCountFrame(spec, 1)).toBe("$1,261");
  });

  it("preserves decimals", () => {
    const spec = parseCountValue("+0.4")!;
    expect(spec.decimals).toBe(1);
    expect(formatCountFrame(spec, 1)).toBe("+0.4");
  });

  it("returns null when there is no number", () => {
    expect(parseCountValue("free")).toBeNull();
  });
});

describe("clampPercent", () => {
  it("clamps into 0–100", () => {
    expect(clampPercent(-20)).toBe(0);
    expect(clampPercent(0)).toBe(0);
    expect(clampPercent(50)).toBe(50);
    expect(clampPercent(100)).toBe(100);
    expect(clampPercent(140)).toBe(100);
  });
});
