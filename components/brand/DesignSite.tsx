import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  ScanFace,
  Fingerprint,
  CalendarDays,
  Plus,
  FlaskConical,
  Sparkles,
} from "lucide-react";
import { BrandNav, ProductPreview } from "./Experience";
import { APP_URL, BRAND_FAQ } from "@/lib/brand";
import type { Direction } from "@/lib/directions";
import "@/app/brand.css";
import "./design-site.css";

function Photo({
  editorial = false,
  priority = false,
}: {
  editorial?: boolean;
  priority?: boolean;
}) {
  return (
    <figure className="design-photo hero-photograph">
      <Image
        src={editorial ? "/images/taiuo-editorial.jpg" : "/images/taiuo-daylight.jpg"}
        alt={
          editorial
            ? "An editorial portrait in afternoon sunlight"
            : "A woman looking over her shoulder in natural sunlight"
        }
        fill
        sizes="(max-width: 760px) 100vw, 55vw"
        preload={priority}
        className="design-portrait"
      />
    </figure>
  );
}
function Action({ text = "Discover my skin" }: { text?: string }) {
  return (
    <a className="design-action" href={`${APP_URL}/scan`}>
      {text}
      <ArrowUpRight size={19} aria-hidden="true" />
    </a>
  );
}
function Intro({ d }: { d: Direction }) {
  return (
    <div className="design-intro">
      <p className="design-kicker">INTELLIGENT BEAUTY. REAL YOU.</p>
      <h1>
        {d.title[0]}
        <br />
        <em>{d.title[1]}</em>
      </h1>
      <p className="design-deck">
        Your skin, decoded. Your routine, considered.
        <br />
        Your kind of beauty, all in one place.
      </p>
      <Action />
      <p className="design-fine">First scan free · No sign-up needed · 18+</p>
    </div>
  );
}
function SkinCard() {
  return (
    <div className="skin-object">
      <div className="object-top">
        <span>TAIUO</span>
        <span>ILLUSTRATIVE PREVIEW</span>
      </div>
      <p className="design-kicker">YOUR PERSONAL SKIN JOURNAL</p>
      <h2>
        A little more
        <br />
        <em>clarity.</em>
      </h2>
      <div className="object-ring">
        <ScanFace size={56} strokeWidth={0.8} aria-hidden="true" />
      </div>
      <div className="object-lines">
        <div>
          <span>01</span>
          <strong>Your skin read</strong>
          <ArrowUpRight size={16} />
        </div>
        <div>
          <span>02</span>
          <strong>Your product picks</strong>
          <ArrowUpRight size={16} />
        </div>
        <div>
          <span>03</span>
          <strong>Your daily routine</strong>
          <ArrowUpRight size={16} />
        </div>
      </div>
      <p className="object-note">Your story starts with a selfie.</p>
    </div>
  );
}
function Hero({ d }: { d: Direction }) {
  const intro = <Intro d={d} />;
  const photo = <Photo priority />;
  switch (d.id) {
    case "02":
      return (
        <section className="design-hero campaign-hero">
          {photo}
          {intro}
          <span className="campaign-index">TAIUO / THE PERSONAL EDIT</span>
        </section>
      );
    case "03":
      return (
        <section className="design-hero lab-hero">
          {intro}
          <div className="lab-stage">
            <SkinCard />
            <span className="lab-coordinate">SKIN → INSIGHT → RITUAL</span>
          </div>
        </section>
      );
    case "04":
      return (
        <section className="design-hero edit-hero">
          <div className="edit-volume">
            THE PERSONAL EDIT / VOL. 01<span>A NEW PERSPECTIVE ON SKIN</span>
          </div>
          {intro}
          {photo}
          <div className="edit-aside">
            <span>01 / THE APPROACH</span>
            <p>
              Before another product.
              <br />A little understanding.
            </p>
            <a href="#how">
              Read the story <ArrowRight size={17} />
            </a>
          </div>
        </section>
      );
    case "05":
      return (
        <section className="design-hero soft-hero">
          {intro}
          {photo}
          <span className="soft-note">
            Made for your skin.
            <br />
            And no one else’s.
          </span>
        </section>
      );
    case "06":
      return (
        <section className="design-hero night-hero">
          {intro}
          {photo}
          <span className="night-word" aria-hidden="true">
            TAIUO
          </span>
        </section>
      );
    case "07":
      return (
        <section className="design-hero daylight-hero">
          {photo}
          {intro}
          <span className="daylight-label">A FRESH PERSPECTIVE / EVERY DAY</span>
        </section>
      );
    case "08":
      return (
        <section className="design-hero neue-hero">
          {intro}
          {photo}
          <div className="neue-cells">
            <span>
              01
              <br />
              <b>SCAN</b>
            </span>
            <span>
              02
              <br />
              <b>UNDERSTAND</b>
            </span>
            <span>
              03
              <br />
              <b>CARE</b>
            </span>
          </div>
        </section>
      );
    case "09":
      return (
        <section className="design-hero gallery-hero">
          {intro}
          <div className="gallery-pair">
            {photo}
            <Photo editorial />
          </div>
          <span className="gallery-note">THE ART OF PAYING ATTENTION.</span>
        </section>
      );
    case "10":
      return (
        <section className="design-hero club-hero">
          {intro}
          {photo}
          <div className="club-stamp">
            YOUR SKIN.
            <br />
            YOUR KIND
            <br />
            OF CARE.
            <ArrowUpRight size={30} />
          </div>
        </section>
      );
    case "11":
      return (
        <section className="design-hero precision-hero">
          <span className="precision-number" aria-hidden="true">
            01—
          </span>
          {intro}
          <SkinCard />
          <div className="precision-bottom">
            <span>PERSONAL INSIGHTS</span>
            <span>CONSIDERED ROUTINES</span>
            <span>EVERYDAY PROGRESS</span>
          </div>
        </section>
      );
    case "12":
      return (
        <section className="design-hero signature-hero">
          <div className="signature-masthead" aria-hidden="true">
            TAIUO<span>✳</span>
          </div>
          <div className="signature-grid">
            {intro}
            {photo}
            <div className="signature-side">
              <span>
                THE PERSONAL
                <br />
                SKIN EDIT.
              </span>
              <a href="#experience" aria-label="Explore the Taiuo experience">
                <ArrowUpRight size={30} strokeWidth={1} />
              </a>
              <p>
                Less noise.
                <br />
                More knowing.
              </p>
            </div>
          </div>
          <div className="signature-caption">
            <span>BEAUTY IS PERSONAL. YOUR ROUTINE SHOULD BE TOO.</span>
            <span>SCROLL TO GET CLOSER ↓</span>
          </div>
        </section>
      );
    default:
      return (
        <section className="design-hero studio-hero">
          {intro}
          {photo}
          <div className="studio-caption">
            <span>SKIN INTELLIGENCE, WITH A HUMAN TOUCH.</span>
            <span>01 — YOU, FIRST.</span>
          </div>
        </section>
      );
  }
}

export function DesignSite({ direction }: { direction: Direction }) {
  return (
    <div className={`brand-site design-site direction-${direction.id}`}>
      <a className="brand-skip" href="#main">
        Skip to content
      </a>
      <BrandNav />
      <main id="main">
        <Hero d={direction} />
        <div className="design-ticker" aria-label="The Taiuo approach">
          <span>YOUR SKIN, IN FOCUS</span>
          <Plus size={20} strokeWidth={1} aria-hidden="true" />
          <span>YOUR PRODUCTS, WITH PURPOSE</span>
          <Plus size={20} strokeWidth={1} aria-hidden="true" />
          <span>YOUR OWN SIGNATURE SCENT</span>
        </div>
        <section id="how" className="design-how design-section">
          <div className="section-heading">
            <p className="design-kicker">01 / A DIFFERENT STARTING POINT</p>
            <h2>
              Your next step
              <br />
              starts with <em>you.</em>
            </h2>
            <p>
              Before another trending ingredient or impulse buy, get to know what your own skin is
              telling you.
            </p>
          </div>
          <div className="design-steps">
            {[
              {
                n: "01",
                title: "See your skin.",
                copy: "Start with a guided selfie. Get a personal read of what your photo shows, with context for what to pay attention to.",
                Icon: ScanFace,
              },
              {
                n: "02",
                title: "Choose with purpose.",
                copy: "Explore skincare product recommendations informed by your scan and concerns. Bring your picks into a considered daily routine.",
                Icon: Fingerprint,
              },
              {
                n: "03",
                title: "Notice the change.",
                copy: "Keep your scans together. Return in similar light. Get a clearer picture of your skin over time.",
                Icon: CalendarDays,
              },
            ].map(({ n, title, copy, Icon }) => (
              <article key={n}>
                <div className="step-index">
                  <span>{n}</span>
                  <Icon size={30} strokeWidth={1} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="experience" className="design-experience design-section">
          <ProductPreview />
        </section>
        <section id="discovery" className="design-discovery design-section">
          <div className="section-heading">
            <p className="design-kicker">02 / DISCOVERY, MADE PERSONAL</p>
            <h2>
              Good choices.
              <br />
              <em>Your kind of good.</em>
            </h2>
            <p>From what goes on your skin to the scent you make your own.</p>
          </div>
          <div className="discovery-grid">
            <article className="discovery-skin">
              <div className="discovery-icon">
                <FlaskConical size={48} strokeWidth={0.9} />
              </div>
              <p className="design-kicker">SKINCARE / INFORMED BY YOUR SCAN</p>
              <h3>
                A shelf that
                <br />
                makes sense.
              </h3>
              <p>
                Explore product picks matched to your skin insights and concerns. Understand the
                recommendation, then decide what belongs in your routine.
              </p>
              <a className="design-text-link" href={`${APP_URL}/products`}>
                Explore skincare <ArrowUpRight size={19} />
              </a>
              <div className="discovery-tags">
                <span>YOUR CONCERNS</span>
                <span>YOUR ROUTINE</span>
                <span>YOUR CHOICE</span>
              </div>
            </article>
            <article className="discovery-scent">
              <div className="discovery-icon">
                <Sparkles size={48} strokeWidth={0.9} />
              </div>
              <p className="design-kicker">FRAGRANCE / LED BY YOUR TASTE</p>
              <h3>
                Find your
                <br />
                signature.
              </h3>
              <p>
                Discover fragrances around the notes you love, the occasion and your budget. Build a
                scent wardrobe that feels unmistakably yours.
              </p>
              <a className="design-text-link" href={`${APP_URL}/fragrance`}>
                Explore fragrance <ArrowUpRight size={19} />
              </a>
              <div className="discovery-tags">
                <span>NOTES</span>
                <span>OCCASION</span>
                <span>BUDGET</span>
              </div>
              <p className="discovery-footnote">
                Catalog availability applies. Aesthetic scent suggestions after a scan are styling
                inspiration; scent preferences come from you.
              </p>
            </article>
          </div>
        </section>
        <section id="philosophy" className="design-philosophy design-section">
          <Photo editorial />
          <div>
            <p className="design-kicker">03 / A MORE PERSONAL PHILOSOPHY</p>
            <h2>
              You don’t need
              <br />a different face.
              <br />
              <em>A fresh perspective.</em>
            </h2>
            <p>
              Real skin has texture. It changes with your days, your habits and your environment.
              Taiuo helps you pay attention to your own story.
            </p>
            <p>
              Your skin read is a starting point for everyday care. Never a beauty standard to
              measure yourself against.
            </p>
            <a className="design-text-link" href={`${APP_URL}/scan`}>
              Get to know your skin <ArrowUpRight size={20} />
            </a>
          </div>
        </section>
        <section id="intelligence" className="design-intelligence design-section">
          <div className="section-heading">
            <p className="design-kicker">04 / THE INTELLIGENCE BEHIND YOUR READ</p>
            <h2>
              Considered insights.
              <br />
              <em>Honest limits.</em>
            </h2>
            <p>
              A useful model should know when a photo isn’t enough. Here’s what sits behind your
              skin read.
            </p>
          </div>
          <div className="intelligence-grid">
            <article>
              <span>01 / CAPTURE</span>
              <h3>A better starting image.</h3>
              <p>
                Capture checks assess factors such as blur, exposure and framing. Good light and a
                clear view make the read more useful.
              </p>
            </article>
            <article>
              <span>02 / CONFIDENCE</span>
              <h3>Context over certainty.</h3>
              <p>
                Photo-based insights are estimates. Lighting, camera quality and products on your
                skin can change what a scan sees.
              </p>
            </article>
            <article>
              <span>03 / VALIDATION</span>
              <h3>Evidence before a claim.</h3>
              <p>
                We evaluate individual parts of the pipeline. A component benchmark is not a
                clinical accuracy score for the whole app.
              </p>
            </article>
          </div>
          <details className="evidence-details">
            <summary>
              Read the model evaluation notes <Plus size={19} />
            </summary>
            <div>
              <h3>What has been measured</h3>
              <p>
                The repository documents an internal capture-gate evaluation dated 12 August 2026:
                250 test images derived from 25 synthetic faces. The baseline classified acceptable
                versus degraded captures with 94.8% accuracy (baseline, before the fixes described
                in that report). This test assessed image capture quality, not skin-condition
                detection or product effectiveness. It identified false accepts and false rejects
                and does not establish fairness across skin tones.
              </p>
              <h3>What that does not establish</h3>
              <p>
                We do not publish an overall skin-analysis accuracy percentage. Expert-labeled
                clinical validation is not established by these component tests. Skin Lab’s
                expert-label release gate remains unmet in the documented implementation.
              </p>
              <a
                href="https://github.com/ramshaileshshah-maker/taiuo/blob/main/docs/research/eval-set-2026-08.md"
                target="_blank"
                rel="noreferrer"
              >
                Read the dated evaluation report ↗
              </a>
              <a
                href="https://github.com/ramshaileshshah-maker/taiuo/blob/main/docs/evaluation/README.md"
                target="_blank"
                rel="noreferrer"
              >
                Read the release criteria ↗
              </a>
            </div>
          </details>
        </section>
        <section id="faq" className="design-faq design-section">
          <div>
            <p className="design-kicker">05 / GOOD QUESTIONS</p>
            <h2>
              A little clarity.
              <br />
              <em>Before you begin.</em>
            </h2>
          </div>
          <div className="faq-list">
            {BRAND_FAQ.map((item, i) => (
              <details key={item.q} name="taiuo-questions">
                <summary>
                  <span className="faq-number">0{i + 1}</span>
                  {item.q}
                  <span className="faq-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="design-close">
          <p className="design-kicker">YOUR SKIN. YOUR STARTING POINT.</p>
          <h2>
            Make it
            <br />
            <em>personal.</em>
          </h2>
          <Action />
          <p>First scan free. No sign-up needed. 18+</p>
        </section>
      </main>
      <footer className="design-footer">
        <a className="footer-mark" href="#main">
          TAIUO
        </a>
        <span>Intelligent beauty. Real you.</span>
        <nav aria-label="Legal">
          <a href={`${APP_URL}/privacy`}>Privacy</a>
          <a href={`${APP_URL}/terms`}>Terms</a>
          <a href={`${APP_URL}/login`}>
            Sign in <ArrowUpRight size={14} />
          </a>
        </nav>
        <details className="design-credits">
          <summary>Image credits</summary>
          <p>
            Portrait:{" "}
            <a href="https://www.pexels.com/photo/sunlight-on-back-of-model-4970822/">
              Anna Shvets / Pexels
            </a>
            . Editorial photograph:{" "}
            <a href="https://www.pexels.com/photo/portrait-of-brunette-in-sunlight-12706800/">
              Zero Pamungkas / Pexels
            </a>
            . Photographs are illustrative, not customer results or endorsements.
          </p>
        </details>
        <p className="design-legal">
          © {new Date().getFullYear()} Taiuo. Lifestyle insights, not a medical diagnosis.
        </p>
      </footer>
    </div>
  );
}
