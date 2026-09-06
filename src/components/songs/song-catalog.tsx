"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { HudLabel } from "@/components/hud/hud-label";
import { useSongCatalog } from "@/hooks/use-song-catalog";
import { useSession } from "@/hooks/use-session";
import { SongRow } from "./song-row";

export function SongCatalog() {
  const catalog = useSongCatalog();
  const { session } = useSession();
  const [activeFilters, setActiveFilters] = useState<
    Record<string, string | null>
  >({});

  const dimensions = catalog.status === "ok" ? catalog.categories : [];

  const filteredSongs = useMemo(() => {
    const songs = catalog.status === "ok" ? catalog.songs : [];
    return songs.filter(song =>
      Object.entries(activeFilters).every(([dimension, slug]) => {
        if (!slug) return true;
        return song.categories.some(
          category => category.dimension === dimension && category.slug === slug
        );
      })
    );
  }, [catalog, activeFilters]);

  function toggleFilter(dimension: string, slug: string) {
    setActiveFilters(prev => ({
      ...prev,
      [dimension]: prev[dimension] === slug ? null : slug,
    }));
  }

  if (catalog.status === "unknown") {
    return (
      <div className="flex flex-col gap-2">
        <HudLabel label="曲庫" />
        <span className="font-mono text-[12px] text-[hsl(var(--text-dim))]">
          曲庫暫時無法載入
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <HudLabel label="曲庫 · SONG CATALOG" />

      {dimensions.length > 0 && (
        <div className="flex flex-col gap-2">
          {dimensions.map(dimension => (
            <div key={dimension.dimension} className="flex flex-wrap gap-1.5">
              {dimension.options.map(option => (
                <button
                  key={option.slug}
                  type="button"
                  onClick={() => toggleFilter(dimension.dimension, option.slug)}
                  className={cn(
                    "rounded-[var(--radius-sm)] border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-200",
                    activeFilters[dimension.dimension] === option.slug
                      ? "border-[hsl(var(--signal-live))] text-[hsl(var(--signal-live))]"
                      : "border-[hsl(var(--border-faint))] text-[hsl(var(--text-muted))] hover:border-[hsl(var(--border-subtle))]"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {filteredSongs.map(song => (
          <SongRow
            key={song.id}
            song={song}
            isAuthenticated={session.status === "authenticated"}
          />
        ))}
      </div>

      {filteredSongs.length === 0 && (
        <span className="font-mono text-[12px] text-[hsl(var(--text-dim))]">
          沒有符合篩選條件的歌曲
        </span>
      )}
    </div>
  );
}
