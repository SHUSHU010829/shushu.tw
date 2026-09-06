import { NextResponse } from "next/server";
import { getSongCatalog } from "@/lib/songs/catalog";

export async function GET() {
  try {
    const state = await getSongCatalog();
    return NextResponse.json(state, {
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch {
    return NextResponse.json(
      { status: "unknown" },
      {
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  }
}
