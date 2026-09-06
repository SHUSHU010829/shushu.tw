"use client";

import Link from "next/link";
import { useTpeClock } from "@/hooks/use-tpe-clock";
import { useTwitchStream } from "@/hooks/use-twitch-stream";
import { StatusDot } from "@/components/hud/status-dot";

export function HudHeader() {
  const clock = useTpeClock();
  const stream = useTwitchStream();
  const isLive = stream.status === "live";

  return (
    <header
      data-module="hud-header"
      className="flex h-14 items-center justify-between border-b border-[hsl(var(--border-faint))] bg-[hsl(var(--surface-panel))] px-4"
    >
      <div className="flex items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--text-muted))]">
          SHUSHU
        </span>
        <span className="text-[hsl(var(--border-subtle))]">|</span>
        <Link
          href="/songs"
          className="font-mono text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--text-muted))] transition-colors duration-200 hover:text-[hsl(var(--signal-live))]"
        >
          SONGS
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <StatusDot state={isLive ? "live" : "offline"} />
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[hsl(var(--text-muted))]">
          {isLive ? "LIVE" : "OFFLINE"}
        </span>
      </div>

      <span className="font-mono text-[11px] tabular-nums tracking-[0.12em] text-[hsl(var(--text-muted))]">
        {clock ?? "--:--:--"}
      </span>
    </header>
  );
}
