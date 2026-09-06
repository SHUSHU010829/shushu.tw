## 1. HUD Header 連結

- [x] 1.1 修改 `src/components/now/hud-header.tsx`，對應 HUD Header (implemented) 需求新增的「Header includes a link to the song request page」情境：在左側站台識別區塊 `SHUSHU.SYS` 文字後加一個小分隔線與一個文字為 `SONGS` 的連結，`href="/songs"`，同分頁導航；比照現有 HUD 風格（等寬字、大寫、`letter-spacing`），顏色使用 `--text-muted`（預設）與 `--signal-live`（hover），不寫死 hex；不影響中間即時狀態區塊與右側時鐘區塊的排版與功能
- [x] 1.2 手動確認三個斷點（<768px、768–1279px、≥1280px）下連結可見、可點擊，且不造成 header 換行或水平捲動
- [x] 1.3 執行 `npm run lint` 確認通過
