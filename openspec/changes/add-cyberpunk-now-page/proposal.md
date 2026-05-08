## Why

`shushu.tw` is a static profile card (warm-beige palette) that fails to answer the one question Twitch viewers ask when they click through from the streamer's bio: "Is she live right now?" This change replaces the card with a Cyberpunk Now Page — a live HUD dashboard that shares the same design tokens as SHUSHU's OBS overlay, showing real-time stream status, social channels, and a terminal-style message box.

## What Changes

- Replace `src/app/page.tsx` entirely with a cyberpunk HUD layout (HUD_HEADER → TWITCH_STREAM → CHANNELS → WHISPER)
- Add cyberpunk CSS token system to `globals.css` and align `tailwind.config.ts` to consume them; fix missing shadcn/ui token definitions
- Add `src/components/hud/` primitives: `PanelCard`, `HudLabel`, `StatusDot`
- Add `src/components/effects/CrtScanline` — full-page fixed scanline overlay
- Add Twitch Helix API integration: `src/lib/twitch/`, `src/app/api/twitch/stream/route.ts`, `src/hooks/use-twitch-stream.ts`
- Add TPE clock hook: `src/hooks/use-tpe-clock.ts`
- Add `src/components/now/`: `HudHeader`, `TwitchStream` (CRT frame + iframe), `ChannelTile`, `ChannelsGrid`, `WhisperTerminal`
- Remove legacy components: `SelfCard`, `SocialLink`, `ThemeToggle`, `Meteors`, `BackgroundGradient`, `Footer`
- Add `swr` package; extract message board URL to env var `NEXT_PUBLIC_MESSAGE_BOARD_URL`

## Capabilities

### New Capabilities

- `design-system`: CSS token system (cyberpunk color/surface/border/text/motion variables), HUD primitive components (PanelCard, HudLabel, StatusDot), CRT scanline overlay, shadcn token compatibility layer
- `now-page`: Home page information architecture — module composition order, RWD layout rules, focus flow, WHISPER terminal interaction
- `live-presence`: Twitch Helix API integration — stream state fetch contract, hook interface, Route Handler, fallback behavior

### Modified Capabilities

<!-- None — all three capabilities are newly introduced in this change -->

## Impact

- **`src/app/page.tsx`**: complete rewrite
- **`src/app/globals.css`**: adds ~80 lines of CSS custom properties; existing `.drawBtn` rule preserved
- **`tailwind.config.ts`**: colors point to `hsl(var(--…))`, font families updated, new keyframes added
- **`src/app/layout.tsx`**: ThemeToggle removed, CrtScanline added, metadata title updated
- **`package.json`**: `swr` added to dependencies
- **`/luckyDraw`**: no behavior or visual change (`.drawBtn` protected by explicit QA gate)
- **Environment variables**: three new server-side vars (`TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET`, `TWITCH_BROADCASTER_ID`) and one public var (`NEXT_PUBLIC_MESSAGE_BOARD_URL`)
