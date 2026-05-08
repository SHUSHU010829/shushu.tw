"use client";

import useSWR from "swr";
import type { TwitchStreamState } from "@/lib/twitch/helix";

const fetcher = (url: string) => fetch(url).then(r => r.json());

const FALLBACK: TwitchStreamState = { status: "unknown" };

export function useTwitchStream(): TwitchStreamState {
  const { data } = useSWR<TwitchStreamState>("/api/twitch/stream", fetcher, {
    refreshInterval: 60_000,
    revalidateOnFocus: true,
    fallbackData: FALLBACK,
  });

  return data ?? FALLBACK;
}
