"use client";

import useSWR from "swr";
import type { QueueState } from "@/lib/songs/queue";

export type { QueueSong, QueueState } from "@/lib/songs/queue";

export const QUEUE_SWR_KEY = "/api/songs/queue";

const fetcher = (url: string) => fetch(url).then(r => r.json());

const FALLBACK: QueueState = { status: "unknown" };

export function useSongQueue(): QueueState {
  const { data } = useSWR<QueueState>(QUEUE_SWR_KEY, fetcher, {
    refreshInterval: 15_000,
    revalidateOnFocus: true,
  });

  return data ?? FALLBACK;
}
