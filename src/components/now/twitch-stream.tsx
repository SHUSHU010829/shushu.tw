"use client";

import { useEffect, useState } from "react";
import { useTwitchStream } from "@/hooks/use-twitch-stream";
import { PanelCard } from "@/components/hud/panel-card";
import { HudLabel } from "@/components/hud/hud-label";

function formatUptime(startedAt: string): string {
  const diffMs = Date.now() - new Date(startedAt).getTime();
  const h = Math.floor(diffMs / 3_600_000);
  const m = Math.floor((diffMs % 3_600_000) / 60_000);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function LiveView({
  title,
  gameName,
  viewerCount,
  startedAt,
}: {
  title: string;
  gameName: string;
  viewerCount: number;
  startedAt: string;
}) {
  const [parentHost, setParentHost] = useState<string | null>(null);
  useEffect(() => {
    setParentHost(window.location.hostname);
  }, []);

  return (
    <div className="relative mx-auto w-full overflow-hidden rounded-[var(--radius-md)] md:max-w-[860px]">
      {/* CRT corner accents */}
      <span className="absolute left-0 top-0 z-10 h-3 w-3 border-l-2 border-t-2 border-[hsl(var(--signal-live))]" />
      <span className="absolute right-0 top-0 z-10 h-3 w-3 border-r-2 border-t-2 border-[hsl(var(--signal-live))]" />
      <span className="absolute bottom-0 left-0 z-10 h-3 w-3 border-b-2 border-l-2 border-[hsl(var(--signal-live))]" />
      <span className="absolute bottom-0 right-0 z-10 h-3 w-3 border-b-2 border-r-2 border-[hsl(var(--signal-live))]" />

      {/* Scanline overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,255,135,0.05) 2px 3px)",
        }}
      />

      {/* REC badge */}
      <div className="absolute left-3 top-3 z-20 flex items-center gap-1.5 rounded bg-black/60 px-2 py-0.5">
        <span className="h-2 w-2 animate-pulse-red rounded-full bg-[hsl(var(--signal-alert))]" />
        <span className="font-mono text-[10px] tracking-widest text-white">
          REC
        </span>
      </div>

      {/* Twitch iframe — hidden on mobile */}
      <div className="hidden aspect-video w-full bg-black md:block">
        {parentHost ? (
          <iframe
            src={`https://player.twitch.tv/?channel=shushu010829&parent=${parentHost}&autoplay=false`}
            className="h-full w-full"
            allowFullScreen
            title="Twitch stream"
          />
        ) : null}
      </div>

      {/* Mobile: show CTA instead of iframe */}
      <div className="block md:hidden">
        <OfflineView />
      </div>

      {/* HUD bar below iframe */}
      <div className="hidden flex-wrap items-center gap-3 border-t border-[hsl(var(--border-faint))] bg-[hsl(var(--surface-panel))] px-3 py-2 md:flex">
        <span className="max-w-[40%] truncate font-mono text-[11px] text-[hsl(var(--text-body))]">
          {title}
        </span>
        <span className="font-mono text-[11px] text-[hsl(var(--text-muted))]">
          ·
        </span>
        <span className="font-mono text-[11px] text-[hsl(var(--text-muted))]">
          {gameName}
        </span>
        <span className="font-mono text-[11px] text-[hsl(var(--text-muted))]">
          ·
        </span>
        <span className="font-mono text-[11px] text-[hsl(var(--signal-live))]">
          👁 {viewerCount.toLocaleString()}
        </span>
        <span className="font-mono text-[11px] text-[hsl(var(--text-muted))]">
          ·
        </span>
        <span className="font-mono text-[11px] text-[hsl(var(--text-subtle))]">
          {formatUptime(startedAt)}
        </span>
      </div>
    </div>
  );
}

function OfflineView() {
  return (
    <div
      className="relative flex min-h-[480px] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-[var(--radius-md)] px-4"
      style={{
        background: `
          url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")
          center / cover,
          hsl(var(--surface-panel))
        `,
      }}
    >
      <HudLabel label="STREAM_STATUS" />
      <p className="font-mono text-2xl font-bold uppercase tracking-[0.4em] text-[hsl(var(--text-muted))]">
        OFFLINE
      </p>
      <a
        href="https://twitch.tv/shushu010829"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 rounded-[var(--radius-sm)] border border-[hsl(var(--signal-live))] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[hsl(var(--signal-live))] transition-colors duration-200 hover:bg-[hsl(var(--signal-live))] hover:text-[hsl(var(--surface-void))]"
      >
        TUNE IN @ TWITCH
      </a>
    </div>
  );
}

export function TwitchStream() {
  const stream = useTwitchStream();
  const isLive = stream.status === "live";

  return (
    <div aria-live="polite" data-module="twitch-stream">
      <PanelCard
        accent={isLive ? "live" : "idle"}
        className="overflow-hidden p-0"
      >
        {isLive ? (
          <LiveView
            title={stream.title}
            gameName={stream.gameName}
            viewerCount={stream.viewerCount}
            startedAt={stream.startedAt}
          />
        ) : (
          <OfflineView />
        )}
      </PanelCard>
    </div>
  );
}
