"use client";

import useSWR from "swr";

export type ViewerSession =
  | { status: "anonymous" }
  | { status: "authenticated"; login: string; displayName: string };

const fetcher = (url: string) => fetch(url).then(r => r.json());

const FALLBACK: ViewerSession = { status: "anonymous" };

export function useSession() {
  const { data, mutate } = useSWR<ViewerSession>("/api/auth/me", fetcher, {
    revalidateOnFocus: true,
    fallbackData: FALLBACK,
  });

  const session = data ?? FALLBACK;

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    await mutate({ status: "anonymous" });
  }

  return { session, logout };
}
