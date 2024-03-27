import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-.02em",
          fontWeight: 700,
          background:
            "radial-gradient(581px circle at 74.78% 59.33%, #b6cac8 0%, #d1cfc3 100%)",
        }}
      >
        <div
          style={{
            left: 42,
            top: 42,
            position: "absolute",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              width: 24,
              height: 24,
              borderRadius: "30px",
              background: "#68775F",
            }}
          />
          <span
            style={{
              marginLeft: 8,
              fontSize: 24,
              color: "#050316",
            }}
          >
            shushu.tw
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "5px 20px",
            margin: "0 42px",
            fontSize: 32,
            width: "auto",
            maxWidth: 640,
            textAlign: "center",
            color: "#050316",
            borderRadius: "3px",
            background:
              "linear-gradient(180deg,rgba(255,255,255,0) 0%, #DD835A 0%)",
          }}
        >
          Find all links about{" "}
          <span style={{ color: "#FFFCF5", paddingLeft: "8px", fontSize: 32 }}>
            SHUSHU
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
