import LogoMark from "@/components/visuals/LogoMark";

/**
 * Taiuo wordmark — the "Taiuo" name in the brand's Inter face at weight 600,
 * tightened tracking. Kept as its own piece so it can pair with the mark or
 * stand alone. Colour inherits (defaults to ink) so it works on any surface.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`text-[1.25rem] font-semibold leading-none tracking-[-0.03em] ${className}`.trim()}
    >
      Taiuo
    </span>
  );
}

const MARK_SIZE = {
  sm: "h-6 w-6",
  md: "h-[30px] w-[30px]",
  lg: "h-9 w-9",
} as const;

/**
 * Logo lockup — mark + wordmark, optically aligned. The default header
 * lockup for the site nav and product shell.
 */
export function LogoLockup({
  size = "md",
  animated = false,
  className = "",
  wordmarkClassName = "",
}: {
  size?: keyof typeof MARK_SIZE;
  animated?: boolean;
  className?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`.trim()}>
      <LogoMark className={MARK_SIZE[size]} animated={animated} />
      <Wordmark className={wordmarkClassName} />
    </span>
  );
}

/**
 * Animated logo reveal — the mark draws its "T" and settles. Pure-CSS
 * (see globals `.logo-animated`), reduced-motion safe. Useful as a splash/
 * loading affordance or a one-shot brand moment.
 */
export function AnimatedLogo({ className = "h-12 w-12" }: { className?: string }) {
  return <LogoMark className={className} animated title="Taiuo" />;
}
