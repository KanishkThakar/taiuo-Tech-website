/**
 * 5D — mini SVG thumbnails for the "You will learn.." rows.
 */
import type { FC } from "react";
import type { LearnItem } from "@/lib/data";

function Dial() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <circle cx="40" cy="44" r="24" fill="none" stroke="#C8D4D4" strokeWidth="3" />
      <path
        d="M16 44a24 24 0 0 1 37-20"
        fill="none"
        stroke="#1A1A1A"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text x="40" y="50" textAnchor="middle" fontSize="16" fontWeight="600" fill="#1A1A1A">
        86
      </text>
    </svg>
  );
}

function FaceMap() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <ellipse cx="40" cy="40" rx="18" ry="24" fill="none" stroke="#9DADAD" strokeWidth="2.5" />
      <g fill="#1A1A1A">
        <circle cx="33" cy="34" r="2.2" />
        <circle cx="47" cy="34" r="2.2" />
        <circle cx="40" cy="44" r="2.2" />
        <circle cx="40" cy="54" r="2.2" />
        <circle cx="28" cy="44" r="2.2" />
        <circle cx="52" cy="44" r="2.2" />
      </g>
    </svg>
  );
}

function HarmonyWeb() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <polygon
        points="40,16 62,32 54,58 26,58 18,32"
        fill="rgba(168,181,181,.25)"
        stroke="#9DADAD"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <polygon
        points="40,26 54,36 49,52 31,52 26,36"
        fill="none"
        stroke="#1A1A1A"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PotentialBars() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <g strokeLinecap="round">
        <line x1="24" y1="60" x2="24" y2="44" stroke="#C8D4D4" strokeWidth="7" />
        <line x1="40" y1="60" x2="40" y2="32" stroke="#9DADAD" strokeWidth="7" />
        <line x1="56" y1="60" x2="56" y2="20" stroke="#1A1A1A" strokeWidth="7" />
      </g>
    </svg>
  );
}

function Molecule() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true">
      <g fill="none" stroke="#9DADAD" strokeWidth="2.5">
        <circle cx="30" cy="34" r="9" />
        <circle cx="53" cy="46" r="7" />
        <line x1="38" y1="38" x2="46" y2="43" />
      </g>
      <circle cx="30" cy="34" r="3" fill="#1A1A1A" />
      <circle cx="53" cy="46" r="2.5" fill="#1A1A1A" />
    </svg>
  );
}

const THUMBS: Record<LearnItem["thumb"], FC> = {
  dial: Dial,
  map: FaceMap,
  web: HarmonyWeb,
  bars: PotentialBars,
  molecule: Molecule,
};

export default function Thumb({ kind }: { kind: LearnItem["thumb"] }) {
  const Cmp = THUMBS[kind];
  return <Cmp />;
}
