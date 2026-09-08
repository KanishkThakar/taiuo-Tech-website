import { ImageResponse } from "next/og";
export const runtime = "edge";
export const alt = "Taiuo — Less guesswork. More you.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "75px 90px",
        background: "#F7F4EE",
        color: "#25231e",
      }}
    >
      <div style={{ fontSize: 27, letterSpacing: 10 }}>TAIUO</div>
      <div style={{ fontSize: 87, marginTop: 60, letterSpacing: -4, lineHeight: 1 }}>
        Less guesswork.
      </div>
      <div style={{ fontSize: 87, color: "#8a704b", letterSpacing: -4, lineHeight: 1.15 }}>
        More you.
      </div>
      <div style={{ marginTop: 43, fontSize: 23, color: "#6c685f" }}>
        Personal skin insights. Thoughtful daily routines.
      </div>
      <div style={{ marginTop: 29, width: "100%", height: 1, background: "#ded8cc" }} />
    </div>,
    size,
  );
}
