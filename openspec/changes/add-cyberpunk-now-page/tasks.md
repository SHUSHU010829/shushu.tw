## 0. OpenSpec Initialization

- [x] 0.1 Run `openspec init` in project root — generates `openspec/config.yaml` and `.claude/` skills
- [x] 0.2 Fill in `openspec/config.yaml` with project tech stack, conventions, and constraints
- [x] 0.3 Create change directory and write `proposal.md`, `design.md`, `tasks.md`
- [x] 0.4 Write `specs/design-system/spec.md`, `specs/now-page/spec.md`, `specs/live-presence/spec.md`
- [x] 0.5 Run `openspec validate add-cyberpunk-now-page --strict` and fix all errors until green

## 1. Branch and Dependencies

- [x] 1.1 Create feature branch `feat/cyberpunk-now-page-m1`
- [x] 1.2 Install `swr` — `npm install swr`
- [x] 1.3 Move `svelte` out of `dependencies` (it's unused); move `prettier`, `husky`, `eslint-*`, `@typescript-eslint/*` to `devDependencies`
- [x] 1.4 Create `.env.example` with `TWITCH_CLIENT_ID=`, `TWITCH_CLIENT_SECRET=`, `TWITCH_BROADCASTER_ID=`, `NEXT_PUBLIC_MESSAGE_BOARD_URL=https://shustream.zeabur.app/messageBoard`

## 2. Design System Tokens

- [x] 2.1 In `src/app/globals.css`, add `@layer base { :root { … } }` with all cyberpunk tokens: `--surface-void`, `--surface-panel`, `--surface-panel-2`, `--surface-input`, `--surface-tile`, `--signal-live`, `--signal-alert`, `--signal-sub`, `--signal-cheer`, `--signal-tier2`, `--signal-tier3`, `--signal-raid`, `--signal-hype`, `--border-faint`, `--border-subtle`, `--border-strong`, `--text-primary`, `--text-body`, `--text-muted`, `--text-subtle`, `--text-dim`, `--radius-sm`, `--radius-md`, `--radius-lg`, `--ease-out-expo`
- [x] 2.2 In the same `:root` block, add shadcn-compatible tokens mapped to cyberpunk values: `--background` (maps to surface-void), `--foreground` (maps to text-body), `--primary` (maps to signal-live), `--secondary` (maps to surface-panel-2), `--muted`, `--accent`, `--destructive` (maps to signal-alert), `--border` (maps to border-faint), `--input` (maps to surface-input), `--ring` (maps to signal-live with low opacity), `--radius` (4px)
- [x] 2.3 In `tailwind.config.ts`, update `colors` to reference CSS variables via `hsl(var(--…))` pattern; keep `primary: '#68775F'` as a legacy alias for `.drawBtn` and luckyDraw components
- [x] 2.4 Add `fontFamily.mono` pointing to `['Space Mono', 'ui-monospace', 'monospace']` in `tailwind.config.ts`; load Space Mono via `next/font/google` in `layout.tsx`
- [x] 2.5 Add keyframes in `tailwind.config.ts`: `live-ping` (sonar scale + opacity), `pulse-red` (red dot pulse), `scanline-drift` (slow vertical translate), `signal-glitch` (RGB split — for M2)
- [x] 2.6 Remove the `addVariablesForColors` plugin function from `tailwind.config.ts` (replaced by explicit globals.css tokens)

## 3. HUD Primitive Components

- [x] 3.1 Create `src/components/hud/panel-card.tsx` — wrapper div with `border border-[var(--border-faint)]`, `bg-[var(--surface-tile)]`, `rounded-[var(--radius-md)]`, and four corner accent pseudo-elements; accepts `accent?: 'live' | 'idle' | 'sub' | 'cheer'` prop that changes border color
- [x] 3.2 Create `src/components/hud/hud-label.tsx` — renders `// {label}` in Space Mono, `text-[11px]`, `text-[var(--text-muted)]`, `tracking-[0.22em]`, `uppercase`
- [x] 3.3 Create `src/components/hud/status-dot.tsx` — 8px circle, three states: `live` (`bg-[var(--signal-live)]` + `animate-live-ping`), `idle` (`bg-[var(--text-muted)]`), `offline` (`bg-[var(--text-dim)]`); wrap ping in `@media (prefers-reduced-motion: reduce) { animation: none }`
- [x] 3.4 Create `src/components/effects/crt-scanline.tsx` — `fixed inset-0 pointer-events-none z-50`, `repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,255,135,0.012) 2px 3px)` background; uses `usePathname()` to return null on `/luckyDraw` paths; no animation when `prefers-reduced-motion`

## 4. HUD Header and TPE Clock

- [x] 4.1 Create `src/hooks/use-tpe-clock.ts` — returns `string | null`; on server returns `null`; on client uses `setInterval(1000)` with `Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Taipei', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })` to format current time
- [x] 4.2 Create `src/components/now/hud-header.tsx` — 56px height bar, `bg-[var(--surface-panel)]`, `border-b border-[var(--border-faint)]`; left: `SHUSHU.SYS · v0.1.0` in Space Mono; center: `StatusDot` + `LIVE` text (state from `useTwitchStream`); right: clock from `useTpeClocked` (shows `--:--:--` if null); add `data-module="hud-header"` attribute

## 5. Twitch API Integration

- [x] 5.1 Create `src/lib/twitch/token-manager.ts` — port from OBS repo: in-memory cache of App Access Token (`{ access_token, expires_at }`); `getAppAccessToken()` fetches from `https://id.twitch.tv/oauth2/token` with `client_credentials` grant type using `TWITCH_CLIENT_ID` / `TWITCH_CLIENT_SECRET`; auto-refreshes when within 5 min of expiry
- [x] 5.2 Create `src/lib/twitch/helix.ts` — `getStream(broadcasterId: string): Promise<TwitchStreamState>` using token from `getAppAccessToken()`; calls `GET https://api.twitch.tv/helix/streams?user_id={id}`; maps empty array → `{ status: 'offline' }`, populated array → `{ status: 'live', title, gameName, viewerCount, startedAt, thumbnailUrl }`; define and export `TwitchStreamState` type
- [x] 5.3 Create `src/app/api/twitch/stream/route.ts` — `GET` Route Handler; calls `getStream(TWITCH_BROADCASTER_ID)`; catches all errors and returns `{ status: 'unknown' }`; sets `Cache-Control: s-maxage=60, stale-while-revalidate=30`
- [x] 5.4 Create `src/hooks/use-twitch-stream.ts` — SWR hook wrapping `/api/twitch/stream`; `refreshInterval: 60_000`, `revalidateOnFocus: true`; returns `TwitchStreamState`, defaults to `{ status: 'unknown' }` while loading

## 6. TWITCH_STREAM Hero Component

- [x] 6.1 Create `src/components/now/twitch-stream.tsx` — top-level component; calls `useTwitchStream()`; renders `<LiveView>`, `<OfflineView>`, or `<OfflineView>` (unknown reuses offline) accordingly; add `data-module="twitch-stream"` attribute; wrap in `PanelCard`
- [x] 6.2 Build `LiveView` sub-component (within same file or named export) — outer CRT frame with `relative overflow-hidden`, four corner accents, a `repeating-linear-gradient` scanline overlay at 0.05 opacity; top-left `REC` badge with `animate-pulse-red` dot; iframe `src="https://player.twitch.tv/?channel=shushu010829&parent=shushu.tw&parent=localhost&autoplay=false"`, 16:9 aspect ratio; HUD bar below iframe with `title · gameName · 👁 viewerCount · uptime`
- [x] 6.3 Build `OfflineView` sub-component — grayscale CSS noise background (`background: url("data:image/svg+xml…")` or Tailwind `bg-noise`), `OFFLINE` text in `--text-muted`, `TUNE IN @ TWITCH` anchor styled as mint CTA button opening `https://twitch.tv/shushu010829` in new tab
- [x] 6.4 On mobile viewports (<768px), suppress the iframe and render `OfflineView` regardless of stream status (mobile iframe experience is poor; CTA is enough)
- [x] 6.5 Add `aria-live="polite"` to the stream state region so screen readers announce live/offline transitions

## 7. Channels Grid

- [x] 7.1 Create `src/lib/now-page/channels.ts` — export `CHANNELS: ChannelConfig[]` array with four entries: `{ id: 'twitch' | 'discord' | 'youtube' | 'twitter', displayName, handle, url, accentToken, statusText }`; `accentToken` references a `--signal-*` CSS variable name; `statusText` is M1 static placeholder like `last · 2d`
- [x] 7.2 Create `src/components/now/channel-tile.tsx` — `<a href={url} target="_blank" rel="noopener noreferrer">` wrapping a `PanelCard`; top row: `HudLabel` with platform name + `StatusDot` in top-right; bottom: `statusText` in `--text-muted`; `accent` prop derived from channel config; full tile is the link target
- [x] 7.3 Create `src/components/now/channels-grid.tsx` — `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3`; maps `CHANNELS` to `ChannelTile` components; passes `isLive` boolean from `useTwitchStream` to the TWITCH tile to switch its accent; add `data-module="channels-grid"` attribute

## 8. WHISPER Terminal

- [x] 8.1 Create `src/components/now/whisper-terminal.tsx` — `"use client"` component; state: `value`, `status: 'idle' | 'sending' | 'sent' | 'error'`, `echoLines: string[]`
- [x] 8.2 Render a terminal frame with `PanelCard`, `HudLabel` showing `// WHISPER · 偷偷跟我說`, prompt line `shushu@system:~$ ` + `<input>` in Space Mono, blinking caret CSS animation
- [x] 8.3 Submit logic: call `createMsg(value)` from existing `src/app/api/messageBoard.ts`; replace `NEXT_PUBLIC_MESSAGE_BOARD_URL` usage (currently hardcoded URL in that file); on 201 append `> message received · thank you ✓` in mint; on error append `> [ERR] dispatch failed` in `--signal-alert`
- [x] 8.4 Update `src/app/api/messageBoard.ts` to read URL from `process.env.NEXT_PUBLIC_MESSAGE_BOARD_URL` instead of hardcoded string
- [x] 8.5 Submit button disabled when `value.length < 10` or `status === 'sending'`; add `data-module="whisper-terminal"` to outer element

## 9. Page Composition and RWD

- [x] 9.1 Rewrite `src/app/page.tsx` — `"use client"` (for hooks); import and assemble `HudHeader`, `TwitchStream`, `ChannelsGrid`, `WhisperTerminal`; outer container `min-h-screen bg-[var(--surface-void)] flex flex-col`; inner `max-w-7xl mx-auto px-4 md:px-8 w-full py-4 flex flex-col gap-4`
- [x] 9.2 Update `src/app/layout.tsx` — remove `ThemeToggle` import and usage; import `CrtScanline` and place before `{children}`; add Space Mono to `next/font/google` font list; update metadata `title` to `SHUSHU.SYS // SHUSHU`
- [x] 9.3 Verify RWD visually in browser devtools at 375px, 768px, 1280px, 1920px — check no horizontal scroll, module stacking order, CHANNELS grid columns

## 10. Cleanup and Validation

- [x] 10.1 Delete `src/components/self-card.tsx`, `src/components/social-link.tsx`, `src/components/theme-toggle.tsx`, `src/components/ui/meteors.tsx`, `src/components/ui/background-gradient.tsx`, `src/components/footer.tsx`
- [x] 10.2 Open `/luckyDraw` in browser — take screenshot and confirm `.drawBtn` red button appearance is pixel-identical to pre-M1 baseline; if any color changed, fix globals.css token layering before proceeding
- [x] 10.3 Run `npm run lint` and fix all errors
- [x] 10.4 Run `npm run build` — confirm zero errors; check First Load JS is under 200KB for the `/` route in build output
- [x] 10.5 In each spec file under `openspec/changes/add-cyberpunk-now-page/specs/`, add `(implemented)` comment next to each Requirement header that is fully built
- [ ] 10.6 Create PR on GitHub, get Vercel preview URL, run full manual QA checklist (see plan file); after merge run `openspec archive add-cyberpunk-now-page`
