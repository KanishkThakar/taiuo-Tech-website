/**
 * Parsing/formatting for animated stat numbers.
 * Handles every format on the page: "10-15%", "$1,261", "2.3x",
 * "-8yr", "+0.4", "5min", "68%" — the LAST number in the string is
 * animated; everything around it is preserved as prefix/suffix.
 */

export interface CountSpec {
  prefix: string;
  suffix: string;
  target: number;
  decimals: number;
  useComma: boolean;
}

export function parseCountValue(value: string): CountSpec | null {
  const m = value.match(/([\d,]+(?:\.\d+)?)(?!.*\d)/);
  if (!m || m.index === undefined) return null;
  const numStr = m[1];
  if (numStr === undefined) return null;
  return {
    prefix: value.slice(0, m.index),
    suffix: value.slice(m.index + numStr.length),
    target: parseFloat(numStr.replace(/,/g, "")),
    decimals: (numStr.split(".")[1] ?? "").length,
    useComma: numStr.includes(","),
  };
}

export function formatCountFrame(spec: CountSpec, progress: number): string {
  let v = (spec.target * progress).toFixed(spec.decimals);
  if (spec.useComma) {
    v = Number(v).toLocaleString("en-US", { minimumFractionDigits: spec.decimals });
  }
  return spec.prefix + v + spec.suffix;
}

/** Clamp a 0–100 slider position (shared by BeforeAfterSlider + tests). */
export function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, value));
}
