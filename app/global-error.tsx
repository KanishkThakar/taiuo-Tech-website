"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

/**
 * Last-resort boundary for failures in the root layout itself. It replaces the
 * whole document, so it must ship its own <html>/<body> and self-contained
 * styles (the app stylesheet may not have loaded).
 */
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          padding: "24px",
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          color: "#1a1a1a",
          background: "linear-gradient(160deg, #A8B5B5 0%, #C8D4D4 55%, #FAFAFA 100%)",
        }}
      >
        <div
          aria-hidden
          style={{
            display: "grid",
            placeItems: "center",
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "#1a1a1a",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          T
        </div>
        <h1 style={{ fontSize: "22px", fontWeight: 600, margin: 0 }}>Something went wrong</h1>
        <p style={{ fontSize: "15px", color: "rgba(26,26,26,0.7)", maxWidth: "360px", margin: 0 }}>
          We hit an unexpected error. Please try again.
        </p>
        <button
          onClick={() => unstable_retry()}
          style={{
            padding: "12px 24px",
            borderRadius: "999px",
            border: "none",
            background: "#1a1a1a",
            color: "#fff",
            fontSize: "15px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
