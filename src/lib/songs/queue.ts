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

export const QUEUE_REVALIDATE_SECONDS = 15;

export async function getSongQueue(): Promise<QueueState> {
  const baseUrl = process.env.STREAM_API_URL;
  if (!baseUrl) {
    return { status: "unknown" };
  }

  try {
    const res = await fetch(`${baseUrl}/songList/active`, {
      next: { revalidate: QUEUE_REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      return { status: "unknown" };
    }

    return { status: "ok", songs: await res.json() };
  } catch {
    return { status: "unknown" };
  }
}
