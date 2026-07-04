"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Check, Clock, LogOut, Sparkles } from "lucide-react";
import { ProductShell, SupabaseGate } from "@/components/product/shell";
import { PHOTO_SLOTS } from "@/lib/data";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

interface Profile {
  full_name: string | null;
  birth_year: number | null;
  gender: string | null;
  goals: string[] | null;
}

interface AnalysisRequest {
  id: string;
  status: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  // starts "loading" only when a backend exists to load from
  const [loading, setLoading] = useState<boolean>(() => isSupabaseConfigured());
  const [profile, setProfile] = useState<Profile | null>(null);
  const [request, setRequest] = useState<AnalysisRequest | null>(null);
  const [photoUrls, setPhotoUrls] = useState<{ label: string; url: string }[]>([]);

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const supabase = getSupabase();
    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;
      if (!session) {
        router.replace("/login");
        return;
      }
      const uid = session.user.id;

      const [{ data: profileRow }, { data: requestRows }, { data: objects }] = await Promise.all([
        supabase
          .from("profiles")
          .select("full_name, birth_year, gender, goals")
          .eq("id", uid)
          .maybeSingle(),
        supabase
          .from("analysis_requests")
          .select("id, status, created_at")
          .order("created_at", { ascending: false })
          .limit(1),
        supabase.storage.from("face-photos").list(uid),
      ]);

      setProfile((profileRow as Profile | null) ?? null);
      setRequest(((requestRows ?? [])[0] as AnalysisRequest | undefined) ?? null);

      if (objects && objects.length > 0) {
        const paths = objects.map((o) => `${uid}/${o.name}`);
        const { data: signed } = await supabase.storage
          .from("face-photos")
          .createSignedUrls(paths, 3600);
        if (signed) {
          setPhotoUrls(
            signed.flatMap((s) => {
              if (!s.signedUrl) return [];
              const file = s.path?.split("/").pop() ?? "";
              const key = file.replace(/\.[^.]+$/, "");
              const slot = PHOTO_SLOTS.find((p) => p.key === key);
              return [{ label: slot?.label ?? key, url: s.signedUrl }];
            }),
          );
        }
      }
      setLoading(false);
    })();
  }, [router]);

  const signOut = async () => {
    await getSupabase().auth.signOut();
    router.replace("/");
  };

  const requestDate = request
    ? new Date(request.created_at).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <ProductShell wide>
      <SupabaseGate>
        {loading ? (
          <p className="py-10 text-center text-body">Loading your plan…</p>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-medium">
                  {profile?.full_name ? `Hi, ${profile.full_name.split(" ")[0]}` : "Your dashboard"}
                </h1>
                <p className="mt-1.5 text-[15px] text-body">Your Taiuo plan at a glance.</p>
              </div>
              <button
                onClick={signOut}
                className="flex items-center gap-1.5 text-sm font-medium text-body transition-colors hover:text-ink"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>

            {request ? (
              <div className="mt-7 rounded-2xl bg-ink p-6 text-white">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-5 w-5 text-sage-light" strokeWidth={1.5} />
                  <h2 className="text-lg font-medium">Analysis in preparation</h2>
                </div>
                <p className="mt-1.5 text-sm text-white/60">
                  Submitted {requestDate}. Your personalized protocol takes up to 28 days.
                </p>
                <ol className="mt-5 grid gap-2.5 text-sm">
                  <li className="flex items-center gap-2.5 text-white/90">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-green-400/90 text-ink">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    Photos received
                  </li>
                  <li className="flex items-center gap-2.5 text-white/90">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-sage-light text-ink">
                      <Clock className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    160+ facial markers being assessed
                  </li>
                  <li className="flex items-center gap-2.5 text-white/45">
                    <span className="h-5 w-5 rounded-full border border-white/25" />
                    Personalized protocol delivered
                  </li>
                </ol>
              </div>
            ) : (
              <div className="mt-7 rounded-2xl border border-line bg-cream/60 p-6 text-center">
                <p className="text-[15px] text-body">You haven&apos;t submitted your photos yet.</p>
                <Link href="/onboarding" className="btn btn-dark mt-4">
                  Start my plan
                </Link>
              </div>
            )}

            {profile && (
              <div className="mt-5 rounded-2xl border border-line p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-faint">
                  Profile
                </h3>
                <p className="mt-2.5 text-[15px]">
                  {profile.full_name} {profile.birth_year ? `· born ${profile.birth_year}` : ""}{" "}
                  {profile.gender ? `· ${profile.gender}` : ""}
                </p>
                {profile.goals && profile.goals.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {profile.goals.map((g) => (
                      <span
                        key={g}
                        className="rounded-full bg-sage-base/15 px-3 py-1 text-xs font-medium text-[#4E5F5F]"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}

            {photoUrls.length > 0 && (
              <div className="mt-5 rounded-2xl border border-line p-6">
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-faint">
                  Your photos
                </h3>
                <div className="mt-4 grid grid-cols-6 gap-3 max-sm:grid-cols-3">
                  {photoUrls.map((p) => (
                    <figure key={p.url} className="text-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.url}
                        alt={p.label}
                        className="aspect-[3/4] w-full rounded-xl object-cover"
                      />
                      <figcaption className="mt-1 text-[11px] text-faint">{p.label}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </SupabaseGate>
    </ProductShell>
  );
}
