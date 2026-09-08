import Image from "next/image";
import { ArrowUpRight, ArrowRight, ScanFace, Fingerprint, CalendarDays } from "lucide-react";
import { BrandNav, ProductPreview } from "@/components/brand/Experience";
import { APP_URL, BRAND_FAQ } from "@/lib/brand";
import "./brand.css";

const steps = [
  {
    number: "01",
    icon: ScanFace,
    title: "Start with a selfie.",
    text: "A short, guided scan helps you see your skin with a little more clarity. Just you, your camera and good light.",
  },
  {
    number: "02",
    icon: Fingerprint,
    title: "Make it personal.",
    text: "Explore your skin read and build a routine around your concerns, your preferences and your everyday life.",
  },
  {
    number: "03",
    icon: CalendarDays,
    title: "Find your rhythm.",
    text: "Return to your routine. Check in with another scan. Keep a record of how your skin changes over time.",
  },
];

export default function Home() {
  return (
    <div className="brand-site">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Taiuo",
            description: "Personal skin insights, daily routines and progress tracking.",
          }),
        }}
      />
      <a className="brand-skip" href="#main">
        Skip to content
      </a>
      <BrandNav />
      <main id="main">
        <section className="brand-hero brand-wrap" aria-labelledby="hero-title">
          <div className="hero-story">
            <p className="brand-eyebrow">
              <span className="brand-dot" /> INTELLIGENT BEAUTY. REAL YOU.
            </p>
            <h1 id="hero-title">
              Less guesswork.
              <br />
              <em>More you.</em>
            </h1>
            <p className="hero-description">Your skin has a story. Get to know it.</p>
            <p className="brand-body hero-body">
              Turn a simple selfie into personal skin insights, a routine that fits, and a clearer
              picture of your progress.
            </p>
            <div className="hero-actions">
              <a className="brand-button" href={`${APP_URL}/scan`}>
                Discover my skin <ArrowUpRight size={18} />
              </a>
              <a className="brand-text-link" href="#how">
                How it works <ArrowRight size={16} />
              </a>
            </div>
            <p className="hero-note">
              Your first scan is free. No sign-up needed. <span>18+</span>
            </p>
            <div className="hero-signoff">
              <span className="signoff-line" />
              <span>
                MADE FOR YOUR SKIN.
                <br />
                AND THE LIFE YOU LIVE IN IT.
              </span>
            </div>
          </div>
          <figure className="hero-photograph">
            <Image
              src="/images/taiuo-ritual.jpg"
              alt="A woman enjoying her daily skincare ritual"
              fill
              sizes="(max-width: 760px) 100vw, 48vw"
              preload
              className="portrait-photo"
            />
            <div className="photo-caption">
              <span>THE EVERYDAY RITUAL</span>
              <span>01 / TAIUO</span>
            </div>
            <figcaption className="photo-quote">
              A little care.
              <br />
              <em>A little more you.</em>
            </figcaption>
          </figure>
        </section>
        <div className="brand-principles brand-wrap" aria-label="The Taiuo approach">
          <span>Personal by nature.</span>
          <span>Thoughtful by design.</span>
          <span>Part of your everyday.</span>
        </div>
        <section id="how" className="brand-section brand-wrap">
          <div className="section-intro">
            <p className="brand-eyebrow">A MORE PERSONAL APPROACH</p>
            <h2>
              Good skin days start
              <br />
              with <em>understanding.</em>
            </h2>
            <p className="brand-body">
              Beyond the trending ingredient. Before the next impulse buy.
              <br className="desktop-break" /> Make room for what your own skin is telling you.
            </p>
          </div>
          <div className="journey-grid">
            {steps.map(({ number, icon: Icon, title, text }) => (
              <article className="journey-step" key={number}>
                <div className="step-top">
                  <span>{number}</span>
                  <Icon size={23} strokeWidth={1.3} />
                </div>
                <h3>{title}</h3>
                <p className="brand-body">{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="experience" className="experience-section">
          <div className="brand-wrap">
            <ProductPreview />
          </div>
        </section>
        <section id="philosophy" className="philosophy brand-wrap brand-section">
          <figure className="ritual-photo">
            <Image
              src="/images/taiuo-portrait.jpg"
              alt="A woman gently applying face cream as part of her skincare routine"
              fill
              sizes="(max-width: 760px) 100vw, 45vw"
            />
            <figcaption>SMALL MOMENTS. PERSONAL RITUALS.</figcaption>
          </figure>
          <div className="philosophy-story">
            <p className="brand-eyebrow">OUR PHILOSOPHY</p>
            <h2>
              Care for the skin
              <br />
              <em>you’re in.</em>
            </h2>
            <p className="brand-body">
              Skincare can feel like an endless list of things to fix. We believe it should feel
              more like getting to know yourself.
            </p>
            <p className="brand-body">
              Taiuo gives you a place to begin, a routine to return to, and room to notice what
              changes. At your pace. On your terms.
            </p>
            <a className="brand-text-link" href={`${APP_URL}/scan`}>
              Start with yourself <ArrowUpRight size={17} />
            </a>
            <p className="philosophy-footnote">
              Personal insights for everyday care.
              <br />
              Never a measure of your worth.
            </p>
          </div>
        </section>
        <section id="faq" className="brand-faq brand-wrap brand-section">
          <div>
            <p className="brand-eyebrow">A LITTLE MORE CLARITY</p>
            <h2>
              Good questions.
              <br />
              <em>Honest answers.</em>
            </h2>
            <p className="brand-body">
              A few things to know before
              <br />
              you get to know your skin.
            </p>
          </div>
          <div className="faq-list">
            {BRAND_FAQ.map((item, i) => (
              <details key={item.q} name="taiuo-faq">
                <summary>
                  <span className="faq-number">0{i + 1}</span>
                  <span>{item.q}</span>
                  <span className="faq-plus" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="brand-invitation">
          <p className="brand-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
          <h2>
            Meet your skin.
            <br />
            <em>On its own terms.</em>
          </h2>
          <p>A little insight today. A more considered ritual tomorrow.</p>
          <a className="brand-button light-button" href={`${APP_URL}/scan`}>
            Discover my skin <ArrowUpRight size={18} />
          </a>
          <span className="invitation-note">FREE FIRST SCAN · NO SIGN-UP NEEDED · 18+</span>
        </section>
      </main>
      <footer className="brand-footer brand-wrap">
        <div className="footer-top">
          <a href="#main" className="brand-wordmark" aria-label="Taiuo home">
            TAIUO
          </a>
          <p>Intelligent beauty. Real you.</p>
          <a href={`${APP_URL}/login`} className="brand-text-link">
            Open Taiuo <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Taiuo</span>
          <p>Lifestyle insights only. Not a medical service.</p>
          <div>
            <a href={`${APP_URL}/privacy`}>Privacy</a>
            <a href={`${APP_URL}/terms`}>Terms</a>
            <a href="#photo-credits">Photography</a>
          </div>
        </div>
        <details id="photo-credits" className="photo-credits">
          <summary>Photography credits</summary>
          <p>
            Real stock photography by{" "}
            <a href="https://www.pexels.com/photo/woman-smiling-while-applying-cream-on-her-face-7520426/">
              Darina Belonogova
            </a>{" "}
            and{" "}
            <a href="https://www.pexels.com/photo/a-woman-applying-a-skin-care-product-on-her-face-6925490/">
              Mike Murray
            </a>
            , via Pexels. Models are used for illustration, not presented as Taiuo customers.
            Product previews use sample data.
          </p>
        </details>
      </footer>
    </div>
  );
}
