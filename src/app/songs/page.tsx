import { SongsView } from "@/components/songs/songs-view";
import { getViewerSession } from "@/lib/auth/session";
import type { ViewerSession } from "@/lib/auth/viewer";
import { getSongCatalog, type CatalogState } from "@/lib/songs/catalog";
import { getSongQueue } from "@/lib/songs/queue";

// 需要讀 session cookie 才能在首屏就決定要顯示「點歌」還是「登入後點歌」，
// 所以整頁是動態渲染；上游曲庫／歌單仍走 Next 的 fetch 快取，不會每次請求都打
// stream_api。頁面本身對未登入訪客一律可讀。
export const dynamic = "force-dynamic";

export default async function SongsPage() {
  const [catalog, queue, viewer] = await Promise.all([
    getSongCatalog().catch<CatalogState>(() => ({ status: "unknown" })),
    getSongQueue(),
    getViewerSession(),
  ]);

  const session: ViewerSession = viewer
    ? {
        status: "authenticated",
        login: viewer.login,
        displayName: viewer.displayName,
      }
    : { status: "anonymous" };

  return <SongsView catalog={catalog} queue={queue} session={session} />;
}
