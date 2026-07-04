import { z } from "zod";

/**
 * Environment validation (v4 §13) — runs once at server boot via app/layout.
 * The Supabase vars are OPTIONAL (the marketing site works without a backend),
 * but if either is present it must be well-formed — a malformed pair fails the
 * build instead of shipping a broken auth flow.
 */
const envSchema = z
  .object({
    NEXT_PUBLIC_SUPABASE_URL: z.url().startsWith("https://").optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20).optional(),
  })
  .refine(
    (env) => Boolean(env.NEXT_PUBLIC_SUPABASE_URL) === Boolean(env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    {
      message:
        "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY must be set together (see .env.example).",
    },
  );

export function validateEnv(): void {
  const result = envSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });
  if (!result.success) {
    throw new Error(
      `Invalid environment configuration:\n${result.error.issues
        .map((i) => `  - ${i.message}`)
        .join("\n")}`,
    );
  }
}
