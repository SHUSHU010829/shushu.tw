"use client";

import useSWR from "swr";
import type { DiscordGuildState } from "@/lib/discord/invite";

const fetcher = (url: string) => fetch(url).then(r => r.json());

const FALLBACK: DiscordGuildState = { status: "unknown" };

export function useDiscordGuild(): DiscordGuildState {
  const { data } = useSWR<DiscordGuildState>("/api/discord/guild", fetcher, {
    refreshInterval: 300_000,
    revalidateOnFocus: true,
    fallbackData: FALLBACK,
  });

  return data ?? FALLBACK;
}
