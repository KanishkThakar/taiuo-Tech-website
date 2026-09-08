"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, Menu, X, ScanFace, Sun, Moon, Check } from "lucide-react";
import { APP_URL } from "@/lib/brand";

export function BrandNav() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth > 760) setOpen(false);
    };
    document.addEventListener("keydown", key);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("keydown", key);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  const items = [
    ["The approach", "#how"],
    ["The experience", "#experience"],
    ["Our philosophy", "#philosophy"],
  ];
  return (
    <header className="brand-header">
      <div className="brand-nav brand-wrap">
        <a href="#main" className="brand-wordmark" aria-label="Taiuo home">
          TAIUO
        </a>
        <nav className="desktop-nav" aria-label="Primary">
          {items.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <a className="nav-signin" href={`${APP_URL}/login`}>
            Sign in
          </a>
          <a className="nav-cta" href={`${APP_URL}/scan`}>
            Get to know your skin <ArrowUpRight size={15} />
          </a>
          <button
            ref={toggle}
            className="mobile-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="brand-mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="brand-mobile-nav" className="mobile-brand-nav" aria-label="Mobile">
          {[
            ...items,
            ["Questions", "#faq"],
            ["Sign in", `${APP_URL}/login`],
            ["Discover my skin", `${APP_URL}/scan`],
          ].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

const previews = [
  {
    name: "Your skin read",
    title: "A clearer read.",
    subtitle: "A more considered next step.",
    body: "See the details a mirror can’t put into words. Explore image-based insights into your skin, with context to help you decide what to focus on.",
  },
  {
    name: "Your daily ritual",
    title: "Less overwhelm.",
    subtitle: "More everyday care.",
    body: "Bring your recommendations into a morning and evening routine. A few considered steps, in one place, ready when you are.",
  },
  {
    name: "Your progress",
    title: "Notice the little things.",
    subtitle: "They’re part of your story.",
    body: "Keep your scans together and compare your check-ins. Build a picture of your skin over time, with similar lighting for a fairer comparison.",
  },
] as const;

export function ProductPreview() {
  const [active, setActive] = useState(0);
  const [evening, setEvening] = useState(false);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const preview = previews[active] ?? previews[0];
  return (
    <div className="product-experience">
      <div className="experience-copy">
        <p className="brand-eyebrow">THE TAIUO EXPERIENCE</p>
        <h2>
          Get closer to
          <br />
          <em>your own skin.</em>
        </h2>
        <div className="experience-tabs" role="tablist" aria-label="Explore Taiuo">
          {previews.map((p, i) => (
            <button
              key={p.name}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`experience-tab-${i}`}
              role="tab"
              aria-selected={active === i}
              aria-controls="experience-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                let next = i;
                if (e.key === "ArrowRight") next = (i + 1) % 3;
                else if (e.key === "ArrowLeft") next = (i + 2) % 3;
                else if (e.key === "Home") next = 0;
                else if (e.key === "End") next = 2;
                else return;
                e.preventDefault();
                setActive(next);
                refs.current[next]?.focus();
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className="experience-description" aria-live="polite">
          <h3>
            {preview.title}
            <br />
            {preview.subtitle}
          </h3>
          <p className="brand-body">{preview.body}</p>
        </div>
        <a className="brand-text-link" href={`${APP_URL}/scan`}>
          Experience Taiuo <ArrowUpRight size={17} />
        </a>
      </div>
      <div className="preview-stage">
        <div
          className="preview-sheet"
          id="experience-panel"
          role="tabpanel"
          aria-labelledby={`experience-tab-${active}`}
          tabIndex={0}
        >
          <div className="preview-header">
            <span className="preview-wordmark">TAIUO</span>
            <span className="sample-label">ILLUSTRATIVE PREVIEW</span>
          </div>
          {active === 0 && (
            <div className="preview-view">
              <p className="brand-eyebrow">YOUR SKIN, A LITTLE CLEARER</p>
              <h3>A moment of clarity.</h3>
              <div className="sample-score">
                <span className="score-value">
                  72<small>/ 100</small>
                </span>
                <span>Sample skin score</span>
                <div className="sample-score-rule" />
              </div>
              <div className="sample-metrics">
                {[
                  ["Texture", "78"],
                  ["Tone evenness", "71"],
                  ["Visible redness", "67"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <span className="metric-track">
                      <span style={{ width: `${value}%` }} />
                    </span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
              <div className="preview-note">
                <ScanFace size={18} />
                <p>
                  Your read starts a conversation.
                  <br />
                  Your routine is the next chapter.
                </p>
              </div>
            </div>
          )}
          {active === 1 && (
            <div className="preview-view">
              <p className="brand-eyebrow">SMALL STEPS. YOUR OWN RHYTHM.</p>
              <h3>Your daily ritual.</h3>
              <div className="routine-toggle" aria-label="Routine time">
                <button aria-pressed={!evening} onClick={() => setEvening(false)}>
                  <Sun size={15} /> Morning
                </button>
                <button aria-pressed={evening} onClick={() => setEvening(true)}>
                  <Moon size={15} /> Evening
                </button>
              </div>
              <div className="routine-list">
                {(evening
                  ? [
                      ["01", "Cleanse", "A fresh finish to your day"],
                      ["02", "Moisturise", "Your evening care step"],
                    ]
                  : [
                      ["01", "Cleanse", "Begin with a clean slate"],
                      ["02", "Moisturise", "A moment of everyday care"],
                      ["03", "Protect", "Complete your morning ritual"],
                    ]
                ).map(([n, title, note]) => (
                  <div key={n}>
                    <span>{n}</span>
                    <div>
                      <h4>{title}</h4>
                      <p>{note}</p>
                    </div>
                    <Check size={16} />
                  </div>
                ))}
              </div>
              <p className="sample-disclaimer">
                Example routine for illustration. Your steps depend on your own read.
              </p>
            </div>
          )}
          {active === 2 && (
            <div className="preview-view">
              <p className="brand-eyebrow">A RECORD OF YOUR EVERYDAY</p>
              <h3>Your skin journal.</h3>
              <div className="journal-summary">
                <span>3</span>
                <p>
                  sample check-ins
                  <br />
                  <strong>One personal story.</strong>
                </p>
              </div>
              <div className="journal-list">
                {[
                  ["Week 01", "Your starting point", "68"],
                  ["Week 02", "Making room for routine", "70"],
                  ["Week 03", "A little time to reflect", "72"],
                ].map(([week, title, score]) => (
                  <div key={week}>
                    <span>{week}</span>
                    <h4>{title}</h4>
                    <strong>{score}</strong>
                  </div>
                ))}
              </div>
              <p className="sample-disclaimer">
                Illustrative data, not customer results. Scores can fluctuate; improvement is not
                guaranteed.
              </p>
            </div>
          )}
          <a className="preview-bottom-link" href={`${APP_URL}/scan`}>
            Start with your own skin <ArrowRight size={15} />
          </a>
        </div>
        <p className="preview-caption">
          A glimpse inside Taiuo. Sample data, not a live skin analysis.
        </p>
      </div>
    </div>
  );
}
