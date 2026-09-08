import { Plus } from "lucide-react";
export function ModelEvidence() {
  return (
    <section id="intelligence" className="design-intelligence design-section">
      <div className="section-heading">
        <p className="design-kicker">04 / THE INTELLIGENCE BEHIND YOUR READ</p>
        <h2>
          Considered insights.
          <br />
          <em>Honest limits.</em>
        </h2>
        <p>
          A useful model should know when a photo isn’t enough. Here’s what sits behind your skin
          read.
        </p>
      </div>
      <div className="intelligence-grid">
        <article>
          <span>01 / CAPTURE</span>
          <h3>A better starting image.</h3>
          <p>
            Capture checks assess factors such as blur, exposure and framing. Good light and a clear
            view make the read more useful.
          </p>
        </article>
        <article>
          <span>02 / CONFIDENCE</span>
          <h3>Context over certainty.</h3>
          <p>
            Photo-based insights are estimates. Lighting, camera quality and products on your skin
            can change what a scan sees.
          </p>
        </article>
        <article>
          <span>03 / VALIDATION</span>
          <h3>Evidence before a claim.</h3>
          <p>
            We evaluate individual parts of the pipeline. A component benchmark is not a clinical
            accuracy score for the whole app.
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
            The repository documents an internal capture-gate evaluation dated 12 August 2026: 250
            test images derived from 25 synthetic faces. The baseline classified acceptable versus
            degraded captures with 94.8% accuracy (baseline, before the fixes described in that
            report). This test assessed image capture quality, not skin-condition detection or
            product effectiveness. It identified false accepts and false rejects and does not
            establish fairness across skin tones.
          </p>
          <h3>What that does not establish</h3>
          <p>
            We do not publish an overall skin-analysis accuracy percentage. Expert-labeled clinical
            validation is not established by these component tests. Skin Lab’s expert-label release
            gate remains unmet in the documented implementation.
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
  );
}
