"use client";

import { HudLabel } from "@/components/hud/hud-label";
import { PanelCard } from "@/components/hud/panel-card";
import { TwitchLoginButton } from "@/components/songs/twitch-login-button";
import { SongCatalog } from "@/components/songs/song-catalog";
import { useSongQueue } from "@/hooks/use-song-queue";

export default function SongsPage() {
  const queue = useSongQueue();
  const queueSongs = queue.status === "ok" ? queue.songs : [];

  return (
    <main className="flex min-h-screen flex-col bg-[hsl(var(--surface-void))]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-8">
        <div className="flex items-center justify-between">
          <HudLabel label="SONGS · 點歌" />
          <TwitchLoginButton />
        </div>

        <PanelCard className="flex flex-col gap-2">
          <HudLabel label="目前歌單" />
          {queueSongs.length === 0 ? (
            <span className="font-mono text-[12px] text-[hsl(var(--text-dim))]">
              目前沒有排隊中的歌曲
            </span>
          ) : (
            <ol className="flex flex-col gap-1">
              {queueSongs.map(song => (
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
          )}
        </PanelCard>

        <SongCatalog />
      </div>
    </main>
  );
}
