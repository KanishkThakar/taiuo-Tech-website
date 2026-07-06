import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { TESTIMONIAL } from "@/lib/data";

/** 3.7 — centerpiece expert quote. */
export default function Testimonial() {
  return (
    <section
      className="relative overflow-hidden border-y border-line bg-white py-24"
      aria-label="Testimonial"
    >
      {/* soft sage radiance behind the quote */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(168_181_181/0.16),transparent)]"
        aria-hidden="true"
      />
      <Reveal
        stagger
        className="container-x relative flex max-w-[780px] flex-col items-center text-center"
      >
        <span
          className="select-none bg-gradient-to-br from-sage-mid to-sage-base bg-clip-text font-serif text-[80px] leading-[0.5] text-transparent opacity-70"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <blockquote className="mt-4">
          <p className="text-[clamp(1.35rem,2.4vw,1.6rem)] font-normal leading-snug tracking-[-0.01em] text-ink">
            {TESTIMONIAL.quote}
          </p>
        </blockquote>
        <div className="mt-9 flex items-center gap-3">
          <Image
            src={TESTIMONIAL.photo}
            alt={TESTIMONIAL.name}
            width={52}
            height={52}
            className="h-[52px] w-[52px] rounded-full object-cover shadow-mid ring-2 ring-white"
          />
          <div className="text-left">
            <p className="flex items-center gap-1.5 text-[15px] font-semibold">
              {TESTIMONIAL.name}
              <BadgeCheck className="h-4 w-4 text-sage-mid" aria-hidden="true" />
            </p>
            <p className="text-[13px] text-body">{TESTIMONIAL.role}</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
