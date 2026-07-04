import {
  Eye,
  FileText,
  FlaskConical,
  RefreshCw,
  ScanFace,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import { FEATURES, type FeatureIconKey } from "@/lib/data";

const ICONS: Record<FeatureIconKey, LucideIcon> = {
  scan: ScanFace,
  eye: Eye,
  flask: FlaskConical,
  file: FileText,
  trend: TrendingUp,
  refresh: RefreshCw,
};

/** 3.8 — complete facial analysis feature grid. */
export default function Analysis() {
  return (
    <section className="section-pad bg-cream">
      <div className="container-x">
        <Reveal stagger className="mx-auto mb-14 max-w-[640px] text-center">
          <span className="badge-pill bg-[#ECEEEE]">Personalized Analysis</span>
          <h2 className="h2-display mt-5">
            Your complete <span className="h-light">facial analysis</span>
          </h2>
          <p className="mt-[18px] text-[1.06rem] text-body">
            Every face is unique. We assess more than 160 unique beauty markers to give you a
            precise understanding of your aesthetics.
          </p>
        </Reveal>

        <Reveal stagger className="grid grid-cols-3 gap-5 max-lg:grid-cols-2 max-md:grid-cols-1">
          {FEATURES.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <div
                key={f.title}
                className="rounded-2xl bg-white p-8 shadow-soft transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-deep"
              >
                <div className="grid h-12 w-12 place-items-center rounded-[13px] border border-sage-base/30 bg-sage-base/15 text-[#5F7070]">
                  <Icon className="h-[23px] w-[23px]" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-medium">{f.title}</h3>
                <p className="mt-2 text-sm text-body">{f.desc}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
