import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Taiuo Tech — Improve your looks without surgery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded OG card generated at the edge — no external image dependency. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "linear-gradient(135deg, #A8B5B5 0%, #B8C5C5 50%, #C8D4D4 100%)",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "#1A1A1A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#C8D4D4",
            fontSize: 34,
            fontWeight: 700,
          }}
        >
          T
        </div>
        <div style={{ fontSize: 40, fontWeight: 600, color: "#1A1A1A", letterSpacing: -1 }}>
          Taiuo
        </div>
      </div>
      <div
        style={{
          marginTop: 48,
          fontSize: 76,
          color: "#1A1A1A",
          letterSpacing: -2,
          lineHeight: 1.05,
        }}
      >
        Improve your looks
      </div>
      <div
        style={{
          fontSize: 76,
          color: "rgba(255,255,255,0.9)",
          fontWeight: 300,
          letterSpacing: -2,
          lineHeight: 1.05,
        }}
      >
        without surgery
      </div>
      <div style={{ marginTop: 40, fontSize: 28, color: "rgba(26,26,26,0.65)" }}>
        Personalized facial analysis · 160+ beauty markers · Non-surgical
      </div>
    </div>,
    size,
  );
}
