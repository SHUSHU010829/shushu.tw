"use client";

import { SWRConfig } from "swr";
import { HudLabel } from "@/components/hud/hud-label";
import { PanelCard } from "@/components/hud/panel-card";
import { SongCatalog } from "@/components/songs/song-catalog";
import { TwitchLoginButton } from "@/components/songs/twitch-login-button";
import { SESSION_SWR_KEY } from "@/hooks/use-session";
import { CATALOG_SWR_KEY } from "@/hooks/use-song-catalog";
import { QUEUE_SWR_KEY, useSongQueue } from "@/hooks/use-song-queue";
import type { ViewerSession } from "@/lib/auth/viewer";
import type { CatalogState } from "@/lib/songs/catalog";
import type { QueueState } from "@/lib/songs/queue";

interface SongsViewProps {
  catalog: CatalogState;
  queue: QueueState;
  session: ViewerSession;
}

/**
 * 曲庫、歌單、登入狀態都由伺服器端先取好再灌進 SWR 快取，讓未登入訪客在首屏
 * （以及沒有 JS 的爬蟲）就直接看到內容，而不是先看到「暫時無法載入」再等
 * hydration 補上。登入只擋「點歌」這個動作。
 */
export function SongsView({ catalog, queue, session }: SongsViewProps) {
  return (
    <SWRConfig
      value={{
        fallback: {
          [CATALOG_SWR_KEY]: catalog,
          [QUEUE_SWR_KEY]: queue,
          [SESSION_SWR_KEY]: session,
        },
      }}
    >
      <SongsPageBody />
    </SWRConfig>
  );
}

function SongsPageBody() {
  const queue = useSongQueue();

  return (
    <main className="flex min-h-screen flex-col bg-[hsl(var(--surface-void))]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <HudLabel label="SONGS · 點歌" />
            <span className="font-mono text-[11px] text-[hsl(var(--text-dim))]">
              歌單與曲庫免登入瀏覽，點歌才需要登入
            </span>
          </div>
          <TwitchLoginButton />
        </div>

        <PanelCard className="flex flex-col gap-2">
          <HudLabel label="目前歌單" />
          <QueuePanelBody queue={queue} />
        </PanelCard>

        <SongCatalog />
      </div>
    </main>
  );
}

function QueuePanelBody({ queue }: { queue: QueueState }) {
  if (queue.status === "unknown") {
    return (
      <span className="font-mono text-[12px] text-[hsl(var(--text-dim))]">
        歌單暫時無法載入
      </span>
    );
  }

  if (queue.songs.length === 0) {
    return (
      <span className="font-mono text-[12px] text-[hsl(var(--text-dim))]">
        目前沒有排隊中的歌曲
      </span>
    );
  }

  return (
    <ol className="flex flex-col gap-1">
      {queue.songs.map(song => (
        <li
          key={song.id}
          className="flex items-center justify-between font-mono text-[12px] text-[hsl(var(--text-body))]"
        >
          <span>
            {song.song_title} — {song.singer}
          </span>
          {song.now_playing === 1 && (
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--signal-live))]">
              NOW PLAYING
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
