## Why

`/songs`（曲庫瀏覽與 Twitch 登入點歌頁面，change `add-twitch-song-requests` 建立並已歸檔）目前是一個完全沒有入口連結的孤島頁面——觀眾必須事先知道確切網址才能造訪。當初刻意不從首頁連過去，是因為首頁模組順序被 `now-page` spec 的「Page Module Composition」需求鎖定。現在需要在不打破那個鎖定的前提下，補上一個從首頁通往 `/songs` 的入口。

## What Changes

- 在既有的 HUD_HEADER 模組（`src/components/now/hud-header.tsx`）左側站台識別區塊，`SHUSHU.SYS` 文字後方新增一個小分隔線與一個連到 `/songs` 的文字連結。
- 不新增模組、不移除模組、不調整 HUD_HEADER、TWITCH_STREAM、CHANNELS_GRID、DISCORD_SERVER、WHISPER_TERMINAL 這五個模組的順序。
- 不更動 HUD_HEADER 既有的即時狀態（StatusDot／LIVE／OFFLINE）與時鐘功能的版面、邏輯或測試情境。

## Non-Goals

- 不在 `/songs` 頁面本身做任何改動。
- 不新增任何 capability，也不建立任何新的 `openspec/specs/<name>/` 目錄——這是對既有 `now-page` capability 的 MODIFIED Requirements。
- 不調整響應式斷點行為（mobile／tablet／desktop）之外的排版；連結在窄螢幕上的顯示比照既有 `SHUSHU.SYS` 文字的縮放與截斷方式，不另外設計手機版特殊互動。
- 不做導覽選單、下拉選單或其他多入口設計——只加一個單一文字連結。

## Capabilities

### New Capabilities

(none)

### Modified Capabilities

- `now-page`: 「HUD Header」需求新增一條 scenario，描述站台識別區塊新增一個連到 `/songs` 的連結；「Page Module Composition」需求本身（模組清單與順序）不變。

## Impact

- Affected specs: `now-page`（MODIFIED）
- Affected code:
  - Modified: `src/components/now/hud-header.tsx`
  - New: (none)
  - Removed: (none)
