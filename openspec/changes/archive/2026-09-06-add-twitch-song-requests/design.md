## Context

shushu.tw 目前完全沒有使用者登入機制，僅有 `src/lib/twitch/token-manager.ts` 的 app-level client_credentials，用於讀取直播狀態（`src/lib/twitch/helix.ts`），無法辨識個別使用者。點歌功能需要知道「誰」在點歌，因此必須新增 Twitch 使用者授權碼（authorization code）登入流程。

同時，點歌請求最終要寫入外部服務 stream_api（`https://shustream.zeabur.app`），該服務將新增受 API 密鑰保護的寫入端點（`/repertoire`、`/songRequest`，屬另一個 repo 的工作）。shushu.tw 必須確保密鑰只存在於伺服器端，不可流入瀏覽器。

這是三個獨立 repo（stream_api、obs_tool、shushu.tw）協同開發的功能之一部分，三邊分開部署，本設計僅涵蓋 shushu.tw 這一側，但需考量跨 repo 的部署順序與相容性。stream_api 側的曲庫分類採多維度模型（`song_category(dimension, slug, label)`，例如 `language`、未來可能的 `mood`／`era` 等），shushu.tw 不假設任何特定維度存在，一律照 API 回傳內容渲染。

## Goals / Non-Goals

**Goals:**

- 觀眾可用 Twitch 帳號登入 shushu.tw，取得可辨識身分的 session。
- 觀眾可在 `/songs` 瀏覽曲庫（依 stream_api 提供的多維度分類篩選）與目前播放佇列。
- 登入後的觀眾可對曲庫中的歌曲送出點歌請求，請求安全地代理到 stream_api，密鑰不外流，點歌者身分一律來自伺服器端已驗證的 session，絕不信任前端傳入的身分欄位。
- 延續既有的資料抓取三件套慣例（`src/lib/<domain>` → `src/app/api/<domain>/route.ts` → `src/hooks/use-<domain>.ts`）與 HUD 視覺語言，讓新功能與現有頁面風格一致。

**Non-Goals:**

- 不索取任何 Twitch OAuth scope，不儲存使用者的 Twitch access/refresh token——登入流程只用來取得身分，換完身分立即丟棄或撤銷 token。
- 不實作 stream_api 或 obs_tool 側的任何程式碼。
- 不調整首頁 `/` 的模組順序（`now-page` spec 已鎖定）。
- 不做即時推送；佇列與曲庫皆以輪詢刷新。
- 不做資料庫層級的 session 儲存（如 Redis、DB session table）；session 完全靠自簽 JWT + httpOnly cookie 承載，伺服器端不需要任何 session 儲存狀態。
- 不在 shushu.tw 端寫死任何分類維度名稱；分類的存在、數量、標籤完全由 stream_api 回傳資料決定。

## Decisions

### OAuth 授權碼流程與 State 防護

採用標準 authorization code flow：`GET /api/auth/twitch/login` 產生一組隨機 `state`，寫入一個 5 分鐘效期的 httpOnly cookie（`oauth_state`），並 302 導向 `https://id.twitch.tv/oauth2/authorize`（`client_id` 為既有的 `TWITCH_CLIENT_ID`，`redirect_uri` 為新增的 `TWITCH_REDIRECT_URI`，`scope` 留空）。`GET /api/auth/twitch/callback` 比對回傳的 `state` 與 cookie 中的值（使用常數時間比較），不符則導向 `/songs?auth_error=state_mismatch` 並清除 cookie；相符則用 `code` 向 `https://id.twitch.tv/oauth2/token` 換取 access token，立即打 `GET https://api.twitch.tv/helix/users` 取得 `id`／`login`／`display_name`，簽發站內 session JWT 後**捨棄 Twitch access token**（可選擇額外呼叫 `POST https://id.twitch.tv/oauth2/revoke` 主動撤銷；不寫入任何欄位、不留存變數超出函式作用域），最後導回 `/songs`。

不採用 scope 授權（例如 `user:read:email`）：本功能只需要身分識別，任何多餘 scope 都會擴大授權同意畫面與資安面。

**Redirect URI 必須精確比對**：需在 Twitch 開發者後台為既有的 `TWITCH_CLIENT_ID` 應用程式，同時登記正式環境（`https://www.shushu.tw/api/auth/twitch/callback`，需與 `src/app/layout.tsx` 的 `metadataBase` 網域形式一致）與本機（`http://localhost:3000/api/auth/twitch/callback`）兩筆。Vercel preview 部署的網域每次都不同、無法逐一登記，因此 OAuth 流程**只能在正式環境或本機測試**，preview 環境上登入會因 redirect_uri 不匹配而失敗，這是預期限制而非 bug。

### Session 策略：自簽 JWT + httpOnly Cookie，無伺服器端儲存

`src/lib/auth/session.ts` 使用新增依賴 `jose`，以 `SESSION_SECRET`（HS256）簽發／驗證 JWT，payload 僅含 `{sub: twitch_user_id, login, display_name, iat, exp}`，效期 7 天。Cookie 屬性：`httpOnly`、`secure`（正式環境）、`sameSite: "lax"`、`path: "/"`。

**`sameSite` 必須是 `"lax"`，不可為 `"strict"`**：callback 路由是使用者從 Twitch 網域被導回站內的跨站頂層導覽（top-level navigation），`strict` cookie 在這種情境下不會被瀏覽器帶上，會讓 `oauth_state` cookie 讀不到而使每次登入都判定為 state 不符——這是一個容易在本機測試時被忽略、只在真實跨站導回才會出現的坑，`oauth_state` 與正式 session cookie 都要用 `lax`。

選擇自簽 JWT 而非伺服器端 session store（Redis / DB）：shushu.tw 部署在 Vercel，是無狀態的 serverless 環境，導入外部 session store 會多引入一個依賴與單點故障；JWT 讓 `GET /api/auth/me`、`POST /api/songs/request` 都能純粹靠解 cookie 驗證身分，不必額外查詢。代價是登出前無法主動撤銷單一 JWT（見風險章節）。

### 密鑰只存在伺服器端：Route Handler 代理層

`src/app/api/songs/catalog/route.ts`、`src/app/api/songs/queue/route.ts`、`src/app/api/songs/request/route.ts` 三個 Route Handler 是瀏覽器與 stream_api 之間唯一的橋樑。三者皆在伺服器端讀取 `process.env.STREAM_API_URL` 與 `process.env.STREAM_API_SECRET`，以 `X-Api-Key` 標頭呼叫 stream_api，瀏覽器端的 hook／元件永遠只呼叫站內的 `/api/songs/*`，不知道、也碰不到 stream_api 的真實網址與密鑰。這與既有 `src/lib/twitch/token-manager.ts` 的「密鑰只在伺服器端」原則一致，也符合 `openspec/specs/live-presence/spec.md` 的既有約束。

`POST /api/songs/request` 額外會先解析並驗證 session cookie（呼叫 `src/lib/auth/session.ts` 的驗證函式），未登入一律回 401，不轉發到 stream_api。**請求 body 只能攜帶要點的歌曲識別碼（如 `repertoire_id`），點歌者的 `twitch_user_id`／`login`／`display_name` 一律由伺服器從已驗證的 session 取得後才組進轉發給 stream_api 的請求體——即使前端在 body 裡夾帶了這些欄位也必須被忽略**，避免任何人偽冒他人身分點歌。

### 延續既有三件套資料抓取慣例，分類欄位不寫死

曲庫與佇列查詢完全比照 `src/lib/twitch/helix.ts` → `src/app/api/twitch/stream/route.ts` → `src/hooks/use-twitch-stream.ts` 的既有分層：`src/lib/songs/catalog.ts` 回傳可辨識聯集型別 `{status:"ok", songs, categories} | {status:"unknown"}`，其中 `categories` 是「維度 → 選項列表」的通用結構（例如 `[{dimension:"language", options:[{slug:"zh",label:"中文"}, ...]}]`），**不對任何具體維度名稱（如 language）做特殊處理**——新增一個分類維度時，stream_api 端加一筆資料即可讓篩選介面自動多出一排選項，shushu.tw 不需要改動任何程式碼。Route Handler 只做 try/catch 轉換與快取標頭，SWR hook 帶 `fallbackData` 保證不回傳 `undefined`。

點歌請求（`POST`）例外——它是變更操作，不適用「唯讀輪詢」的三件套模式，改用元件內的本地狀態機（比照 `whisper-terminal.tsx` 的 `idle|sending|sent|error`，並額外加入 `duplicate` 狀態對應 409）直接呼叫 fetch。

### 獨立 `/songs` 路由，不進首頁模組

`openspec/specs/now-page/spec.md` 的 Requirement「Page Module Composition」明確鎖定首頁模組順序，修改需要另開對 `now-page` 的 spec 變更。本功能開在獨立的 `src/app/songs/page.tsx`，不受該限制約束，也讓曲庫／點歌成為一個可獨立導覽的頁面而非首頁區塊。首頁若要加入導向 `/songs` 的入口連結，屬於 `now-page` 的既有元件（如 `hud-header.tsx`）異動，需另開 `now-page` 的 delta spec，本次變更不處理。

## Risks / Trade-offs

- **[風險] JWT 無法主動撤銷** — 登出只是清除瀏覽器端的 cookie，若 cookie 被竊取，該 JWT 在效期內（7 天）仍然有效。→ **緩解**：效期設得夠短（7 天而非更長）；`SESSION_SECRET` 外洩時可整批讓所有 session 失效（更換密鑰）；不在 JWT payload 存放任何敏感資料，僅供身分識別。
- **[風險] 依賴另兩個 repo 的端點是否就緒與欄位形狀是否一致** — `/api/songs/*` 代理的目標端點（`/repertoire`、`/songRequest`）由 stream_api 提供，若對方尚未部署、欄位形狀不同，或分類資料結構與本設計假設的「維度→選項」形狀不符，shushu.tw 這側的功能會直接失敗。→ **緩解**：`src/lib/songs/catalog.ts` 遵循既有慣例，任何非 200 或格式不符一律降級為 `{status:"unknown"}`，不會讓整頁報錯；實作時以對方實際回應格式為準校正映射邏輯。
- **[風險] `STREAM_API_SECRET` 尚未在 stream_api 端強制生效前的空窗期** — 若 stream_api 的驗證 middleware 採「密鑰未設定即放行」的漸進式做法，shushu.tw 帶著密鑰呼叫不會出錯，但也代表在對方尚未設定密鑰前，寫入端點對外仍是無驗證狀態。→ **緩解**：此為跨 repo 部署順序議題，shushu.tw 這側一律無條件帶上 `X-Api-Key`，驗證何時生效由 stream_api 一側的環境變數決定，不需要 shushu.tw 做條件判斷。
- **[風險] OAuth callback 只能在正式環境或 localhost 測試** — Vercel preview 部署網域不固定，無法登記進 Twitch redirect URI 允許清單。→ **緩解**：開發階段以 localhost 驗證完整流程，正式環境上線前再次於 prod 網域驗證一次；不依賴 preview 部署驗證登入功能。
- **[取捨] 不做 email 或其他個資蒐集** — 只取得 Twitch user id/login/display name，換取更小的授權同意範圍與資安面，代價是無法用 email 做通知或身分找回；本功能不需要，可接受。

## Migration Plan

1. 本 repo 的 Route Handler 與頁面可以先行開發與本機測試（使用假的 `STREAM_API_URL`/mock），不影響任何現有頁面。
2. 部署前需在 Twitch 開發者後台，對既有的 `TWITCH_CLIENT_ID` 應用程式新增本次的 `TWITCH_REDIRECT_URI`（本機與正式環境各一筆，見上方「Redirect URI 必須精確比對」）。
3. 正式環境變數（Vercel）需補上 `TWITCH_REDIRECT_URI`、`SESSION_SECRET`、`STREAM_API_URL`、`STREAM_API_SECRET` 後才能上線 `/songs`；在補齊前，`/songs` 頁面應可安全地顯示「曲庫暫時無法載入」而不影響其他頁面（沿用 `now-page` 的模組獨立失敗原則）。
4. 上線順序建議晚於 stream_api 的端點就緒，但不強制同時；`src/lib/songs/catalog.ts` 的降級行為確保提前上線也不會整頁壞掉。
5. Rollback：本功能完全侷限在 `/songs` 路由與 `/api/auth/*`、`/api/songs/*`，與首頁模組互不相關；回退只需下架這些新檔案或還原對應 commit，不影響既有頁面。

## Open Questions

- stream_api 的 `/repertoire`、`/songRequest` 實際回應欄位形狀（尤其是多維度分類的序列化方式，以及 409 重複點歌的確切回應內容）需待對方 repo 的變更定案後對齊；本設計以「維度→選項」的通用假設進行實作，實作時以對方實際部署回應為準校正 `src/lib/songs/catalog.ts` 的映射邏輯，但不應改變 shushu.tw 對外呈現的可辨識聯集型別契約。
