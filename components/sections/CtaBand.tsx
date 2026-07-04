import Reveal from "@/components/motion/Reveal";

/** 3.11 — CTA banner on the sage gradient. */
export default function CtaBand() {
  return (
    <section
      className="section-pad"
      style={{
        background: "linear-gradient(135deg, #A8B5B5 0%, #B8C5C5 50%, #C8D4D4 100%)",
      }}
    >
      <Reveal stagger className="container-x text-center">
        <h2 className="h2-display">
          Get your personalized <span className="font-light text-ink/55">Taiuo plan</span>
        </h2>
        <p className="mx-auto mt-[18px] max-w-[520px] text-[1.06rem] text-ink/70">
          Understand your facial features and take action today with a personalized plan designed
          for your unique facial structure.
        </p>
        <div className="mt-10">
          <a href="#pricing" className="btn btn-dark px-10 py-[17px] text-[17px] hover:scale-[1.03]">
            Start my plan
          </a>
        </div>
      </Reveal>
    </section>
  );
}
