## Why

首頁的 Discord 目前只是 `ChannelsGrid` 裡四個一模一樣的小 tile 之一，下方顯示寫死的假字串 `last · 2d`，完全沒有伺服器身分、即時人數或任何互動性。Discord 是僅次於 Twitch 的社群轉換入口，但社群真正的核心產品——逼逼機器人 BIBIBOT 的七大玩法系統——在 shushu.tw 上完全看不到，等於把最有說服力的「加入理由」藏起來。此變更把 Discord 升級為獨立全寬模組，用真實即時數字與可瀏覽的玩法輪播做出實質的伺服器宣傳效果。

## What Changes

- 新增獨立全寬 `DISCORD_SERVER` 模組，置於 `CHANNELS_GRID` 與 `WHISPER_TERMINAL` 之間，內含兩段：
  - 伺服器狀態列：伺服器 icon、名稱、handle、簡介，以及即時成員數／上線數／Nitro 加成數（透過 Discord invite API，免認證、免 token），加入 CTA
  - BIBIBOT 玩法輪播：從 bibi-website 移植並重新換膚的橫向拖曳捲軸，七張玩法卡（挖礦／釣魚／賭場／樂透／股市／經濟／等級），每張含 hover／focus 觸發的純 CSS 微動畫預覽，深連結至 `bibi.shushu.tw/docs/<slug>`
- 新增 Discord 資料管線（`src/lib/discord/`、`src/app/api/discord/guild/route.ts`、`src/hooks/use-discord-guild.ts`），架構比照既有 Twitch pipeline：三態狀態機（`ok` / `unavailable` / `unknown`）、Route Handler 錯誤永遠降級不外洩、SWR 5 分鐘輪詢
- **BREAKING**：`CHANNELS_GRID` 從四格降為三格 —— 移除 Discord tile（`src/lib/now-page/channels.ts` 的 `discord` 項），只保留 Twitch／YouTube／Twitter，桌機版面從 4 欄變 3 欄
- `PanelCard`（`src/components/hud/panel-card.tsx`）的 `accent` 型別新增 `"tier2"`（Discord blurple `--signal-tier2`），使新模組能用設計系統既有的 primitive 呈現品牌色，而非在元件內覆寫邊框樣式
- 全部使用純 Tailwind（arbitrary properties/variants）交付動畫與拖曳互動，不新增 CSS 檔案、不引入 `styled-jsx`；不新增任何 npm 依賴（`swr`、`react-icons` 皆已安裝）

## Capabilities

### New Capabilities

(none — 本次變更以新增 Requirement 的方式併入下列三份既有 spec，不建立新的 capability 目錄)

### Modified Capabilities

- `now-page`: 首頁模組組成新增 `DISCORD_SERVER`（`Page Module Composition` 的固定順序與「M1 不得有其他模組」限制需修改）；`Channels Grid` 的固定四格規格改為三格；`Responsive Behavior` 新增輪播不得造成頁面級橫向捲動的規格
- `live-presence`: 新增 Discord Guild 狀態契約與 Route Handler 的即時資料規格，比照既有 Twitch 直播狀態的規格模式
- `design-system`: `PanelCard` 的 HUD primitive 規格新增 `tier2` accent 選項

## Impact

- Affected specs: `now-page`, `live-presence`, `design-system`
- Affected code:
  - New:
    - src/lib/discord/invite.ts
    - src/lib/now-page/discord.ts
    - src/lib/now-page/bibi-features.ts
    - src/app/api/discord/guild/route.ts
    - src/hooks/use-discord-guild.ts
    - src/hooks/use-drag-scroll.ts
    - src/components/now/discord-server.tsx
    - src/components/now/discord-stat-rail.tsx
    - src/components/now/bibi-feature-carousel.tsx
    - src/components/now/bibi-feature-card.tsx
    - src/components/now/bibi-preview.tsx
  - Modified:
    - src/app/page.tsx
    - src/lib/now-page/channels.ts
    - src/components/now/channels-grid.tsx
    - src/components/hud/panel-card.tsx
    - .env.example
  - Removed: (none)
