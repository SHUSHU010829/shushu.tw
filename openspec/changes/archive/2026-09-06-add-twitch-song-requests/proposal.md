## Why

觀眾目前無法得知實況主能唱哪些歌，也沒有管道點歌。stream_api 與 obs_tool 這兩個內部工具即將新增「曲庫」與「點歌審核」能力（`/repertoire`、`/songRequest` 端點），但 shushu.tw 作為唯一的觀眾對外站台，仍完全沒有使用者登入機制——目前只有 app-level 的 Twitch client_credentials 用於讀取直播狀態，無法辨識「是誰」在點歌。本次變更補上這塊：讓觀眾用 Twitch 帳號登入、瀏覽曲庫、送出點歌請求。

## What Changes

- 新增 Twitch 使用者 OAuth 授權碼登入流程：登入導向、callback 換身分、httpOnly cookie session、登出。僅取得使用者身分（user id / login / display name），不索取任何權限 scope，且交換完成後立即丟棄（或撤銷）Twitch access token（不儲存、不重複使用）。
- 新增獨立頁面 `/songs`：曲庫瀏覽（依分類篩選——分類為多維度模型，如語言、風格等，由 stream_api 提供，shushu.tw 不寫死任何特定分類維度）、顯示目前播放佇列、登入後可對曲庫中的歌曲送出點歌請求。
- 新增伺服器端 Route Handler 代理層，將曲庫查詢、佇列查詢、點歌請求轉發到 stream_api（`https://shustream.zeabur.app`），點歌請求並附上僅存在於伺服器端的 API 密鑰，瀏覽器完全不會接觸到該密鑰。點歌請求的點歌者身分一律由伺服器端從 session cookie 解出後代入，絕不採信前端傳入的任何身分欄位。
- 新增 `.env.example` 條目：`TWITCH_REDIRECT_URI`、`SESSION_SECRET`、`STREAM_API_URL`、`STREAM_API_SECRET`。

## Non-Goals

- 不實作 stream_api 的 `/repertoire`、`/songRequest`、驗證 middleware 或 Twitch 聊天機器人發話——那是另一個 repo（stream_api）的工作，本變更只負責串接既有／即將提供的端點。
- 不實作 obs_tool 的曲庫管理與點歌審核 UI——那是另一個 repo（obs_tool）的工作。
- 不調整首頁 `/` 的模組順序或內容——`now-page` spec 已鎖定模組順序，本功能一律走獨立的 `/songs` 路由。
- 不做即時推送（WebSocket/SSE）；佇列狀態以輪詢方式更新即可。
- 不做點歌數量限制、離線禁點、或限定只能點曲庫內的歌之外的其他規則——唯一限制是「同一首歌已在佇列中或已有相同待審請求則不可重複點」，此限制由 stream_api 端強制執行，shushu.tw 僅依 HTTP 狀態碼判斷並顯示對應訊息，不解析錯誤訊息文字。
- 不索取任何 Twitch OAuth scope，也不儲存使用者的 Twitch access/refresh token。
- 不在 shushu.tw 端定義或假設任何具體分類維度（如「語言」）的存在與否——分類清單完全由 stream_api 回傳內容決定。

## Capabilities

### New Capabilities

- `twitch-user-auth`: Twitch 使用者 OAuth 授權碼登入流程，簽發並驗證站內 session cookie，提供登入狀態查詢與登出。
- `song-requests`: 觀眾瀏覽曲庫（含多維度分類）、查看目前播放佇列、對曲庫歌曲送出點歌請求，並將請求安全代理至 stream_api。

### Modified Capabilities

(none)

## Impact

- Affected specs: `twitch-user-auth`（新增）、`song-requests`（新增）
- Affected code:
  - New:
    - `src/app/api/auth/twitch/login/route.ts`
    - `src/app/api/auth/twitch/callback/route.ts`
    - `src/app/api/auth/me/route.ts`
    - `src/app/api/auth/logout/route.ts`
    - `src/lib/auth/session.ts`
    - `src/lib/songs/catalog.ts`
    - `src/app/api/songs/catalog/route.ts`
    - `src/app/api/songs/queue/route.ts`
    - `src/app/api/songs/request/route.ts`
    - `src/hooks/use-song-catalog.ts`
    - `src/hooks/use-song-queue.ts`
    - `src/hooks/use-session.ts`
    - `src/app/songs/page.tsx`
    - `src/components/songs/song-catalog.tsx`
    - `src/components/songs/song-row.tsx`
    - `src/components/songs/twitch-login-button.tsx`
  - Modified:
    - `.env.example`
    - `package.json`（新增 `jose` 依賴）
  - Removed: (none)
