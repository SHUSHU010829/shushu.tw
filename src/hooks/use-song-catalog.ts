"use client";

import useSWR from "swr";
import type { CatalogState } from "@/lib/songs/catalog";

const fetcher = (url: string) => fetch(url).then(r => r.json());

const FALLBACK: CatalogState = { status: "unknown" };

export function useSongCatalog(): CatalogState {
  const { data } = useSWR<CatalogState>("/api/songs/catalog", fetcher, {
    refreshInterval: 60_000,
    revalidateOnFocus: true,
    fallbackData: FALLBACK,
  });

  return data ?? FALLBACK;
}
