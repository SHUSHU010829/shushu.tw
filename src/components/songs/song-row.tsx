"use client";

import { useState } from "react";
import { PanelCard } from "@/components/hud/panel-card";
import { HudLabel } from "@/components/hud/hud-label";
import type { RepertoireSong } from "@/lib/songs/catalog";

type RequestStatus =
  | "idle"
  | "sending"
  | "sent"
  | "duplicate"
  | "unauthenticated"
  | "error";

interface SongRowProps {
  song: RepertoireSong;
  isAuthenticated: boolean;
}

const STATUS_LABEL: Record<RequestStatus, string | null> = {
  idle: null,
  sending: "送出中…",
  sent: "已送出 ✓",
  duplicate: "已有人點過",
  unauthenticated: "請重新登入",
  error: "送出失敗",
};

export function SongRow({ song, isAuthenticated }: SongRowProps) {
  const [status, setStatus] = useState<RequestStatus>("idle");

  async function handleRequest() {
    if (status === "sending" || status === "sent") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/songs/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repertoire_id: song.id }),
      });

      if (res.status === 201) {
        setStatus("sent");
      } else if (res.status === 409) {
        setStatus("duplicate");
      } else if (res.status === 401) {
        // session 過期：把人導回登入，而不是丟一個看不懂的「送出失敗」
        setStatus("unauthenticated");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const showLoginCta = !isAuthenticated || status === "unauthenticated";

  return (
    <PanelCard className="flex h-full flex-col gap-2">
      <HudLabel label={song.title} />
      <span className="font-mono text-[12px] text-[hsl(var(--text-body))]">
        {song.singer}
      </span>

      {song.categories.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {song.categories.map(category => (
            <span
              key={`${category.dimension}-${category.slug}`}
              className="rounded-[var(--radius-sm)] border border-[hsl(var(--border-faint))] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-[hsl(var(--text-muted))]"
            >
              {category.label}
            </span>
          ))}
        </div>
      )}

      {showLoginCta ? (
        <a
          href="/api/auth/twitch/login"
          className="mt-auto rounded-[var(--radius-sm)] border border-[hsl(var(--border-faint))] px-3 py-1 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--text-dim))] transition-colors duration-200 hover:border-[hsl(var(--border-subtle))]"
        >
          {status === "unauthenticated"
            ? STATUS_LABEL.unauthenticated
            : "登入後點歌"}
        </a>
      ) : (
        <button
          type="button"
          onClick={handleRequest}
          disabled={status === "sending" || status === "sent"}
          className="mt-auto rounded-[var(--radius-sm)] border border-[hsl(var(--border-subtle))] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--text-muted))] transition-colors duration-200 hover:enabled:border-[hsl(var(--signal-live))] hover:enabled:text-[hsl(var(--signal-live))] disabled:cursor-not-allowed disabled:opacity-30"
        >
          {STATUS_LABEL[status] ?? "點歌"}
        </button>
      )}
    </PanelCard>
  );
}
