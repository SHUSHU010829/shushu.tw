import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";
import { signSession, setSessionCookie } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

const OAUTH_STATE_COOKIE = "oauth_state";

interface TwitchTokenResponse {
  access_token: string;
}

interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
}

interface TwitchUsersResponse {
  data: TwitchUser[];
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

function clearOAuthStateCookie() {
  cookies().set(OAUTH_STATE_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

function redirectWithError(request: Request, error: string) {
  clearOAuthStateCookie();
  return NextResponse.redirect(
    new URL(`/songs?auth_error=${error}`, request.url)
  );
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookieState = cookies().get(OAUTH_STATE_COOKIE)?.value;

  if (!code || !state || !cookieState || !safeEqual(state, cookieState)) {
    return redirectWithError(request, "state_mismatch");
  }

  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  const redirectUri = process.env.TWITCH_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return redirectWithError(request, "config");
  }

  try {
    const tokenRes = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenRes.ok) {
      throw new Error(`Twitch token exchange failed: ${tokenRes.status}`);
    }

    const { access_token: accessToken } =
      (await tokenRes.json()) as TwitchTokenResponse;

    const userRes = await fetch("https://api.twitch.tv/helix/users", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Client-Id": clientId,
      },
    });

    if (!userRes.ok) {
      throw new Error(`Twitch user fetch failed: ${userRes.status}`);
    }

    const { data } = (await userRes.json()) as TwitchUsersResponse;
    const viewer = data[0];

    if (!viewer) {
      throw new Error("Twitch returned no user data");
    }

    // 立即撤銷這個 access token——我們只需要身分，不需要繼續持有它
    fetch("https://id.twitch.tv/oauth2/revoke", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ client_id: clientId, token: accessToken }),
    }).catch(() => {});

    const sessionToken = await signSession({
      sub: viewer.id,
      login: viewer.login,
      displayName: viewer.display_name,
    });

    clearOAuthStateCookie();
    setSessionCookie(sessionToken);

    return NextResponse.redirect(new URL("/songs", request.url));
  } catch {
    return redirectWithError(request, "exchange_failed");
  }
}
