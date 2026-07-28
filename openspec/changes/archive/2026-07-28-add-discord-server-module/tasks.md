## 1. Discord 資料管線

- [x] 1.1 建立 `src/lib/discord/invite.ts`：依「三態 DiscordGuildState 契約」決策定義型別與 `getGuildFromInvite()`，並依「上游 fetch 顯式帶 next.revalidate 避免 Data Cache 凍結」決策在 fetch 加入 `next: { revalidate: 300 }`。完成條件：呼叫 `shushu010829` 邀請碼回傳 `status:"ok"` 且含 memberCount/onlineCount/boostCount/boostTier 四個欄位；改用不存在的邀請碼回傳 `status:"unavailable"`。
- [x] 1.2 建立 `src/app/api/discord/guild/route.ts`：依「Route Handler 快取策略：s-maxage=300」決策實作 Discord Guild Route Handler，永遠回傳 HTTP 200、設定 `Cache-Control: s-maxage=300, stale-while-revalidate=600`，斷網或例外時回傳 `status:"unknown"` 且不外洩錯誤細節。完成條件：`curl localhost:3000/api/discord/guild` 在正常／無效邀請碼／斷網三種情境下皆回傳 HTTP 200 與對應狀態。
- [x] 1.3 建立 `src/hooks/use-discord-guild.ts`：實作滿足 Discord Guild State Contract 的 SWR hook，設定 `refreshInterval: 300_000`、`revalidateOnFocus: true`，`fallbackData` 使用模組層級 `FALLBACK` 常數。完成條件：`npm run build` 型別檢查通過，hook 回傳型別為 `DiscordGuildState`。

## 2. PanelCard tier2 擴充

- [x] 2.1 修改 `src/components/hud/panel-card.tsx`：依「擴充 PanelCard tier2 accent 而非 className 覆寫」決策，`Accent` 型別新增 `"tier2"`，`accentBorderMap` 補上 `border-[hsl(var(--signal-tier2))] [--corner-color:var(--signal-tier2)]`，滿足 HUD Primitive Components (implemented) 需求新增的 tier2 場景。完成條件：既有 `live`/`idle`/`sub`/`cheer` 四種 accent 視覺不變，新增的 `tier2` 邊框與角標顯示 blurple。

## 3. Discord 伺服器狀態列

- [x] 3.1 建立 `src/lib/now-page/discord.ts`：靜態常數（`DISCORD_INVITE_CODE`、`DISCORD_INVITE_URL`、`DISCORD_SERVER_NAME = "舒舒的大型儲藏室"`、`BIBI_DOCS_BASE`），實作「靜態優先的模組韌性設計」決策中「身分資訊不依賴 API」的部分。
- [x] 3.2 建立 `src/components/now/discord-stat-rail.tsx`：`<dl>` 三格統計（MEMBERS/ONLINE/BOOSTS）、boost tier 階梯條、JOIN CTA，依「Blurple 色彩限縮於 Discord chrome」決策，blurple 僅用於邊框/CTA/icon 框線，數字用 `Intl.NumberFormat("en-US")` 格式化，未取得時顯示 `---`（`tabular-nums min-w-[4ch] text-right` 避免版位跳動）。完成條件：桌機一列／平板身分列+三欄+整行 CTA／手機三個堆疊列，符合 Discord Server Module 需求的 responsive 場景。
- [x] 3.3 建立 `src/components/now/discord-server.tsx`：`"use client"` 模組殼，`data-module="discord-server"`，`PanelCard accent={ok ? "tier2" : "idle"}`，串接 `useDiscordGuild`，實作 Discord Server Module 需求的 ok / unavailable / unknown 三種渲染分支，JOIN CTA 一律 `target="_blank" rel="noopener noreferrer"` 指向 `https://discord.gg/shushu010829`。完成條件：DevTools console 於首次載入零 hydration mismatch 警告，符合 counts render only after hydration 場景。

## 4. 拖曳輪播基礎設施

- [x] 4.1 建立 `src/hooks/use-drag-scroll.ts`：移植並修正 bibi-website `feature-scroll.tsx` 的拖曳邏輯，依「觸控指標排除於拖曳劫持之外」決策排除 `pointerType === "touch"`，補上 `pointercancel` 清理與左鍵限定（`e.button !== 0` 時略過），保留 4px `moved` 閾值與 capture-phase 的 click 攔截。
- [x] 4.2 建立 `src/components/now/bibi-feature-carousel.tsx`：`"use client"` 捲軸容器，依「拖曳捲軸不使用負 margin bleed」決策不使用負 margin，改用 padding 與 `scroll-padding-left` 控制留白；依「純 Tailwind 交付動畫與拖曳樣式」決策以指令式 `data-dragging` 屬性搭配 `data-[dragging=true]:snap-none` 切換捲動吸附，並加入兩顆方向鍵按鈕（`hidden lg:flex`，`scrollBy`）。完成條件：滿足 BIBIBOT Feature Carousel 需求中「拖曳超過 4px 不觸發導航」與「觸控使用原生捲動」兩個場景；375/768/1280/1920 四個寬度下 `document.body.scrollWidth === window.innerWidth`。

## 5. 玩法資料與卡片

- [x] 5.1 建立 `src/lib/now-page/bibi-features.ts`：七筆玩法資料（挖礦/釣魚/賭場/樂透/股市/經濟/等級，含既有中文 blurb），深連結至 `https://bibi.shushu.tw/docs/mining`、`/fishing`、`/casino`、`/lottery`、`/stocks`、`/economy`、`/leveling`。完成條件：以 `curl -o /dev/null -w "%{http_code}"` 驗證七個網址皆回傳 200。
- [x] 5.2 建立 `src/components/now/bibi-feature-card.tsx`：server component 單張卡，移除 bibi 原本的襯線字與圓角，改用 `font-notoSans` 中文標題 + `font-mono` 英文副標與序號，方形 tag chip 取代膠囊樣式，外連加 `<span className="sr-only">（開新分頁）</span>`，序號與 tag 加 `aria-hidden`。

## 6. 玩法預覽動畫

- [x] 6.1 建立 `src/components/now/bibi-preview.tsx`：七個預覽螢幕，以 `hsl(var(--surface-void))` + 掃描線 overlay 取代 bibi 原本的紙面背景，進度條／SVG 波浪與魚／撲克牌／樂透球／`[stroke-dashoffset:240]` 股價線／金幣堆疊／LV 徽章 XP 條全部以 Tailwind arbitrary properties 實作，樂透 hot 球改用 `--signal-cheer` 而非薄荷色。
- [x] 6.2 為每個預覽加上 `group-hover:` 與 `group-focus-visible:` 雙觸發，純動態效果（抬升/旋轉/彈跳）以 `motion-safe:transition-[...]` 包裹，狀態變化（進度條數值、贏牌變色）不受 `motion-reduce` 影響。完成條件：滿足 BIBIBOT Feature Carousel 需求的「hover 與 focus 皆觸發預覽」與「reduced motion 保留資訊、抑制純動態」兩個場景，macOS「減少動態」開啟後手動驗證。
- [x] 6.3 為 `bibi-feature-carousel.tsx` 的捲軸容器加上 `tabIndex={0}`、`role="region"`、`aria-label="BIBIBOT 功能一覽"`，確認七張卡可依序 Tab 到達且瀏覽器自動 `scrollIntoView`，滿足 carousel is a keyboard-operable labelled region 場景。

## 7. Icon 與網格降級

- [x] 7.1 在 `discord-stat-rail.tsx` 實作伺服器 icon：固定尺寸容器內使用原生 `<img loading="lazy" decoding="async">`，依「圖示用原生 <img> 而非 next/image」決策不修改 `next.config.mjs`，載入失敗或 iconUrl 為 null 時退回 `react-icons/fa6` 的 `FaDiscord`。
- [x] 7.2 修改 `src/lib/now-page/channels.ts` 與 `src/components/now/channels-grid.tsx`：刪除 `discord` 項、`ChannelConfig["id"]` 收斂為 `"twitch" | "youtube" | "twitter"`、`xl:grid-cols-4` 改為 `xl:grid-cols-3`，滿足 Channels Grid (implemented) 需求改為三格的三個版面場景（桌機三欄／平板兩列 2+1／手機單欄）。

## 8. 頁面接線與最終驗收

- [x] 8.1 修改 `src/app/page.tsx`：在 `<ChannelsGrid />` 與 `<WhisperTerminal />` 之間插入 `<DiscordServer />`，滿足 Page Module Composition (implemented) 需求的模組順序與 `data-module="discord-server"` 場景。
- [x] 8.2 新增 `.env.example` 的 `DISCORD_INVITE_CODE=shushu010829` 選用覆寫項。
- [x] 8.3 執行完整 QA：`grep -rE '#[0-9A-Fa-f]{3,8}' src/components/now/ src/components/hud/` 零命中、`npm run lint` 通過、等待至少 6 分鐘後重新請求 `/api/discord/guild` 確認數字未凍結（驗證上游 fetch 顯式帶 next.revalidate 避免 Data Cache 凍結決策生效）、375/768/1280/1920 四個寬度下 `document.body.scrollWidth === window.innerWidth` 皆成立（滿足 Responsive Behavior (implemented) 需求）、手動確認 `/luckyDraw` 外觀未受影響。
