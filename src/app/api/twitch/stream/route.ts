import { NextResponse } from "next/server";
import { getStream } from "@/lib/twitch/helix";

export async function GET() {
  try {
    const broadcasterId = process.env.TWITCH_BROADCASTER_ID ?? "";
    const state = await getStream(broadcasterId);
    return NextResponse.json(state, {
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch {
    return NextResponse.json(
      { status: "unknown" },
      {
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  }
}
