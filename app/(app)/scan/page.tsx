"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Camera, CheckCircle2, Lightbulb, Lock, ScanFace, Upload, X } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { saveScan } from "@/lib/product/data";
import { simulateScanResult } from "@/lib/product/mock";
import type { FaceScan } from "@/lib/product/types";
import { useUser } from "@/components/app/session";
import { FaceMesh } from "@/components/app/FaceMesh";
import { MetricBar, RadialScore, STATUS_TEXT } from "@/components/app/charts";

type Stage = "intro" | "camera" | "processing" | "results";

const PROCESS_STEPS = [
  "Detecting facial landmarks",
  "Measuring 160+ markers",
  "Assessing skin & symmetry",
  "Composing your report",
];

export default function ScanPage() {
  const { userId } = useUser();
  const [stage, setStage] = useState<Stage>("intro");
  const [camReady, setCamReady] = useState(false);
  const [camError, setCamError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [result, setResult] = useState<FaceScan | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCamReady(false);
  };

  useEffect(() => () => stopCamera(), []);

  const startCamera = async () => {
    setCamError(null);
    setStage("camera");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 720 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => undefined);
      }
      setCamReady(true);
    } catch {
      setCamError("Camera access was blocked. You can upload photos instead.");
    }
  };

  const runAnalysis = () => {
    stopCamera();
    setStage("processing");
    setProgress(0);
    setStepIdx(0);
    const total = 3200;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setProgress(Math.round(p * 100));
      setStepIdx(Math.min(PROCESS_STEPS.length - 1, Math.floor(p * PROCESS_STEPS.length)));
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        const scan = simulateScanResult(`${userId}:${Math.floor(start)}`);
        setResult(scan);
        void saveScan(getSupabase(), userId, scan);
        setStage("results");
      }
    };
    requestAnimationFrame(tick);
  };

  const reset = () => {
    setResult(null);
    setStage("intro");
  };

  return (
    <div className="mx-auto max-w-3xl">
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="app-card p-8 text-center"
          >
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-sage-base/15 text-[color:var(--sage-accent)]">
              <ScanFace className="h-7 w-7" strokeWidth={1.5} />
            </span>
            <h2 className="mt-5 text-2xl font-semibold text-ink">AI Face Scan</h2>
            <p className="mx-auto mt-2 max-w-md text-[15px] text-body">
              Center your face, hold still, and we&apos;ll analyze your features across 160+ markers.
              Good, even lighting gives the best result.
            </p>

            <div className="mx-auto mt-6 grid max-w-md gap-3 text-left">
              {[
                { Icon: Lightbulb, t: "Face a soft, even light source" },
                { Icon: Camera, t: "Hold the camera at eye level" },
                { Icon: Lock, t: "Your capture stays private to you" },
              ].map(({ Icon, t }) => (
                <div key={t} className="flex items-center gap-3 rounded-xl border border-line p-3">
                  <Icon className="h-[18px] w-[18px] text-sage-mid" strokeWidth={1.75} />
                  <span className="text-[14px] text-ink">{t}</span>
                </div>
              ))}
            </div>

            <button onClick={startCamera} className="btn btn-dark mt-7 w-full max-w-md gap-2">
              <Camera className="h-[18px] w-[18px]" strokeWidth={1.75} /> Enable camera &amp; scan
            </button>
            <Link
              href="/onboarding"
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-body hover:text-ink"
            >
              <Upload className="h-4 w-4" /> Upload photos instead
            </Link>
            <p className="mt-5 text-[11px] text-faint">
              Demo mode — results are simulated until the analysis engine is connected.
            </p>
          </motion.div>
        )}

        {stage === "camera" && (
          <motion.div
            key="camera"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="app-card p-6"
          >
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-[28px] bg-ink">
              <video
                ref={videoRef}
                playsInline
                muted
                className="h-full w-full scale-x-[-1] object-cover"
              />
              {/* alignment oval + mesh */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-[78%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-2 border-white/70" />
                <FaceMesh active={camReady} />
                {camReady && (
                  <div className="scan-line absolute inset-x-4 top-0 h-0.5 rounded-full bg-sage-light shadow-[0_0_12px_2px_rgba(200,212,212,0.7)]" />
                )}
              </div>
              {/* lighting indicator */}
              <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#7fd0a8]" /> Lighting good
              </div>
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-2.5 py-1 text-[11px] text-white/80 backdrop-blur-sm">
                Align your face inside the oval
              </span>
            </div>

            {camError ? (
              <div className="mt-5 text-center">
                <p className="text-sm text-[color:var(--status-attention)]">{camError}</p>
                <Link href="/onboarding" className="btn btn-dark mt-4 gap-2">
                  <Upload className="h-[18px] w-[18px]" /> Upload photos instead
                </Link>
              </div>
            ) : (
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => {
                    stopCamera();
                    setStage("intro");
                  }}
                  className="btn btn-glass !bg-surface-2 flex-none"
                >
                  <X className="mr-1 h-4 w-4" /> Cancel
                </button>
                <button onClick={runAnalysis} disabled={!camReady} className="btn btn-dark flex-1 gap-2">
                  <ScanFace className="h-[18px] w-[18px]" strokeWidth={1.75} /> Capture &amp; analyze
                </button>
              </div>
            )}
          </motion.div>
        )}

        {stage === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="app-card flex flex-col items-center p-10 text-center"
          >
            <RadialScore value={progress} size={150} label="analyzing" />
            <h3 className="mt-6 text-lg font-semibold text-ink">Analyzing your features</h3>
            <div className="mt-4 grid gap-2">
              {PROCESS_STEPS.map((s, idx) => (
                <div
                  key={s}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    idx <= stepIdx ? "text-ink" : "text-faint"
                  }`}
                >
                  {idx < stepIdx ? (
                    <CheckCircle2 className="h-4 w-4 text-[#5f8f7e]" />
                  ) : (
                    <span
                      className={`h-4 w-4 rounded-full border-2 ${idx === stepIdx ? "animate-spin border-sage-mid border-t-transparent" : "border-line"}`}
                    />
                  )}
                  {s}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {stage === "results" && result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-5"
          >
            <div className="app-card flex flex-col items-center p-8 text-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#5f8f7e]/15 px-3 py-1 text-xs font-semibold text-[color:var(--status-excellent)]">
                <CheckCircle2 className="h-3.5 w-3.5" /> Analysis complete
              </span>
              <div className="mt-5">
                <RadialScore value={result.overall_score} label="of 100" sub={`${result.confidence}% confidence`} />
              </div>
              <p className="mt-3 max-w-sm text-sm text-body">
                A strong result with clear areas to build on. Your protocol below is tuned to lift
                your lowest markers first.
              </p>
            </div>

            <div className="app-card p-6">
              <h3 className="mb-5 text-sm font-semibold text-ink">Your markers</h3>
              <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {result.metrics.map((m) => (
                  <div key={m.key}>
                    <div className="mb-1.5 flex items-center justify-between text-[13.5px]">
                      <span className="text-ink">{m.label}</span>
                      <span className="font-semibold tabular-nums" style={{ color: STATUS_TEXT[m.status] }}>
                        {m.score}
                      </span>
                    </div>
                    <MetricBar score={m.score} status={m.status} />
                    <p className="mt-1 text-[12px] text-body">{m.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={reset} className="btn btn-glass !bg-surface-2 flex-none">
                Scan again
              </button>
              <Link href="/dashboard" className="btn btn-dark flex-1">
                Go to dashboard
              </Link>
            </div>
            <p className="text-center text-[11px] text-faint">
              Demo results — simulated until the analysis engine is connected.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
