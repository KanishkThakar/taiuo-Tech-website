import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, ScanFace, Layers, CalendarDays, Plus } from "lucide-react";
import { BrandNav, ProductPreview } from "./Experience";
import { ModelEvidence } from "./ModelEvidence";
import { APP_URL, BRAND_FAQ } from "@/lib/brand";
import "@/app/brand.css";
import "./editorial-site.css";
import "./positioning.css";

function Action({
  children = "Start your skin analysis",
  href = "/scan",
}: {
  children?: React.ReactNode;
  href?: string;
}) {
  return (
    <Link className="editorial-button" href={`${APP_URL}${href}`}>
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}

function SkinPreview() {
  return (
    <figure
      className="skin-platform-preview"
      aria-label="Illustrative preview of skin capture, insights and scan history"
    >
      <div className="platform-preview-top">
        <span>TAIUO / SKIN INTELLIGENCE</span>
        <span className="platform-sample">Illustrative preview</span>
      </div>
      <div className="platform-capture">
        <div className="platform-portrait">
          <Image
            src="/images/editorial-woman.jpg"
            alt="Editorial portrait used to illustrate guided skin capture"
            fill
            preload
            sizes="(max-width: 760px) 45vw, 230px"
          />
          <div className="platform-frame" aria-hidden="true" />
          <span>
            <ScanFace size={14} aria-hidden="true" /> Guided capture
          </span>
        </div>
        <div className="platform-insights">
          <span className="platform-overline">01 / UNDERSTAND</span>
          <h2>
            Your skin,
            <br />
            <em>in context.</em>
          </h2>
          <p>Explore visible details</p>
          {["Texture", "Tone evenness", "Visible redness"].map((label) => (
            <div className="platform-signal" key={label}>
              <span>{label}</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
      <div className="platform-followthrough">
        <div>
          <Layers size={19} strokeWidth={1.5} aria-hidden="true" />
          <span className="platform-overline">02 / YOUR ROUTINE</span>
          <strong>Your everyday routine.</strong>
          <p>Morning & evening, in one place.</p>
        </div>
        <div>
          <CalendarDays size={19} strokeWidth={1.5} aria-hidden="true" />
          <span className="platform-overline">03 / YOUR PROGRESS</span>
          <strong>Your skin, over time.</strong>
          <p>Compare your saved check-ins.</p>
        </div>
      </div>
      <figcaption>Interface illustration. This portrait has not been analysed.</figcaption>
    </figure>
  );
}

export function EditorialSite({
  hero = "platform",
  review = false,
}: {
  hero?: "couple" | "platform";
  review?: boolean;
}) {
  return (
    <div className="brand-site editorial-site tech-positioning">
      <Link className="brand-skip" href="#main">
        Skip to content
      </Link>
      {review && (
        <nav className="homepage-review-bar" aria-label="Homepage design options">
          <span>Design review · {hero === "couple" ? "A / Editorial" : "B / Platform"}</span>
          <div>
            <Link href="/review/a" aria-current={hero === "couple" ? "page" : undefined}>
              Option A
            </Link>
            <Link href="/review/b" aria-current={hero === "platform" ? "page" : undefined}>
              Option B
            </Link>
          </div>
        </nav>
      )}
      <BrandNav />
      <main id="main">
        <section className={`editorial-hero tech-hero${hero === "couple" ? " couple-hero" : ""}`}>
          <div className="editorial-hero-copy">
            <p className="editorial-kicker">AI-POWERED BEAUTY TECHNOLOGY</p>
            <h1>
              Understand your skin.
              <br />
              <em>Make smarter beauty decisions.</em>
            </h1>
            <p className="editorial-deck">
              AI-powered skin insights, routine guidance and progress tracking. Get to know your
              skin, one scan at a time.
            </p>
            <div className="tech-hero-actions">
              <Action />
              <Link className="tech-secondary" href="#experience">
                See how Taiuo works <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <p className="editorial-fine">Free skin analysis · No sign-up needed · 18+</p>
          </div>
          {hero === "couple" ? (
            <figure className="editorial-hero-portrait">
              <Image
                src="/images/taiuo-couple-hero.png"
                alt="Taiuo campaign artwork of a woman and man in ivory linen, in warm window light"
                fill
                preload
                sizes="(max-width: 760px) 1100px, (max-width: 1100px) 1500px, 100vw"
              />
            </figure>
          ) : (
            <SkinPreview />
          )}
        </section>
        <section id="how" className="tech-journey editorial-wrap" aria-labelledby="journey-title">
          <div className="tech-section-heading">
            <p className="editorial-kicker">A CLEARER WAY TO CARE</p>
            <h2 id="journey-title">
              One scan is a starting point.
              <br />
              <em>Understanding grows over time.</em>
            </h2>
          </div>
          <ol className="tech-steps">
            {[
              ["Scan your skin", "Take a guided selfie with clear, even lighting."],
              [
                "Understand your insights",
                "Explore what your photo shows, with context and limits.",
              ],
              ["Make routine choices", "Use your insights to consider your everyday care."],
              ["Track changes", "Save your scans and compare check-ins under similar conditions."],
            ].map(([title, copy], i) => (
              <li key={title}>
                <span className="tech-step-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </section>
        <section id="experience" className="editorial-experience editorial-wrap">
          <ProductPreview />
        </section>
        <section id="philosophy" className="tech-purpose editorial-wrap">
          <div>
            <p className="editorial-kicker">UNDERSTANDING BEFORE ANOTHER PURCHASE</p>
            <h2>
              Your skin is the story.
              <br />
              <em>Your routine is part of it.</em>
            </h2>
          </div>
          <div>
            <p>
              Taiuo helps you understand your skin—not just choose your next product. Keep your
              insights, routine and check-ins connected, so each visit builds on the last.
            </p>
            <p>
              Start with what you already own. In the app, “Check your shelf” lets you submit
              product names or photos for a contextual review. Suggestions are a starting point, not
              a safety certification.
            </p>
            <Link className="tech-secondary" href={`${APP_URL}/products`}>
              Explore the shelf review <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>
        <ModelEvidence />
        <section
          id="discovery"
          className="tech-support editorial-wrap"
          aria-labelledby="support-title"
        >
          <div className="tech-section-heading">
            <p className="editorial-kicker">WHEN YOU WANT TO EXPLORE FURTHER</p>
            <h2 id="support-title">
              Recommendations.
              <br />
              <em>With your experience at the centre.</em>
            </h2>
            <p>Optional ways to explore your choices, alongside your skin insights.</p>
          </div>
          <div className="tech-support-grid">
            {[
              {
                title: "Skincare, with context",
                copy: "Explore catalog options informed by your scan and concerns. A recommendation is an option to consider, not a reason to replace everything you own.",
                image: "editorial-skincare",
                alt: "Editorial skincare still life",
                href: "/products",
                link: "Explore skincare options",
              },
              {
                title: "Fragrance, led by you",
                copy: "Discover scents around your stated taste, occasion and budget. A face scan cannot establish what a fragrance smells like to you.",
                image: "editorial-fragrance",
                alt: "Editorial fragrance still life",
                href: "/fragrance",
                link: "Explore fragrance preferences",
              },
            ].map((item) => (
              <article key={item.href}>
                <figure>
                  <Image
                    src={`/images/${item.image}.jpg`}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 760px) 120px, 180px"
                  />
                </figure>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <Link href={`${APP_URL}${item.href}`}>
                    {item.link}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="faq" className="editorial-faq editorial-wrap">
          <div>
            <p className="editorial-kicker">BEFORE YOU BEGIN</p>
            <h2>A little clarity.</h2>
          </div>
          <div className="faq-list">
            {BRAND_FAQ.map((item, i) => (
              <details key={item.q} name="taiuo-questions">
                <summary>
                  <span className="faq-number">{String(i + 1).padStart(2, "0")}</span>
                  {item.q}
                  <Plus size={17} aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
        <section className="editorial-close">
          <p className="editorial-kicker">YOUR SKIN. BETTER UNDERSTOOD.</p>
          <h2>
            Start with a scan.
            <br />
            <em>Come back with perspective.</em>
          </h2>
          <Action />
          <p className="editorial-fine">Free skin analysis · No sign-up needed · 18+</p>
        </section>
      </main>
      <footer className="editorial-footer editorial-wrap">
        <div>
          <Link className="editorial-logo" href="#main">
            TAIUO
          </Link>
          <p>
            Beauty technology for skin insights,
            <br />
            informed routines and progress over time.
          </p>
        </div>
        <nav aria-label="Explore">
          <span>THE PLATFORM</span>
          <Link href={`${APP_URL}/scan`}>Skin analysis</Link>
          <Link href={`${APP_URL}/plan`}>Your routine</Link>
          <Link href={`${APP_URL}/history`}>Your progress</Link>
          <Link href={`${APP_URL}/products`}>Your shelf</Link>
        </nav>
        <nav aria-label="About">
          <span>TAIUO</span>
          <Link href="#experience">How it works</Link>
          <Link href="#intelligence">Our science</Link>
          <Link href="#faq">Questions</Link>
          <Link href={`${APP_URL}/login`}>Sign in</Link>
          <Link href={`${APP_URL}/studio/signup`}>For brands</Link>
        </nav>
        <nav aria-label="Legal">
          <span>THE DETAILS</span>
          <Link href={`${APP_URL}/privacy`}>Privacy</Link>
          <Link href={`${APP_URL}/terms`}>Terms</Link>
          <Link href="/image-credits">Photography credits</Link>
          <Link href={`${APP_URL}/ad-library`}>Ad transparency</Link>
        </nav>
        <p className="editorial-colophon">
          © {new Date().getFullYear()} Taiuo. Image-based lifestyle insights, not a medical
          diagnosis. Previews are illustrative, not customer results. Products pictured are not a
          Taiuo product line.
        </p>
      </footer>
    </div>
  );
}
