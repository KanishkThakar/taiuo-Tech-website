"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Camera, Check, ChevronLeft, X } from "lucide-react";
import { Field, ProductShell, SupabaseGate, btnPrimary, inputCls } from "@/components/product/shell";
import { GOAL_OPTIONS, PHOTO_SLOTS } from "@/lib/data";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

const YEARS = Array.from({ length: 2012 - 1940 + 1 }, (_, i) => 2012 - i);
const GENDERS = ["Female", "Male", "Other"] as const;

const stepVariants = {
  enter: { opacity: 0, x: 32 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -32 },
};

export default function OnboardingPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  /* auth gate */
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setChecking(false);
      return;
    }
    getSupabase()
      .auth.getSession()
      .then(({ data }) => {
        if (!data.session) {
          router.replace("/login");
          return;
        }
        setUserId(data.session.user.id);
        const metaName = data.session.user.user_metadata?.full_name;
        if (typeof metaName === "string") setFullName((v) => v || metaName);
        setChecking(false);
      });
  }, [router]);

  const pickFile = (key: string) => inputRefs.current[key]?.click();

  const onFile = (key: string) => (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFiles((f) => ({ ...f, [key]: file }));
    setPreviews((p) => {
      if (p[key]) URL.revokeObjectURL(p[key]);
      return { ...p, [key]: URL.createObjectURL(file) };
    });
  };

  const removeFile = (key: string) => {
    setFiles((f) => ({ ...f, [key]: null }));
    setPreviews((p) => {
      if (p[key]) URL.revokeObjectURL(p[key]);
      const next = { ...p };
      delete next[key];
      return next;
    });
  };

  const toggleGoal = (g: string) =>
    setGoals((gs) => (gs.includes(g) ? gs.filter((x) => x !== g) : [...gs, g]));

  const photosComplete = PHOTO_SLOTS.every((s) => files[s.key]);
  const step1Valid = fullName.trim().length > 1 && birthYear && gender && goals.length > 0;

  const submit = async () => {
    if (!userId) return;
    setBusy(true);
    setError(null);
    try {
      const supabase = getSupabase();

      for (const slot of PHOTO_SLOTS) {
        const file = files[slot.key];
        if (!file) throw new Error(`Missing photo: ${slot.label}`);
        const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
        const { error: uploadError } = await supabase.storage
          .from("face-photos")
          .upload(`${userId}/${slot.key}.${ext}`, file, { upsert: true, contentType: file.type });
        if (uploadError) throw new Error(`Upload failed (${slot.label}): ${uploadError.message}`);
      }

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: userId,
        full_name: fullName.trim(),
        birth_year: Number(birthYear),
        gender,
        goals,
      });
      if (profileError) throw new Error(`Saving profile failed: ${profileError.message}`);

      const { error: requestError } = await supabase
        .from("analysis_requests")
        .insert({ user_id: userId, status: "processing" });
      if (requestError) throw new Error(`Creating request failed: ${requestError.message}`);

      setStep(4);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (checking) {
    return (
      <ProductShell>
        <p className="py-10 text-center text-body">Loading…</p>
      </ProductShell>
    );
  }

  return (
    <ProductShell wide>
      <SupabaseGate>
        {/* progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-medium text-body">
            <span>Step {Math.min(step, 4)} of 4</span>
            <span>
              {step === 1 && "About you"}
              {step === 2 && "Your photos"}
              {step === 3 && "Review & submit"}
              {step === 4 && "Done"}
            </span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream">
            <motion.div
              className="h-full rounded-full bg-ink"
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="s1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h1 className="text-2xl font-medium">Tell us about you</h1>
              <p className="mt-1.5 text-[15px] text-body">
                This calibrates your analysis to your demographics and goals.
              </p>
              <div className="mt-7 grid gap-4">
                <Field label="Full name">
                  <input value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} placeholder="Your name" />
                </Field>
                <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                  <Field label="Birth year">
                    <select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} className={inputCls}>
                      <option value="">Select…</option>
                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Gender">
                    <div className="flex gap-2">
                      {GENDERS.map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGender(g)}
                          className={`pill-tab flex-1 ${gender === g ? "!bg-ink !text-white" : ""}`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
                <Field label="What are your goals? (pick at least one)">
                  <div className="flex flex-wrap gap-2">
                    {GOAL_OPTIONS.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => toggleGoal(g)}
                        className={`pill-tab ${goals.includes(g) ? "!bg-ink !text-white" : ""}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </Field>
                <button className={btnPrimary} disabled={!step1Valid} onClick={() => setStep(2)}>
                  Continue
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h1 className="text-2xl font-medium">Upload your 6 photos</h1>
              <p className="mt-1.5 text-[15px] text-body">
                Clear, even lighting, no makeup or glasses. Your photos stay private — only our
                analysis team sees them.
              </p>

              <div className="mt-7 grid grid-cols-3 gap-4 max-sm:grid-cols-2">
                {PHOTO_SLOTS.map((slot) => {
                  const preview = previews[slot.key];
                  return (
                    <div key={slot.key} className="text-center">
                      <button
                        type="button"
                        onClick={() => pickFile(slot.key)}
                        className={`relative block aspect-[3/4] w-full overflow-hidden rounded-2xl border transition-colors ${
                          preview ? "border-sage-mid" : "border-dashed border-line bg-cream hover:border-sage-mid"
                        }`}
                        aria-label={`Upload ${slot.label} photo`}
                      >
                        {preview ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={preview} alt={`${slot.label} preview`} className="absolute inset-0 h-full w-full object-cover" />
                        ) : (
                          <span className="absolute inset-0 grid place-items-center">
                            <Camera className="h-6 w-6 text-faint" strokeWidth={1.5} />
                          </span>
                        )}
                        {preview && (
                          <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-black/55 text-white">
                            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                          </span>
                        )}
                      </button>
                      {preview && (
                        <button
                          type="button"
                          onClick={() => removeFile(slot.key)}
                          className="mx-auto mt-1.5 flex items-center gap-1 text-xs text-body hover:text-ink"
                        >
                          <X className="h-3 w-3" /> Remove
                        </button>
                      )}
                      <p className="mt-1.5 text-sm font-medium">{slot.label}</p>
                      <p className="text-xs text-faint">{slot.hint}</p>
                      <input
                        ref={(el) => {
                          inputRefs.current[slot.key] = el;
                        }}
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={onFile(slot.key)}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 flex gap-3">
                <button className="btn btn-glass !bg-cream flex-none" onClick={() => setStep(1)}>
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back
                </button>
                <button className={btnPrimary} disabled={!photosComplete} onClick={() => setStep(3)}>
                  {photosComplete
                    ? "Continue"
                    : `${PHOTO_SLOTS.filter((s) => files[s.key]).length}/6 photos added`}
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
              <h1 className="text-2xl font-medium">Review &amp; submit</h1>
              <p className="mt-1.5 text-[15px] text-body">One last look before we begin.</p>

              <div className="mt-6 rounded-2xl border border-line bg-cream/60 p-5 text-sm">
                <p>
                  <span className="font-medium">{fullName}</span> · born {birthYear} · {gender}
                </p>
                <p className="mt-1.5 text-body">Goals: {goals.join(", ")}</p>
                <div className="mt-4 flex gap-2">
                  {PHOTO_SLOTS.map((s) =>
                    previews[s.key] ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img key={s.key} src={previews[s.key]} alt={s.label} className="h-14 w-11 rounded-lg object-cover" />
                    ) : null,
                  )}
                </div>
              </div>

              <label className="mt-5 flex items-start gap-3 text-sm text-body">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#1A1A1A]"
                />
                I consent to Taiuo securely storing and analyzing these photos to prepare my
                personalized plan. I can delete my data at any time.
              </label>

              {error && (
                <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </p>
              )}

              <div className="mt-6 flex gap-3">
                <button className="btn btn-glass !bg-cream flex-none" onClick={() => setStep(2)} disabled={busy}>
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back
                </button>
                <button className={btnPrimary} disabled={!consent || busy} onClick={submit}>
                  {busy ? "Uploading your photos…" : "Submit for analysis"}
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="s4" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }} className="py-4 text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-sage-base/25">
                <Check className="h-8 w-8 text-[#4E5F5F]" strokeWidth={2} />
              </span>
              <h1 className="mt-6 text-2xl font-medium">You&apos;re all set{fullName ? `, ${fullName.split(" ")[0]}` : ""}!</h1>
              <p className="mx-auto mt-3 max-w-md text-[15px] text-body">
                Your photos are uploaded and your analysis is in preparation. It takes up to 28 days
                for our team to prepare your personalized protocol — we&apos;ll keep your dashboard
                updated.
              </p>
              <Link href="/dashboard" className="btn btn-dark mt-8">
                Go to my dashboard
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </SupabaseGate>
    </ProductShell>
  );
}
