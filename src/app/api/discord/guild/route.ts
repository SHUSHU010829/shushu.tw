import { NextResponse } from "next/server";
import { getGuildFromInvite } from "@/lib/discord/invite";

export async function GET() {
  try {
    const code = process.env.DISCORD_INVITE_CODE ?? "shushu010829";
    const state = await getGuildFromInvite(code);
    return NextResponse.json(state, {
      headers: {
        "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json(
      { status: "unknown" },
      {
        headers: {
          "Cache-Control": "s-maxage=300, stale-while-revalidate=600",
        },
      }
    );
  }
}
