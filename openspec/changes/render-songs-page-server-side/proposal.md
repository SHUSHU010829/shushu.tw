## Summary

把 `/songs` 的曲庫、歌單與登入狀態改成伺服器端先取好再送出，讓未登入訪客在首屏就看得到歌單內容，登入只擋「點歌」這個動作。

## Motivation

`/songs` 的權限規則本身是對的——`GET /api/songs/catalog`、`GET /api/songs/queue` 匿名可讀，只有 `POST /api/songs/request` 會回 401。但整頁是 `"use client"`，曲庫與歌單全靠 SWR 在 hydration 之後才抓，而三個 hook 的 `fallbackData` 都是悲觀值（`{status:"unknown"}`／空陣列）。結果未登入訪客拿到的初始 HTML 是：

```
SONGS · 點歌            使用 TWITCH 登入
// 目前歌單              目前沒有排隊中的歌曲
// 曲庫                  曲庫暫時無法載入
```

一個空歌單、一句「曲庫暫時無法載入」，旁邊一顆顯眼的 Twitch 登入鈕——讀起來就是「要登入才看得到歌單」。爬蟲與關閉 JS 的訪客則永遠只看得到這個版本。

已登入的訪客也有對應症狀：`useSession` 的 `fallbackData` 是 anonymous，所以首屏每一張曲庫卡片都先顯示「登入後點歌」，要等 `/api/auth/me` 回來才變成「點歌」。

另外兩個相關的體感問題：歌單抓取失敗時顯示的是「目前沒有排隊中的歌曲」，把「載不到」講成「沒有歌」；而 session 過期時點歌會拿到 401，前端一律顯示「送出失敗」，看不出來只是要重新登入。

## Proposed Solution

- `/songs` 改為伺服器元件：一次取好曲庫、歌單與 session，再交給新的客戶端元件 `SongsView` 渲染。頁面需要讀 session cookie 才能決定首屏要顯示「點歌」還是「登入後點歌」，因此標記 `dynamic = "force-dynamic"`；上游資料仍走 Next 的 fetch 快取（曲庫 60 秒、歌單 15 秒），不會每個請求都打 stream_api。
- `SongsView` 以 `SWRConfig` 的 `fallback` 把三筆伺服器端資料灌進 SWR 快取，三個 hook 同步移除各自的 `fallbackData`——hook 層的 `fallbackData` 優先權高於 config，留著就會蓋掉伺服器端的結果。移除後 hook 仍保有 `data ?? FALLBACK` 的保底，行為不變。
- 歌單面板區分「無法載入」與「沒有排隊中的歌曲」兩種狀態。
- 點歌收到 401 時顯示「請重新登入」並導向 Twitch 登入，而不是「送出失敗」。
- 把佇列抓取邏輯從 Route Handler 抽到共用的伺服器端模組，讓頁面與 `/api/songs/queue` 共用同一份實作；`QueueSong`／`QueueState` 型別隨之搬進該模組。
- `ViewerSession` 型別另置於不含 `server-only` 的檔案，讓伺服器元件與客戶端元件都能匯入。

## Non-Goals

- 不改動任何權限規則：匿名可讀的端點維持可讀，`POST /api/songs/request` 維持未登入回 401 且不轉發，stream_api 端的驗證完全不動。
- 不改 `/` 首頁的模組組成或順序。
- 不做即時推送；歌單維持輪詢。
- 不處理「登入後自動送出當初點的那首歌」——登入 callback 仍一律導回 `/songs`。
- 不調整 `/songs` 的視覺設計，只新增一行說明文字。

## Alternatives Considered

- **維持整頁 client render，只把 `fallbackData` 換成樂觀值**：首屏會顯示假資料再被真實資料蓋掉，而且爬蟲仍然看不到內容，沒有解決根本問題。
- **頁面走 ISR（不讀 cookie）以取得靜態快取**：匿名訪客的首屏會正確，但已登入者仍會先看到一輪「登入後點歌」再閃成「點歌」。改成動態渲染、資料層快取，可以兩邊都對，代價只是每個請求多一次伺服器渲染。

## Impact

- Affected specs: `song-requests`
- Affected code:
  - New:
    - `src/components/songs/songs-view.tsx`
    - `src/lib/songs/queue.ts`
    - `src/lib/auth/viewer.ts`
  - Modified:
    - `src/app/songs/page.tsx`
    - `src/app/api/songs/queue/route.ts`
    - `src/components/songs/song-row.tsx`
    - `src/hooks/use-session.ts`
    - `src/hooks/use-song-catalog.ts`
    - `src/hooks/use-song-queue.ts`
  - Removed: (none)
