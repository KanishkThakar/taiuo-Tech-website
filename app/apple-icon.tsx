import { ImageResponse } from "next/og";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f7f4ee",
      }}
    >
      <svg width="100" height="100" viewBox="0 0 24 24">
        <path
          d="M12 2C12.9 7.1 16.9 11.1 22 12C16.9 12.9 12.9 16.9 12 22C11.1 16.9 7.1 12.9 2 12C7.1 11.1 11.1 7.1 12 2Z"
          fill="#1c1913"
        />
      </svg>
    </div>,
    size,
  );
}
