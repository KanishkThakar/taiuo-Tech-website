export default function LogoMark({ className = "w-[30px] h-[30px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="#1A1A1A" />
      <path
        d="M8 9h16M16 9v14"
        stroke="#C8D4D4"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
