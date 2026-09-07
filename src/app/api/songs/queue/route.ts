import { NextResponse } from "next/server";
import { getSongQueue } from "@/lib/songs/queue";

export async function GET() {
  return NextResponse.json(await getSongQueue(), {
    headers: {
      "Cache-Control": "s-maxage=15, stale-while-revalidate=60",
    },
  });
}
