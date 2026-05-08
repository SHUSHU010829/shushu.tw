interface TokenCache {
  access_token: string;
  expires_at: number;
}

let cache: TokenCache | null = null;

const REFRESH_BUFFER_MS = 5 * 60 * 1000;

export async function getAppAccessToken(): Promise<string> {
  const now = Date.now();

  if (cache && cache.expires_at - now > REFRESH_BUFFER_MS) {
    return cache.access_token;
  }

  const res = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID ?? "",
      client_secret: process.env.TWITCH_CLIENT_SECRET ?? "",
      grant_type: "client_credentials",
    }),
  });

  if (!res.ok) {
    throw new Error(`Twitch token fetch failed: ${res.status}`);
  }

  const data = await res.json();

  cache = {
    access_token: data.access_token,
    expires_at: now + data.expires_in * 1000,
  };

  return cache.access_token;
}
