## 1. 伺服器端資料層

- [x] 1.1 新增 `src/lib/songs/queue.ts`：把 `QueueSong`／`QueueState` 型別與佇列抓取邏輯（`getSongQueue()`，`next: { revalidate: 15 }`、失敗降級為 `unknown`）從 Route Handler 抽出成共用模組；改寫 `src/app/api/songs/queue/route.ts` 改呼叫它，並保留原本的 `s-maxage=15, stale-while-revalidate=60` 快取標頭。完成條件：`GET /api/songs/queue` 匿名回應內容與快取標頭與改動前一致。
- [x] 1.2 新增 `src/lib/auth/viewer.ts` 存放 `ViewerSession` 型別，`src/hooks/use-session.ts` 改為從該檔匯入並轉出。完成條件：伺服器元件可匯入該型別而不觸及標有 `server-only` 的 `src/lib/auth/session.ts`。

## 2. SWR 初始值改由伺服器灌入

- [x] 2.1 移除 `use-session.ts`、`use-song-catalog.ts`、`use-song-queue.ts` 的 `fallbackData`，改為各自匯出 SWR key 常數（`SESSION_SWR_KEY`、`CATALOG_SWR_KEY`、`QUEUE_SWR_KEY`），並保留 `data ?? FALLBACK` 保底。完成條件：`npx tsc --noEmit` 通過，且沒有其他呼叫端依賴被移除的 `fallbackData`。
- [x] 2.2 新增 `src/components/songs/songs-view.tsx`：以 `SWRConfig` 的 `fallback` 用上述三個 key 灌入伺服器端取得的曲庫、歌單、session，並承接原本 `page.tsx` 的版面；歌單面板區分「歌單暫時無法載入」與「目前沒有排隊中的歌曲」；標題區加一行「歌單與曲庫免登入瀏覽，點歌才需要登入」。完成條件：元件內不寫死 hex 色碼，全部沿用既有 CSS 變數。

## 3. 頁面改為伺服器渲染

- [x] 3.1 改寫 `src/app/songs/page.tsx` 為 async 伺服器元件：以 `Promise.all` 並行取得曲庫（失敗時 catch 成 `{status:"unknown"}`）、歌單與 session，轉成 `ViewerSession` 後交給 `SongsView`，並標記 `export const dynamic = "force-dynamic"`。完成條件：`npx next build` 成功且 `/songs` 標記為 `ƒ (Dynamic)`。

## 4. 點歌狀態機

- [x] 4.1 `src/components/songs/song-row.tsx` 新增 `unauthenticated` 狀態：`POST /api/songs/request` 回 401 時顯示「請重新登入」並導向 `/api/auth/twitch/login`，取代原本的「送出失敗」。完成條件：未登入與 session 過期兩種情境都顯示登入 CTA，其餘狀態文案不變。

## 5. 驗證

- [x] 5.1 以本機 mock stream_api 實測：匿名 `GET /songs` 的 HTML 直接含歌單與曲庫內容且不含「曲庫暫時無法載入」；帶有效 session cookie 時 HTML 直接顯示「點歌」與登出列而非「登入後點歌」。
- [x] 5.2 實測權限未鬆動：匿名 `POST /api/songs/request` 回 401 且不轉發上游；帶 session 時回 201 並以伺服器端 `x-api-key` 轉發至 stream_api。
- [x] 5.3 執行 `npx tsc --noEmit`、`npm run lint`、`npx next build` 全數通過。
