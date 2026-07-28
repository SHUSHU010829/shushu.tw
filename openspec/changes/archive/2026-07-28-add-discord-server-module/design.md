## Context

首頁採用 Spectra SDD 管理，`openspec/specs/now-page/spec.md` 目前鎖定四個模組的固定順序，`Channels Grid` 規格鎖定「恰好四格：TWITCH, DISCORD, YOUTUBE, TWITTER」。Discord 的即時資料目前完全缺席——`src/lib/now-page/channels.ts` 對 Discord 只有靜態的 `handle` 與寫死字串 `statusText: "last · 2d"`。

已驗證可行的資料來源：`GET https://discord.com/api/v10/invites/shushu010829?with_counts=true` 免認證即可取得 `guild.name`、`guild.icon`、`profile.member_count`、`profile.online_count`、`guild.premium_subscription_count`、`guild.premium_tier`。Guild widget endpoint 已停用（回傳 code 50004），不可作為資料來源。CDN icon URL（`https://cdn.discordapp.com/icons/<id>/<hash>.png?size=128`）已驗證可存取。

現有的 `src/lib/twitch/helix.ts` → `src/app/api/twitch/stream/route.ts` → `src/hooks/use-twitch-stream.ts` 三層架構是本專案唯一一條已上線的即時資料管線，是本次 Discord 管線的直接範本。bibi-website（`bibi.shushu.tw`，逼逼機器人 BIBIBOT 的宣傳站）的 `src/app/_components/feature-scroll.tsx` 是唯一可用的橫向拖曳輪播實作範本，但其視覺語言（暖色鼠尾草、襯線字、18px 圓角）與 shushu.tw 的賽博龐克 HUD（薄荷/blurple、等寬字、硬邊）完全不同，必須重新換膚而非直接複製。

## Goals / Non-Goals

**Goals:**

- 讓 Discord 從「四格 tile 之一」升級為獨立全寬模組，呈現真實伺服器身分與即時人數
- 移植 BIBIBOT 七大玩法輪播作為「加入伺服器能做什麼」的具體展示，並完整套用 shushu.tw 的 HUD 設計語言
- 資料層失效時模組仍可用（伺服器名稱、CTA、輪播全部維持靜態可用），符合現有「每個模組須獨立失效」的架構原則
- 沿用既有的 SWR + Route Handler 模式，不引入新的資料抓取典範
- 全程使用 Tailwind 交付樣式，不新增元件層級的 CSS 檔案或新的樣式方案

**Non-Goals:**

- 不實作 Discord OAuth 登入或任何需要使用者授權的功能
- 不依賴 Discord guild widget（已確認停用）或任何需要 bot token／伺服器端密鑰的 Discord API
- 不對 `/luckyDraw` 子應用做任何改動
- 不引入新的 npm 依賴（`swr`、`react-icons` 專案已安裝，直接沿用）
- 不追求把 bibi-website 的輪播「原樣複製」——視覺必須重新換膚以符合 shushu.tw 設計系統
- 不在本次變更中修正 `src/lib/twitch/helix.ts` 既有的 Data Cache 潛在問題，僅記錄於風險章節

## Decisions

### 三態 DiscordGuildState 契約

```ts
export type DiscordGuildState =
  | { status: "ok"; guildId: string; name: string; description: string | null;
      iconUrl: string | null; memberCount: number; onlineCount: number;
      boostCount: number; boostTier: 0 | 1 | 2 | 3 }
  | { status: "unavailable" }
  | { status: "unknown" };
```

比照 `TwitchStreamState` 的 `live | offline | unknown` 三態基數，但語意不同：`unavailable` 代表邀請連結本身失效（HTTP 404 或 Discord code 10006），是已知且可處理的狀態，CTA 應降級為純文字提示；`unknown` 代表暫時性失敗（網路例外、429、JSON 格式異常），CTA 應維持樂觀（仍指向固定的邀請連結）。兩者拆開的理由是：伺服器改名或邀請碼失效需要人工介入（透過 `DISCORD_INVITE_CODE` 環境變數修正），而暫時性失敗下一次輪詢就會自我修復，兩者不該用同一個「壞掉了」狀態表示，否則無法針對性提示或除錯。

被否決的替代方案：兩態（`ok | error`）——會讓「邀請碼打錯」與「Discord API 暫時 429」在使用者體驗上完全無法區分，且未來若要針對邀請碼失效顯示不同文案會需要重構型別。

### Route Handler 快取策略：s-maxage=300

`src/app/api/discord/guild/route.ts` 設定 `Cache-Control: s-maxage=300, stale-while-revalidate=600`，較 Twitch route 的 `s-maxage=60` 長 5 倍。理由：成員數與上線數以「天」為單位變動，60 秒的新鮮度對使用者無感知價值；而 invite API 是未認證端點，沒有官方文件保證的速率限制，300 秒能把上游請求量降到 Twitch 管線的五分之一，降低被限流的機率。

被否決的替代方案：比照 Twitch 用 60 秒——沒有對應的新鮮度需求，純粹增加限流風險。

### 上游 fetch 顯式帶 next.revalidate 避免 Data Cache 凍結

`getGuildFromInvite()` 內的 `fetch` 呼叫必須顯式傳入 `{ next: { revalidate: 300 } }`。Next.js 14 App Router 預設把 Route Handler 內的裸 `fetch` 以 `force-cache` 語意寫入 Data Cache——若不指定 `revalidate`，回應會在第一次成功後永久凍結，之後即使伺服器人數真的變動，API 也會一直回傳同一組舊數字，且外觀上完全正常（HTTP 200、資料結構正確），是最難察覺的一類無聲失敗。此為本次變更中優先權最高的實作正確性要求，需在 tasks 中設專門的驗證步驟（等待 6 分鐘或重啟後比對數字是否更新）。

備註：`src/lib/twitch/helix.ts` 現有程式碼有相同的潛在問題，只是因為請求帶有會變動的 `Authorization` header 而被意外遮蓋（不同 header 值在部分快取層可能被視為不同的快取鍵）。此次不修正既有 Twitch 程式碼，僅在 design 中記錄以避免未來誤判 Discord 管線的做法是新問題。

### 靜態優先的模組韌性設計

`DiscordServer` 模組的身分資訊（伺服器名稱、handle、邀請連結、七張玩法卡的全部內容與連結）一律來自 `src/lib/now-page/discord.ts` 與 `src/lib/now-page/bibi-features.ts` 的靜態常數，不依賴 API 回應。`useDiscordGuild()` 的回傳值只控制三個數字與邊框顏色的顯示/降級。即使 `/api/discord/guild` 完全掛掉，使用者仍能看到完整的伺服器介紹與可點擊的七張玩法卡與 JOIN 按鈕——這符合現有「每個模組須獨立失效，Twitch 掛掉不能拖累 Channels Grid」的架構原則，並將其延伸為「即時資料是裝飾，不是模組存在的前提」。

被否決的替代方案：把整個模組包在 SWR 的 loading/error 邊界內、fetch 失敗就顯示整段 skeleton 或錯誤訊息——這會讓一個第三方 API 的暫時故障連帶讓「加入我們的 Discord」這個轉換入口消失，與模組獨立失效的原則矛盾。

### 擴充 PanelCard tier2 accent 而非 className 覆寫

在 `src/components/hud/panel-card.tsx` 的 `Accent` 型別新增 `"tier2"`，並在 `accentBorderMap` 補上對應的 `border-[hsl(var(--signal-tier2))] [--corner-color:var(--signal-tier2)]`。理由：`PanelCard` 是 design-system spec 明訂「所有 now-page 模組皆須以此類 primitive 為 building block」的元件，若改用 `className` 覆寫邊框顏色，一來會與 `cn()` 內部的 `tailwind-merge` 對 `border-*` class 的合併順序產生不確定性，二來會把 `--corner-color` 這個原本屬於 primitive 內部實作細節的 CSS 變數洩漏到 feature 層元件，違反封裝。

被否決的替代方案：在 `discord-server.tsx` 用 `className="border-[hsl(var(--signal-tier2))] ..."` 覆寫——實作成本低，但需要多份 spec delta的代價換來更乾淨的封裝是值得的，因此不採用。

### 純 Tailwind 交付動畫與拖曳樣式

輪播的七個預覽動畫、捲軸樣式與拖曳狀態切換，全部以 Tailwind 的 arbitrary properties/variants（如 `[stroke-dashoffset:240]`、`data-[dragging=true]:snap-none`、`motion-safe:transition-[...]`）實作，不新增 `.css` 檔案、不引入 `styled-jsx`。理由：`src/` 目前沒有任何元件層級的 scoped stylesheet，`globals.css` 僅存放 design token 與一條隔離的 legacy 規則；新增一個樣式方案會製造第二個真相來源，且逃出專案既有的 `prettier-plugin-tailwindcss` 格式化管轄範圍。`stroke-dashoffset` 動畫與逐一 stagger 延遲這兩個看似需要 CSS 檔案才能表達的效果，實際上都可用 arbitrary property 語法或直接在各元素上寫死 `transition-delay` 達成（七張卡片與其中的球/牌/金幣皆為手寫的固定數量元素，不需要 `:nth-child` 選擇器）。

被否決的替代方案：新增 `styled-jsx` 區塊或在 `globals.css` 加 `@layer components` 集中管理——皆會引入專案目前沒有的第二種樣式典範，維護成本高於效益。

### 拖曳捲軸不使用負 margin bleed

bibi-website 原始實作用 `margin: 0 -40px` 讓輪播超出容器邊界以貼齊頁面邊緣。此次移植明確排除這個做法，改由 `PanelCard` 的 `p-0` 搭配捲軸自身的 `padding-inline` 與 `scroll-padding-left` 控制留白。理由：負 margin 是造成 `document.body.scrollWidth > window.innerWidth` 的常見成因，會直接違反 `now-page` spec 既有的「任何斷點下不得出現水平捲軸」規格場景，這是一條已有自動化驗證意圖的規格，不容許為了視覺效果破壞它。

### 觸控指標排除於拖曳劫持之外

`useDragScroll` 的 `pointerdown` handler 在 `event.pointerType === "touch"` 時直接 `return`，完全不介入捲動邏輯，讓觸控裝置使用瀏覽器原生的慣性捲動與 rubber-band 效果。bibi-website 原始實作沒有這個判斷，導致其 JS 手動計算的 `scrollLeft` 邏輯與觸控原生捲動互相干擾。理由：原生觸控捲動的手感在所有行動瀏覽器上都優於任何 JS 重新實作的版本，沒有理由用程式碼覆蓋它。

### 圖示用原生 <img> 而非 next/image

伺服器 icon 使用固定尺寸容器內的原生 `<img loading="lazy" decoding="async">`，失敗或未載入時退回 `react-icons/fa6` 的 `FaDiscord`。理由：改用 `next/image` 需要在目前完全空白的 `next.config.mjs` 加入 `images.remotePatterns` 以允許 `cdn.discordapp.com`，且 icon URL 要等 SWR 在 hydration 後取得資料才會知道，Next.js 的 image optimizer 無法對這種延遲才確定的 URL 做任何預先優化（無法預載、無法在 build time 產生多尺寸），因此引入 `next/image` 在此情境下沒有實質效益，只有維護成本。

### Blurple 色彩限縮於 Discord chrome

`--signal-tier2`（Discord blurple）只用在模組自身的邊框、CTA 按鈕與 icon 框線；輪播七張玩法卡的「通電/啟用」語意動畫狀態一律沿用 `--signal-live`（薄荷綠），樂透的「熱門球」原本在 bibi 用鼠尾草色高亮，重新配色為 `--signal-cheer`（琥珀）而非薄荷，避免與「即時/上線」的薄荷語意混淆。理由：`--signal-live` 在整個設計系統中已經是「這是即時的/正在發生的」的專屬色彩語意（`StatusDot`、Twitch REC 徽章皆用它），如果玩法預覽動畫也大量使用薄荷色，會稀釋這個色彩在使用者心智中的訊號意義。

## Risks / Trade-offs

- [風險] Next.js Data Cache 讓 Discord 人數凍結在第一次取得的值，外觀正常但資料早已過期，難以被肉眼發現 → 緩解：`getGuildFromInvite()` 顯式傳入 `next: { revalidate: 300 }`，並在 tasks 中設置「等待 6 分鐘後重新請求比對數字變化」的手動驗證步驟
- [風險] 未認證的 invite API 沒有官方公開的速率限制文件，高流量下可能被限流（429）→ 緩解：`s-maxage=300` 邊際快取降低上游請求頻率；429 一律映射為 `unknown` 狀態，不影響使用者體感（模組維持全部靜態內容可用）
- [風險] 邀請碼 `shushu010829` 若未來變更或失效，API 回傳 404 → 緩解：狀態機以 `unavailable` 明確表示，模組的伺服器名稱與七張玩法卡仍完整可用；`DISCORD_INVITE_CODE` 環境變數允許不改程式碼即可修正
- [風險] 直接移植 bibi-website 的拖曳捲軸負 margin 手法會破壞既有的「無水平捲軸」規格保證 → 緩解：明確排除負 margin，改用捲軸自身 padding + `scroll-padding-left`，並在 tasks 中於 375/768/1280/1920 四個寬度驗證 `document.body.scrollWidth === window.innerWidth`
- [風險] `--signal-tier2` 在 8% 亮度的 `--surface-tile` 背景下用於小字級文字時對比度偏低 → 緩解：blurple 只用於邊框、CTA 與圖示框線等大面積或粗線條元素，模組內所有內文文字一律使用既有的 `--text-*` 系列 token，CTA 文字字級不低於 11px
- [取捨] 七張玩法卡與其預覽動畫皆為手寫的靜態 JSX，資料量小但因模組整體是 `"use client"` 而全部進入 client bundle → 緩解：把無互動的 `bibi-feature-card.tsx` 與 `bibi-preview.tsx` 設計為 server component，以 children 形式傳入僅有的兩個真正需要 `"use client"` 的元件（`discord-server.tsx` 因使用 SWR、`bibi-feature-carousel.tsx` 因使用指標事件），將 client bundle 增量降到最低
