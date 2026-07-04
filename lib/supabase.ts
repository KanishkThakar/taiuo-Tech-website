import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client (Phase 2 foundation — auth, photo upload, reports).
 *
 * Reads the project credentials from environment variables:
 *   NEXT_PUBLIC_SUPABASE_URL       — https://<project-ref>.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY  — the public anon key
 *
 * Locally: copy .env.example to .env.local and fill both values
 * (Supabase Dashboard → Project Settings → API).
 * On Vercel: the Supabase integration sets these automatically.
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (see .env.example).",
    );
  }

  client ??= createClient(url, anonKey);
  return client;
}
