import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  ScanFace,
  Fingerprint,
  Sparkles,
  CalendarDays,
  Plus,
} from "lucide-react";
import { BrandNav, ProductPreview } from "./Experience";
import { ModelEvidence } from "./ModelEvidence";
import { APP_URL, BRAND_FAQ } from "@/lib/brand";
import "@/app/brand.css";
import "./editorial-site.css";

function Photo({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 760px) 100vw, 35vw",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  return <Image src={`/images/${src}.jpg`} alt={alt} fill sizes={sizes} preload={priority} />;
}
function Action({
  children = "Discover my skin",
  href = "/scan",
}: {
  children?: React.ReactNode;
  href?: string;
}) {
  return (
    <a className="editorial-button" href={`${APP_URL}${href}`}>
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </a>
  );
}
const categories = [
  {
    name: "Skincare",
    note: "A shelf with purpose.",
    src: "editorial-skincare",
    href: "/products",
    alt: "Amber skincare bottle beside a sculptural vase",
  },
  {
    name: "Fragrance",
    note: "Something distinctly you.",
    src: "editorial-fragrance",
    href: "/fragrance",
    alt: "Glass perfume bottle in window light",
  },
  {
    name: "Your routine",
    note: "Small steps. Every day.",
    src: "editorial-ritual",
    href: "/plan",
    alt: "A serum dropper held above an open bottle",
  },
  {
    name: "Skin insights",
    note: "Get a little closer.",
    src: "editorial-woman",
    href: "/scan",
    alt: "A natural editorial portrait",
  },
];

export function EditorialSite() {
  return (
    <div className="brand-site editorial-site">
      <a className="brand-skip" href="#main">
        Skip to content
      </a>
      <BrandNav />
      <main id="main">
        <section className="editorial-hero">
          <div className="editorial-hero-copy">
            <p className="editorial-kicker">INTELLIGENCE, MADE PERSONAL.</p>
            <h1>
              Beauty begins
              <br />
              with <em>you.</em>
            </h1>
            <p className="editorial-deck">
              Your skin. Your scent. Your everyday.
              <br />A little understanding changes everything.
            </p>
            <Action />
            <p className="editorial-fine">First scan free · No sign-up needed · 18+</p>
          </div>
          <figure className="editorial-hero-portrait">
            <Image
              src="/images/taiuo-couple-hero.png"
              alt="Campaign artwork of a woman and man together in ivory linen, with warm window light"
              fill
              preload
              sizes="(max-width: 760px) 1100px, (max-width: 1100px) 1500px, 100vw"
            />
          </figure>
        </section>

        <div className="editorial-principles">
          {[
            [ScanFace, "START WITH YOUR SKIN", "A guided selfie scan"],
            [Fingerprint, "PERSONAL PRODUCT PICKS", "Informed by your concerns"],
            [Sparkles, "FIND YOUR SIGNATURE", "Fragrance led by your taste"],
            [CalendarDays, "MAKE SPACE FOR CARE", "A routine to return to"],
          ].map(([Icon, title, note]) => {
            const Mark = Icon as typeof ScanFace;
            return (
              <div key={String(title)}>
                <Mark size={25} strokeWidth={1} aria-hidden="true" />
                <p>
                  <strong>{String(title)}</strong>
                  <span>{String(note)}</span>
                </p>
              </div>
            );
          })}
        </div>

        <section id="discovery" className="editorial-discovery editorial-wrap">
          <div className="editorial-section-top">
            <div>
              <p className="editorial-kicker">THE PERSONAL EDIT</p>
              <h2>
                A world of care.
                <br className="mobile-break" /> All about you.
              </h2>
            </div>
            <a href={`${APP_URL}/products`}>
              EXPLORE TAIUO <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="editorial-categories">
            {categories.map((c) => (
              <a key={c.name} href={`${APP_URL}${c.href}`} className="editorial-category">
                <figure>
                  <Photo src={c.src} alt={c.alt} sizes="(max-width: 760px) 48vw, 25vw" />
                </figure>
                <div>
                  <h3>{c.name}</h3>
                  <p>{c.note}</p>
                  <span aria-hidden="true">
                    <ArrowUpRight size={16} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="experience" className="editorial-experience editorial-wrap">
          <ProductPreview />
        </section>

        <section id="how" className="editorial-how editorial-wrap">
          <div>
            <p className="editorial-kicker">A MORE PERSONAL APPROACH</p>
            <h2>
              From a little insight.
              <br />
              To an everyday ritual.
            </h2>
          </div>
          <div className="editorial-steps">
            {[
              [
                "01",
                "Start with a selfie.",
                "Follow a guided scan in natural light. Explore what your photo shows, with context for your next step.",
              ],
              [
                "02",
                "Find what fits.",
                "Discover skincare recommendations informed by your scan and concerns. Choose what belongs in your routine.",
              ],
              [
                "03",
                "Come back to yourself.",
                "Keep your reads together. Check in under similar conditions and make room for consistent care.",
              ],
            ].map(([n, title, copy]) => (
              <article key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="editorial-stories editorial-wrap">
          <article className="editorial-story discovery-skin">
            <figure>
              <Photo src="editorial-skincare" alt="Amber skincare bottle and ceramic still-life" />
            </figure>
            <div>
              <p className="editorial-kicker">SKINCARE / INFORMED BY YOUR SCAN</p>
              <h2>
                A shelf that
                <br />
                makes sense.
              </h2>
              <p>
                Relevant products. A reason behind each pick. A routine built around your skin
                insights and concerns.
              </p>
              <a href={`${APP_URL}/products`}>
                Explore skincare <ArrowRight size={17} />
              </a>
            </div>
          </article>
          <article className="editorial-story discovery-scent">
            <figure>
              <Photo src="editorial-fragrance" alt="Perfume bottle catching the afternoon light" />
            </figure>
            <div>
              <p className="editorial-kicker">FRAGRANCE / LED BY YOUR TASTE</p>
              <h2>
                Find your
                <br />
                <em>signature.</em>
              </h2>
              <p>
                The notes you love. The mood you want. Discover fragrance around your taste,
                occasion and budget.
              </p>
              <a href={`${APP_URL}/fragrance`}>
                Explore fragrance <ArrowRight size={17} />
              </a>
              <small>
                Catalog availability applies. Scan-based scent suggestions offer styling
                inspiration; scent preferences come from you.
              </small>
            </div>
          </article>
        </section>

        <section id="philosophy" className="editorial-philosophy editorial-wrap">
          <figure>
            <Photo
              src="editorial-woman"
              alt="A woman in a softly lit editorial portrait"
              sizes="(max-width: 760px) 100vw, 50vw"
            />
          </figure>
          <div>
            <p className="editorial-kicker">BEAUTY IS PERSONAL</p>
            <h2>
              For your skin.
              <br />
              For your rhythm.
              <br />
              <em>For you.</em>
            </h2>
            <p>
              Real skin has texture. It changes with your days, your habits and your environment.
              Your skin read is a starting point for care, never a beauty standard to measure
              yourself against.
            </p>
            <Action>Begin your personal edit</Action>
          </div>
        </section>

        <ModelEvidence />

        <section id="faq" className="editorial-faq editorial-wrap">
          <div>
            <p className="editorial-kicker">BEFORE YOU BEGIN</p>
            <h2>A little clarity.</h2>
          </div>
          <div className="faq-list">
            {BRAND_FAQ.map((item, i) => (
              <details key={item.q} name="taiuo-questions">
                <summary>
                  <span className="faq-number">0{i + 1}</span>
                  {item.q}
                  <Plus size={17} aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="editorial-close">
          <p className="editorial-kicker">INTELLIGENT BEAUTY. REAL YOU.</p>
          <h2>
            Your next chapter
            <br />
            starts with <em>you.</em>
          </h2>
          <Action />
          <p className="editorial-fine">First scan free · No sign-up needed · 18+</p>
        </section>
      </main>
      <footer className="editorial-footer editorial-wrap">
        <div>
          <a className="editorial-logo" href="#main">
            TAIUO
          </a>
          <p>
            Intelligent beauty.
            <br />
            Real you.
          </p>
        </div>
        <nav aria-label="Explore">
          <span>EXPLORE</span>
          <a href={`${APP_URL}/scan`}>Your skin read</a>
          <a href={`${APP_URL}/products`}>Skincare</a>
          <a href={`${APP_URL}/fragrance`}>Fragrance</a>
          <a href={`${APP_URL}/plan`}>Your routine</a>
        </nav>
        <nav aria-label="About">
          <span>TAIUO</span>
          <a href="#how">The approach</a>
          <a href="#intelligence">Our intelligence</a>
          <a href="#faq">Questions</a>
          <a href={`${APP_URL}/login`}>Sign in</a>
        </nav>
        <nav aria-label="Legal">
          <span>THE DETAILS</span>
          <a href={`${APP_URL}/privacy`}>Privacy</a>
          <a href={`${APP_URL}/terms`}>Terms</a>
          <a href="/image-credits">Photography credits</a>
        </nav>
        <p className="editorial-colophon">
          © {new Date().getFullYear()} Taiuo. Lifestyle insights, not a medical diagnosis. Editorial
          imagery is illustrative; products shown are not a Taiuo product line.
        </p>
      </footer>
    </div>
  );
}
