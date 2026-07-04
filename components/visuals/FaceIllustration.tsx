/**
 * 5B — Stylized illustrative face for the before/after sliders.
 * The SAME abstract face rendered in two moods:
 *   before — cooler, flatter, lower-contrast, dull skin
 *   after  — warmer, brighter, clearer skin, subtly refined jaw/brow
 * Clearly NOT photoreal and not a real person.
 */

interface Palette {
  bg: string;
  skin: string;
  skinShade: string;
  hair: string;
  line: string;
  lip: string;
}

const PALETTES: Record<"before" | "after", Palette> = {
  before: {
    bg: "#DDE3E3",
    skin: "#CFC6BE",
    skinShade: "#BBB1A8",
    hair: "#5C564F",
    line: "#6E675F",
    lip: "#A8887E",
  },
  after: {
    bg: "#EBE3D7",
    skin: "#EBCFB5",
    skinShade: "#DBB897",
    hair: "#4A423A",
    line: "#5C5044",
    lip: "#C68B76",
  },
};

export default function FaceIllustration({
  variant,
  flip = false,
}: {
  variant: "before" | "after";
  flip?: boolean;
}) {
  const p = PALETTES[variant];
  const after = variant === "after";

  return (
    <svg
      viewBox="0 0 300 400"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Illustrative ${variant} face`}
      style={{
        filter: after ? "none" : "saturate(0.72) contrast(0.95) brightness(0.97)",
      }}
    >
      <rect width="300" height="400" fill={p.bg} />
      <g transform={flip ? "translate(300 0) scale(-1 1)" : undefined}>
        {/* shoulders */}
        <path d="M60 400 C70 340 105 310 150 308 C195 310 230 340 240 400 Z" fill={after ? "#3A4443" : "#4A5252"} />
        {/* neck */}
        <rect x="132" y="255" width="36" height="60" rx="14" fill={p.skinShade} />
        {/* head */}
        <ellipse cx="150" cy="185" rx="72" ry="88" fill={p.skin} />
        {/* jaw definition — crisper on the after face */}
        <path
          d="M86 210 C95 262 118 288 150 296 C182 288 205 262 214 210"
          fill="none"
          stroke={p.line}
          strokeWidth={after ? 2.4 : 1.2}
          strokeOpacity={after ? 0.5 : 0.28}
          strokeLinecap="round"
        />
        {/* hair */}
        <path
          d="M78 180 C70 96 118 70 150 70 C182 70 230 96 222 180
             C222 140 196 118 150 116 C104 118 78 140 78 180 Z"
          fill={p.hair}
        />
        {/* brows — slightly lifted on after */}
        <path d={after ? "M108 158 C118 150 132 149 140 154" : "M108 160 C118 155 132 155 140 158"} stroke={p.line} strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d={after ? "M160 154 C168 149 182 150 192 158" : "M160 158 C168 155 182 155 192 160"} stroke={p.line} strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* eyes */}
        <ellipse cx="124" cy="178" rx="10" ry={after ? 6 : 5} fill="#FFFFFF" opacity="0.9" />
        <ellipse cx="176" cy="178" rx="10" ry={after ? 6 : 5} fill="#FFFFFF" opacity="0.9" />
        <circle cx="124" cy="178" r="3.4" fill="#3E3A36" />
        <circle cx="176" cy="178" r="3.4" fill="#3E3A36" />
        {/* nose */}
        <path d="M150 186 C148 202 146 212 143 220 C146 224 154 224 157 220" fill="none" stroke={p.line} strokeWidth="2" strokeOpacity="0.55" strokeLinecap="round" />
        {/* lips — gentle smile on after, flat on before */}
        <path
          d={after ? "M128 248 C140 258 160 258 172 248 C160 252 140 252 128 248" : "M130 250 C142 252 158 252 170 250 C158 252 142 252 130 250"}
          fill={p.lip}
          stroke={p.lip}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* skin texture: dull spots before / soft highlight after */}
        {after ? (
          <>
            <ellipse cx="110" cy="205" rx="14" ry="8" fill="#FFFFFF" opacity="0.22" />
            <ellipse cx="190" cy="205" rx="14" ry="8" fill="#FFFFFF" opacity="0.22" />
            <ellipse cx="150" cy="132" rx="26" ry="8" fill="#FFFFFF" opacity="0.14" />
          </>
        ) : (
          <>
            <circle cx="106" cy="212" r="2.4" fill={p.line} opacity="0.25" />
            <circle cx="118" cy="226" r="1.8" fill={p.line} opacity="0.22" />
            <circle cx="196" cy="208" r="2.2" fill={p.line} opacity="0.25" />
            <circle cx="184" cy="230" r="1.7" fill={p.line} opacity="0.2" />
            <circle cx="160" cy="146" r="2" fill={p.line} opacity="0.2" />
            <path d="M96 190 C100 196 100 204 97 210" stroke={p.line} strokeWidth="1.2" opacity="0.25" fill="none" />
            <path d="M204 190 C200 196 200 204 203 210" stroke={p.line} strokeWidth="1.2" opacity="0.25" fill="none" />
          </>
        )}
      </g>
    </svg>
  );
}
