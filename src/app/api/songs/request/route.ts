import { NextResponse } from "next/server";
import { getViewerSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  const session = await getViewerSession();
  if (!session) {
    return NextResponse.json({ status: "unauthenticated" }, { status: 401 });
  }

  const baseUrl = process.env.STREAM_API_URL;
  const apiKey = process.env.STREAM_API_SECRET;
  if (!baseUrl || !apiKey) {
    return NextResponse.json({ status: "unknown" }, { status: 503 });
  }

  let repertoireId: unknown;
  try {
    const body = await request.json();
    repertoireId = body?.repertoire_id;
  } catch {
    return NextResponse.json({ status: "invalid_request" }, { status: 400 });
  }

  if (typeof repertoireId !== "number") {
    return NextResponse.json({ status: "invalid_request" }, { status: 400 });
  }

  try {
    // stream_api 的 /songRequest 不會用 repertoire_id 反查標題，要求呼叫端直接帶
    // song_title/singer——所以這裡先查一次曲庫，用曲庫裡的真實資料，不相信任何
    // 前端可能夾帶的標題字串。
    const catalogRes = await fetch(`${baseUrl}/repertoire/`, {
      cache: "no-store",
    });
    if (!catalogRes.ok) {
      return NextResponse.json({ status: "error" }, { status: 502 });
    }

    const catalog: { id: number; song_title: string; singer: string }[] =
      await catalogRes.json();
    const song = catalog.find(item => item.id === repertoireId);
    if (!song) {
      return NextResponse.json({ status: "not_found" }, { status: 404 });
    }

    // 點歌者身分一律來自已驗證的 session，即使前端傳了其他身分欄位也一律忽略。
    const upstreamRes = await fetch(`${baseUrl}/songRequest/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        repertoire_id: repertoireId,
        song_title: song.song_title,
        singer: song.singer,
        requester: {
          twitch_id: session.sub,
          login: session.login,
          display_name: session.displayName,
        },
      }),
    });

    const data = await upstreamRes.json().catch(() => null);

    if (upstreamRes.status === 409) {
      return NextResponse.json(
        { status: "duplicate", message: data?.message ?? "已有人點過" },
        { status: 409 }
      );
    }

    if (!upstreamRes.ok) {
      return NextResponse.json({ status: "error" }, { status: 502 });
    }

    return NextResponse.json(
      { status: "accepted", request: data },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ status: "error" }, { status: 502 });
  }
}
