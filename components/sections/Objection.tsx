import Image from "next/image";
import { Shield, Sparkles, Target, type LucideIcon } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { OBJECTION_CARDS } from "@/lib/data";

const ICONS: Record<(typeof OBJECTION_CARDS)[number]["icon"], LucideIcon> = {
  sparkles: Sparkles,
  target: Target,
  shield: Shield,
};

/** 3.15 — "Will analyzing my face make me insecure?" full-bleed + glass cards. */
export default function Objection() {
  return (
    <section className="section-pad relative isolate overflow-hidden text-white">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <Image
          src="/images/fullbleed-selfcare.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.72) 100%)",
          }}
        />
      </div>
      <div className="container-x">
        <Reveal stagger className="max-w-[620px]">
          <h2 className="h2-display text-white">
            Will analyzing my face
            <br />
            <span className="font-light text-white/60">Make me insecure?</span>
          </h2>
          <p className="mt-6 max-w-[520px] text-[1.05rem] text-white/80">
            Most insecurity comes from uncertainty, not knowing if your concerns are real or
            imagined. When you&apos;re guessing about your appearance, your mind often makes things
            seem worse than they are.
          </p>
        </Reveal>

        <Reveal stagger className="mt-16 grid grid-cols-3 gap-[22px] max-md:grid-cols-1">
          {OBJECTION_CARDS.map((c) => {
            const Icon = ICONS[c.icon];
            return (
              <div
                key={c.title}
                className="rounded-[20px] border border-white/15 bg-white/[0.08] p-8 backdrop-blur-xl transition-[background,transform] duration-300 ease-smooth hover:-translate-y-1 hover:bg-white/[0.12]"
              >
                <div className="grid h-[54px] w-[54px] place-items-center rounded-[15px] border border-white/[0.14] bg-white/10 text-white shadow-[0_0_24px_-6px_rgb(200_212_212/0.35)] ring-1 ring-white/5">
                  <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-[1.15rem] font-medium text-white">{c.title}</h3>
                <p className="mt-2.5 text-sm text-white/70">{c.desc}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
