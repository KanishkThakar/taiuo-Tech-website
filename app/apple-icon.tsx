import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — ink tile + sage "T", generated at the edge (no asset file). */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #242c2c 0%, #141818 100%)",
        }}
      >
        <div style={{ display: "flex", position: "relative", width: 104, height: 96 }}>
          {/* crossbar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 104,
              height: 16,
              borderRadius: 8,
              background: "#c8d4d4",
            }}
          />
          {/* stem */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 44,
              width: 16,
              height: 96,
              borderRadius: 8,
              background: "#c8d4d4",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
