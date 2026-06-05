import { ImageResponse } from "next/og";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

const VOID = "#0a0a0a";
const PANEL = "#121212";
const LIVE = "#00ff87";
const ALERT = "#ff3d3d";
const TEXT_BODY = "#e0e0e0";
const TEXT_MUTED = "#8c8c8c";
const TEXT_SUBTLE = "#666666";
const BORDER_FAINT = "#292929";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          background: VOID,
          fontFamily: "monospace",
          position: "relative",
        }}
      >
        {/* CRT scanlines overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,255,135,0.04) 2px, rgba(0,255,135,0.04) 3px)",
            display: "flex",
          }}
        />

        {/* HUD header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
            padding: "0 32px",
            background: PANEL,
            borderBottom: `1px solid ${BORDER_FAINT}`,
          }}
        >
          <span
            style={{
              fontSize: 16,
              letterSpacing: "0.22em",
              color: TEXT_MUTED,
            }}
          >
            SHUSHU
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 5,
                background: LIVE,
                boxShadow: `0 0 12px ${LIVE}`,
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: 16,
                letterSpacing: "0.22em",
                color: TEXT_MUTED,
              }}
            >
              ONLINE
            </span>
          </div>
          <span
            style={{
              fontSize: 16,
              letterSpacing: "0.14em",
              color: TEXT_MUTED,
            }}
          >
            TPE // 24:00:00
          </span>
        </div>

        {/* Body */}
        <div
          style={{
            display: "flex",
            flex: 1,
            position: "relative",
            padding: 48,
          }}
        >
          {/* Centered HUD panel with corner brackets */}
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: 56,
              background: PANEL,
              borderRadius: 4,
              border: `1px solid ${BORDER_FAINT}`,
              justifyContent: "center",
            }}
          >
            {/* Corner brackets */}
            <span
              style={{
                position: "absolute",
                top: -2,
                left: -2,
                width: 24,
                height: 24,
                borderLeft: `3px solid ${LIVE}`,
                borderTop: `3px solid ${LIVE}`,
                display: "flex",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: -2,
                right: -2,
                width: 24,
                height: 24,
                borderRight: `3px solid ${LIVE}`,
                borderTop: `3px solid ${LIVE}`,
                display: "flex",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: -2,
                left: -2,
                width: 24,
                height: 24,
                borderLeft: `3px solid ${LIVE}`,
                borderBottom: `3px solid ${LIVE}`,
                display: "flex",
              }}
            />
            <span
              style={{
                position: "absolute",
                bottom: -2,
                right: -2,
                width: 24,
                height: 24,
                borderRight: `3px solid ${LIVE}`,
                borderBottom: `3px solid ${LIVE}`,
                display: "flex",
              }}
            />

            {/* REC badge */}
            <div
              style={{
                position: "absolute",
                top: 20,
                left: 20,
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(0,0,0,0.6)",
                padding: "4px 10px",
                borderRadius: 3,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  background: ALERT,
                  display: "flex",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: "0.25em",
                  color: "#ffffff",
                }}
              >
                REC
              </span>
            </div>

            {/* Top-right module label */}
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  letterSpacing: "0.25em",
                  color: TEXT_SUBTLE,
                }}
              >
                MODULE_01 // PROFILE
              </span>
            </div>

            {/* Label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  display: "flex",
                  width: 28,
                  height: 1,
                  background: LIVE,
                }}
              />
              <span
                style={{
                  fontSize: 14,
                  letterSpacing: "0.35em",
                  color: LIVE,
                }}
              >
                SYSTEM_BROADCAST
              </span>
            </div>

            {/* Title */}
            <div
              style={{
                display: "flex",
                fontSize: 96,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: TEXT_BODY,
                lineHeight: 1,
              }}
            >
              SHUSHU
              <span style={{ color: LIVE }}>.SYS</span>
            </div>

            {/* Subtitle */}
            <div
              style={{
                display: "flex",
                marginTop: 24,
                fontSize: 28,
                letterSpacing: "0.06em",
                color: TEXT_MUTED,
              }}
            >
              &gt; FIND_ALL_LINKS --about SHUSHU
            </div>

            {/* Bottom meta row */}
            <div
              style={{
                display: "flex",
                marginTop: 40,
                alignItems: "center",
                gap: 16,
                fontSize: 16,
                letterSpacing: "0.18em",
                color: TEXT_SUBTLE,
              }}
            >
              <span style={{ color: LIVE }}>●</span>
              <span>TWITCH</span>
              <span>·</span>
              <span>YOUTUBE</span>
              <span>·</span>
              <span>SOCIAL</span>
              <span>·</span>
              <span>SHUSHU.TW</span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
