import Reveal from "@/components/motion/Reveal";
import Thumb from "@/components/visuals/Thumbs";
import { LEARN_ITEMS } from "@/lib/data";

/** 3.10 — "You will learn.." list with SVG mini-visual thumbnails. */
export default function Learn() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-x">
        <Reveal stagger className="mx-auto mb-10 max-w-[640px] text-center">
          <span className="badge-pill">
            <span className="badge-dot" aria-hidden="true" />
            Informative
          </span>
          <h2 className="h2-display mt-5">
            You will <span className="h-light">learn..</span>
          </h2>
        </Reveal>

        <Reveal stagger className="mx-auto max-w-[760px]">
          {LEARN_ITEMS.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-6 border-b border-line py-[22px] last:border-b-0 max-md:gap-4"
            >
              <div className="h-20 w-20 flex-none overflow-hidden rounded-[14px] border border-line bg-white max-md:h-16 max-md:w-16">
                <Thumb kind={item.thumb} />
              </div>
              <div>
                <h3 className="text-[1.06rem] font-medium">{item.title}</h3>
                <p className="mt-1 text-sm text-body">{item.desc}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
