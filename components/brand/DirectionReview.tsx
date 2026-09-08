"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Monitor, Smartphone } from "lucide-react";
import { directions } from "@/lib/directions";
import "./direction-review.css";

export function DirectionReview() {
  const stage = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ width: 1100, height: 700 });
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setBounds({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const [selected, setSelected] = useState(2);
  const [mobile, setMobile] = useState(false);
  const frameWidth = mobile ? 390 : 1440;
  const scale = Math.min(1, Math.max(0.1, bounds.width / frameWidth));
  const active = directions[selected] ?? directions[2];
  return (
    <main className="direction-review">
      <aside className="review-sidebar">
        <Link href="/" className="review-wordmark">
          taiuo.
        </Link>
        <h1>Find the feeling.</h1>
        <p>
          Twelve directions. One Taiuo.
          <br />
          Explore the whole page in each.
        </p>
        <nav aria-label="Design directions">
          {directions.map((d, i) => (
            <button key={d.id} onClick={() => setSelected(i)} aria-pressed={i === selected}>
              <span className="review-swatch" style={{ background: d.color }} />
              <span>
                <small>{d.id}</small>
                <strong>{d.name}</strong>
              </span>
              <ArrowUpRight size={14} />
            </button>
          ))}
        </nav>
        <p className="review-foot">
          Design explorations · Desktop + mobile
          <br />
          Product details and evidence notes included.
        </p>
      </aside>
      <div className="review-main">
        <header className="review-toolbar">
          <div>
            <span className="review-number">{active.id} / 12</span>
            <strong>{active.name}</strong>
          </div>
          <div className="review-devices" aria-label="Preview size">
            <button
              aria-label="Desktop preview"
              aria-pressed={!mobile}
              onClick={() => setMobile(false)}
            >
              <Monitor size={17} />
            </button>
            <button
              aria-label="Mobile preview"
              aria-pressed={mobile}
              onClick={() => setMobile(true)}
            >
              <Smartphone size={17} />
            </button>
          </div>
          <div className="review-arrows">
            <button
              aria-label="Previous direction"
              onClick={() => setSelected((selected + 11) % 12)}
            >
              <ArrowLeft size={17} />
            </button>
            <button aria-label="Next direction" onClick={() => setSelected((selected + 1) % 12)}>
              <ArrowRight size={17} />
            </button>
          </div>
          <a href={`/directions/${active.id}`} target="_blank" rel="noreferrer">
            Open full page <ArrowUpRight size={14} />
          </a>
        </header>
        <div className="review-caption">
          <p>{active.mood}</p>
          <span>Scroll inside the preview to see every section ↓</span>
        </div>
        <div ref={stage} className={`review-stage ${mobile ? "review-mobile" : ""}`}>
          <iframe
            style={{
              width: frameWidth,
              height: Math.max(300, bounds.height) / scale,
              transform: `translateX(-50%) scale(${scale})`,
            }}
            key={`${active.id}-${mobile}`}
            src={`/directions/${active.id}`}
            title={`${active.id} — ${active.name} website direction`}
          />
        </div>
      </div>
    </main>
  );
}
