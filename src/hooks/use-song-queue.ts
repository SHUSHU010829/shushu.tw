"use client";

import useSWR from "swr";

export interface QueueSong {
  id: number;
  song_title: string;
  singer: string;
  now_playing: number;
  sort_order: number;
  requester_login?: string | null;
  requester_display_name?: string | null;
}

export type QueueState =
  | { status: "ok"; songs: QueueSong[] }
  | { status: "unknown" };

const fetcher = (url: string) => fetch(url).then(r => r.json());

const FALLBACK: QueueState = { status: "unknown" };

export function useSongQueue(): QueueState {
  const { data } = useSWR<QueueState>("/api/songs/queue", fetcher, {
    refreshInterval: 15_000,
    revalidateOnFocus: true,
    fallbackData: FALLBACK,
  });

  return data ?? FALLBACK;
}
