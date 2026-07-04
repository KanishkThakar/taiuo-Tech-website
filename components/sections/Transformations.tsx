import Reveal from "@/components/motion/Reveal";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import FaceIllustration from "@/components/visuals/FaceIllustration";
import { BENEFITS } from "@/lib/data";

/** 3.4 — Life-changing Transformations (illustrative before/after pairs). */
export default function Transformations() {
  return (
    <section className="section-pad bg-white" id="transform">
      <div className="container-x grid grid-cols-[1.1fr_1fr] items-center gap-16 max-lg:grid-cols-1 max-lg:gap-12">
        <Reveal stagger>
          <span className="badge-pill">New Approach</span>
          <h2 className="h2-display mt-5">
            Life-changing
            <br />
            <span className="h-light">Transformations</span>
          </h2>
          <p className="mt-5 max-w-[420px] text-body">
            Research consistently demonstrates the diverse, wide-ranging benefits of physical
            attractiveness.
          </p>
          <ol className="mt-10">
            {BENEFITS.map((b, i) => (
              <li key={b} className="flex items-baseline gap-[18px] border-b border-line py-3.5">
                <span className="min-w-[26px] text-xs font-medium text-faint">[{i + 1}]</span>
                {b}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="grid grid-cols-2 gap-5 max-lg:max-w-[640px] max-sm:grid-cols-1">
          <Reveal>
            <BeforeAfterSlider
              ariaLabel="Before and after comparison 1 — illustrative"
              before={<FaceIllustration variant="before" />}
              after={<FaceIllustration variant="after" />}
            />
          </Reveal>
          <Reveal delay={0.15}>
            <BeforeAfterSlider
              ariaLabel="Before and after comparison 2 — illustrative"
              before={<FaceIllustration variant="before" flip />}
              after={<FaceIllustration variant="after" flip />}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
