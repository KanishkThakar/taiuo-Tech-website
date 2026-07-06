import { Check } from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import TrackedLink from "@/components/motion/TrackedLink";
import { PRICE_FEATURES } from "@/lib/data";

/** 3.13 — dark pricing section. */
export default function Pricing() {
  return (
    <section className="section-pad bg-ink text-white" id="pricing">
      <div className="container-x">
        <Reveal stagger className="text-center">
          <h2 className="h2-display">
            What could cost you <s className="text-white/40">$10,000</s>{" "}
            <span className="text-white/40">is</span>{" "}
            <span className="text-[1.35em] font-bold">$150</span>
          </h2>
          <p className="mt-4 text-white/50">One analysis per year. No hidden fees.</p>
        </Reveal>

        <Reveal stagger className="mx-auto mt-12 max-w-[460px]">
          {PRICE_FEATURES.map((f) => (
            <div
              key={f}
              className="flex items-center gap-3.5 border-b border-white/10 py-[13px] text-[15.5px] text-white/90"
            >
              <Check
                className="h-5 w-5 flex-none text-green-400"
                strokeWidth={2}
                aria-hidden="true"
              />
              {f}
            </div>
          ))}
        </Reveal>

        <Reveal className="mx-auto mt-14 max-w-96">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.03] p-[38px_34px] text-center shadow-[0_30px_80px_-30px_rgb(0_0_0/0.7)]">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
              aria-hidden="true"
            />
            <p className="text-[13px] uppercase tracking-[0.1em] text-white/50">Taiuo Membership</p>
            <div className="mt-4 flex items-baseline justify-center gap-1.5">
              <span className="text-5xl font-bold leading-none">$150</span>
              <span className="text-lg text-white/50">/ year</span>
            </div>
            <p className="mt-2.5 text-sm text-white/50">No hidden fees. Cancel anytime.</p>
            <TrackedLink
              href="/onboarding"
              event={{ name: "cta_click", props: { location: "pricing" } }}
              className="btn btn-white mt-[26px] w-full hover:bg-white/90"
            >
              Get Access
            </TrackedLink>
            {/* ⟦NOTE⟧ soften to a true figure or "Join the waitlist" before launch */}
            <div className="mt-6 flex justify-center gap-3.5 text-xs text-white/60">
              <span>Trusted by 50,000+</span>
              <span>|</span>
              <span>Secure Payment</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
