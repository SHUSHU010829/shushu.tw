import { NextResponse } from "next/server";
import { getViewerSession } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getViewerSession();

  if (!session) {
    return NextResponse.json({ status: "anonymous" as const });
  }

  return NextResponse.json({
    status: "authenticated" as const,
    login: session.login,
    displayName: session.displayName,
  });
}
