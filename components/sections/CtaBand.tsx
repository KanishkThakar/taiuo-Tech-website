import Reveal from "@/components/motion/Reveal";
import TrackedLink from "@/components/motion/TrackedLink";

/** 3.11 — premium CTA: inset floating sage-gradient card on white. */
export default function CtaBand() {
  return (
    <section className="section-pad bg-white">
      <div className="container-x">
        <Reveal
          className="relative isolate overflow-hidden rounded-[32px] px-8 py-20 text-center shadow-[0_40px_100px_-45px_rgb(90_110_110/0.6)] max-md:rounded-3xl max-md:py-16"
          y={48}
        >
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: "linear-gradient(135deg, #A8B5B5 0%, #B8C5C5 50%, #C8D4D4 100%)",
            }}
            aria-hidden="true"
          />
          <div className="hero-radiance pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <div className="hero-grain pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

          <h2 className="h2-display">
            Get your personalized <span className="font-light text-ink/55">Taiuo plan</span>
          </h2>
          <p className="mx-auto mt-[18px] max-w-[520px] text-[1.06rem] text-ink/70">
            Understand your facial features and take action today with a personalized plan designed
            for your unique facial structure.
          </p>
          <div className="mt-10">
            <TrackedLink
              href="/onboarding"
              event={{ name: "cta_click", props: { location: "cta_band" } }}
              className="btn btn-dark px-10 py-[17px] text-[17px] hover:scale-[1.03]"
            >
              Start my plan
            </TrackedLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
