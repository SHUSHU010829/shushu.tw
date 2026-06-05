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
          position: "relative",
        }}
      >
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
          <div
            style={{
              display: "flex",
              fontSize: 16,
              letterSpacing: "0.22em",
              color: TEXT_MUTED,
            }}
          >
            SHUSHU
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                width: 10,
                height: 10,
                borderRadius: 5,
                background: LIVE,
                marginRight: 10,
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 16,
                letterSpacing: "0.22em",
                color: TEXT_MUTED,
              }}
            >
              ONLINE
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 16,
              letterSpacing: "0.14em",
              color: TEXT_MUTED,
            }}
          >
            TPE // 24:00:00
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            display: "flex",
            flex: 1,
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
            <div
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
            <div
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
            <div
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
            <div
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
                background: "rgba(0,0,0,0.6)",
                padding: "4px 10px",
                borderRadius: 3,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  background: ALERT,
                  marginRight: 8,
                }}
              />
              <div
                style={{
                  display: "flex",
                  fontSize: 12,
                  letterSpacing: "0.25em",
                  color: "#ffffff",
                }}
              >
                REC
              </div>
            </div>

            {/* Top-right module label */}
            <div
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                display: "flex",
                fontSize: 12,
                letterSpacing: "0.25em",
                color: TEXT_SUBTLE,
              }}
            >
              MODULE_01 // PROFILE
            </div>

            {/* Label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 28,
                  height: 1,
                  background: LIVE,
                  marginRight: 12,
                }}
              />
              <div
                style={{
                  display: "flex",
                  fontSize: 14,
                  letterSpacing: "0.35em",
                  color: LIVE,
                }}
              >
                SYSTEM_BROADCAST
              </div>
            </div>

            {/* Title */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                lineHeight: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 96,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: TEXT_BODY,
                }}
              >
                SHUSHU
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 96,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: LIVE,
                }}
              >
                .SYS
              </div>
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
              {"> FIND_ALL_LINKS --about SHUSHU"}
            </div>

            {/* Bottom meta row */}
            <div
              style={{
                display: "flex",
                marginTop: 40,
                alignItems: "center",
                fontSize: 16,
                letterSpacing: "0.18em",
                color: TEXT_SUBTLE,
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  background: LIVE,
                  marginRight: 16,
                }}
              />
              <div style={{ display: "flex", marginRight: 16 }}>TWITCH</div>
              <div style={{ display: "flex", marginRight: 16 }}>·</div>
              <div style={{ display: "flex", marginRight: 16 }}>YOUTUBE</div>
              <div style={{ display: "flex", marginRight: 16 }}>·</div>
              <div style={{ display: "flex", marginRight: 16 }}>SOCIAL</div>
              <div style={{ display: "flex", marginRight: 16 }}>·</div>
              <div style={{ display: "flex" }}>SHUSHU.TW</div>
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
