"use client";

import useSWR from "swr";
import type { CatalogState } from "@/lib/songs/catalog";

export const CATALOG_SWR_KEY = "/api/songs/catalog";

const fetcher = (url: string) => fetch(url).then(r => r.json());

const FALLBACK: CatalogState = { status: "unknown" };

export function useSongCatalog(): CatalogState {
  const { data } = useSWR<CatalogState>(CATALOG_SWR_KEY, fetcher, {
    refreshInterval: 60_000,
    revalidateOnFocus: true,
  });

  return data ?? FALLBACK;
}
