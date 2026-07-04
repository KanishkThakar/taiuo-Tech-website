import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { TESTIMONIAL } from "@/lib/data";

/** 3.7 — centerpiece expert quote. */
export default function Testimonial() {
  return (
    <section className="border-y border-line bg-white py-[88px]" aria-label="Testimonial">
      <Reveal stagger className="container-x flex max-w-[760px] flex-col items-center text-center">
        <span className="font-serif text-6xl leading-none text-sage-mid opacity-45" aria-hidden="true">
          “
        </span>
        <blockquote className="mt-2">
          <p className="text-[clamp(1.25rem,2.2vw,1.5rem)] font-normal leading-normal">
            {TESTIMONIAL.quote}
          </p>
        </blockquote>
        <Image
          src={TESTIMONIAL.photo}
          alt={TESTIMONIAL.name}
          width={64}
          height={64}
          className="mt-8 h-16 w-16 rounded-full object-cover"
        />
        <p className="mt-3.5 font-semibold">{TESTIMONIAL.name}</p>
        <p className="text-sm text-body">{TESTIMONIAL.role}</p>
      </Reveal>
    </section>
  );
}
