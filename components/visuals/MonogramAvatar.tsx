/** 64px monogram avatar — honest placeholder, never a real person's photo. */
export default function MonogramAvatar({
  initials = "T",
  className = "h-16 w-16",
}: {
  initials?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Placeholder avatar">
      <defs>
        <linearGradient id="mono-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C8D4D4" />
          <stop offset="100%" stopColor="#9DADAD" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill="url(#mono-bg)" />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontSize="24"
        fontWeight="600"
        fill="#1A1A1A"
        fillOpacity="0.75"
      >
        {initials}
      </text>
    </svg>
  );
}
