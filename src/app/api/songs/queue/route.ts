import { NextResponse } from "next/server";

const CACHE_HEADERS = {
  "Cache-Control": "s-maxage=15, stale-while-revalidate=60",
};

export async function GET() {
  const baseUrl = process.env.STREAM_API_URL;
  if (!baseUrl) {
    return NextResponse.json({ status: "unknown" }, { headers: CACHE_HEADERS });
  }

  try {
    const res = await fetch(`${baseUrl}/songList/active`, {
      next: { revalidate: 15 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { status: "unknown" },
        { headers: CACHE_HEADERS }
      );
    }

    const songs = await res.json();
    return NextResponse.json(
      { status: "ok", songs },
      { headers: CACHE_HEADERS }
    );
  } catch {
    return NextResponse.json({ status: "unknown" }, { headers: CACHE_HEADERS });
  }
}
