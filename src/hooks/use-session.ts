"use client";

import useSWR from "swr";
import type { ViewerSession } from "@/lib/auth/viewer";

export type { ViewerSession };

export const SESSION_SWR_KEY = "/api/auth/me";

const fetcher = (url: string) => fetch(url).then(r => r.json());

const FALLBACK: ViewerSession = { status: "anonymous" };

export function useSession() {
  // 初始值由 `SongsView` 的 SWRConfig 從伺服器端灌入，這裡刻意不設 fallbackData
  // ——hook 層的 fallbackData 優先權高於 config，設了就會蓋掉 SSR 的結果。
  const { data, mutate } = useSWR<ViewerSession>(SESSION_SWR_KEY, fetcher, {
    revalidateOnFocus: true,
  });

  const session = data ?? FALLBACK;

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    await mutate({ status: "anonymous" });
  }

  return { session, logout };
}
