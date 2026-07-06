import type { NextConfig } from "next";

/**
 * Security headers (v4 §13).
 * CSP note: the site is fully static (SSG) — nonce-based CSP would force dynamic
 * rendering, so scripts allow 'unsafe-inline' for Next's own bootstrap inlines +
 * the JSON-LD block. Everything else is locked down: no external script hosts,
 * no framing, no plugins, Supabase-only network egress.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.supabase.co https://lh3.googleusercontent.com https://*.githubusercontent.com",
  "media-src 'self' blob:",
  "font-src 'self'",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vitals.vercel-insights.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // no upgrade-insecure-requests: production is HTTPS+HSTS anyway, and webkit
  // applies it to http://localhost in CI, breaking every asset load
].join("; ");

const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CSP },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    // camera=(self) enables the in-app AI face-scan (getUserMedia) on our own origin
    key: "Permissions-Policy",
    value: "camera=(self), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  turbopack: {
    // this project is its own workspace root (a stray lockfile exists in the
    // user home directory — don't let Next infer that as the root)
    root: __dirname,
  },
  async headers() {
    return [{ source: "/(.*)", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
