## 1. 環境準備

- [x] 1.1 新增 `jose` 依賴，更新 `.env.example`（`TWITCH_REDIRECT_URI`、`SESSION_SECRET`、`STREAM_API_URL`、`STREAM_API_SECRET`），並在 Twitch 開發者後台為既有 `TWITCH_CLIENT_ID` 登記 redirect URI（localhost 與正式環境各一筆）

## 2. Session 基礎建設

- [x] 2.1 實作 `src/lib/auth/session.ts`，提供 Signed Session Cookie 的簽發與驗證函式（HS256、`SESSION_SECRET`、7 天效期），套用「Session 策略：自簽 JWT + httpOnly Cookie，無伺服器端儲存」設計決策

## 3. Twitch OAuth 登入流程

- [x] 3.1 實作 `src/app/api/auth/twitch/login/route.ts`，對應 Twitch Authorization Code Login，套用「OAuth 授權碼流程與 State 防護」：產生隨機 `state`、寫入 `oauth_state` cookie（`sameSite: "lax"`、5 分鐘效期）、導向 Twitch authorize（scope 留空）
- [x] 3.2 實作 `src/app/api/auth/twitch/callback/route.ts`，對應 Twitch OAuth Callback and Identity Exchange：含 state 相符時換取 token、取得身分、簽發 session cookie、丟棄或撤銷 access token、導回 `/songs` 的成功路徑，以及 state 不符時導向 `/songs?auth_error=state_mismatch` 並清除 cookie 的拒絕路徑
- [x] 3.3 實作 `src/app/api/auth/me/route.ts`、`src/app/api/auth/logout/route.ts` 與 `src/hooks/use-session.ts`，對應 Session Status and Logout

## 4. 曲庫與佇列代理

- [x] 4.1 實作 `src/lib/songs/catalog.ts` 與 `src/app/api/songs/catalog/route.ts`，對應 Song Catalog Browsing，套用「延續既有三件套資料抓取慣例，分類欄位不寫死」：回傳 `{status,songs,categories}` 可辨識聯集、依維度分組分類、設定快取標頭、失敗時降級為 `unknown`
- [x] 4.2 實作 `src/app/api/songs/queue/route.ts` 與對應 SWR hooks（`use-song-catalog.ts`、`use-song-queue.ts`），對應 Current Queue Visibility，確保匿名可讀取

## 5. 點歌請求

- [x] 5.1 實作 `src/app/api/songs/request/route.ts`，對應 Authenticated Song Request Submission，套用「密鑰只存在伺服器端：Route Handler 代理層」：驗證 session（未登入回 401、不轉發）、一律以 session 內的身分覆蓋並忽略 body 中任何身分欄位、附 `X-Api-Key` 轉發至 stream_api，並將 stream_api 的 409 原樣傳遞供前端以 HTTP 狀態碼判斷重複點歌

## 6. `/songs` 頁面與元件

- [x] 6.1 建立「獨立 `/songs` 路由，不進首頁模組」：新增 `src/app/songs/page.tsx`
- [x] 6.2 實作 `src/components/songs/song-catalog.tsx` 與 `song-row.tsx`：依 API 回傳的任意分類維度渲染篩選 pills 與清單（版型比照 `channels-grid.tsx`，使用 `PanelCard` + `HudLabel`），並確保遵守 design-system 硬規則（`src/components/` 內不寫死 hex、中文 Noto Sans TC／英文 Space Mono、檔名 kebab-case、元件 PascalCase）
- [x] 6.3 實作 `src/components/songs/twitch-login-button.tsx` 與點歌狀態機（`idle|sending|sent|duplicate|error`，比照 `whisper-terminal.tsx`），對應 Song Request Page 的匿名顯示登入 CTA、已登入送出請求兩種情境

## 7. 驗證

- [x] 7.1 本機手動走一次完整 OAuth 流程，含 state 不符情境，確認 cookie 屬性（`sameSite: "lax"`）與導向正確
- [x] 7.2 手動測試未登入呼叫 `POST /api/songs/request` 回 401、重複點歌時 stream_api 回 409 且前端正確顯示為 duplicate、以及 stream_api 不可用時 `/songs` 曲庫區塊降級為 unknown 而不影響其他區塊
- [x] 7.3 執行 `npm run lint` 確認通過
