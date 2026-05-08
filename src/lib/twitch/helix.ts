import { getAppAccessToken } from "./token-manager";

export type TwitchStreamState =
  | {
      status: "live";
      title: string;
      gameName: string;
      viewerCount: number;
      startedAt: string;
      thumbnailUrl: string;
    }
  | { status: "offline" }
  | { status: "unknown" };

export async function getStream(
  broadcasterId: string
): Promise<TwitchStreamState> {
  const token = await getAppAccessToken();

  const res = await fetch(
    `https://api.twitch.tv/helix/streams?user_id=${broadcasterId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Client-Id": process.env.TWITCH_CLIENT_ID ?? "",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Twitch Helix error: ${res.status}`);
  }

  const json = (await res.json()) as { data: Array<Record<string, unknown>> };
  const streams = json.data;

  if (!streams || streams.length === 0) {
    return { status: "offline" };
  }

  const s = streams[0];
  return {
    status: "live",
    title: String(s.title ?? ""),
    gameName: String(s.game_name ?? ""),
    viewerCount: Number(s.viewer_count ?? 0),
    startedAt: String(s.started_at ?? ""),
    thumbnailUrl: String(s.thumbnail_url ?? ""),
  };
}
