# design-system Specification

## Purpose

TBD - created by archiving change 'add-cyberpunk-now-page'. Update Purpose after archive.

## Requirements

### Requirement: Cyberpunk Color Tokens (implemented)

The design system SHALL define a fixed set of cyberpunk color tokens as CSS custom properties on `:root` in `src/app/globals.css`. All Tailwind color utilities and component styles SHALL consume these tokens via `var(--token-name)` rather than hardcoded hex values.

#### Scenario: Core tokens available at runtime

- **WHEN** any page in the application boots
- **THEN** `getComputedStyle(document.documentElement)` SHALL return non-empty string values for `--surface-void`, `--surface-panel`, `--surface-tile`, `--signal-live`, `--signal-alert`, `--signal-sub`, `--signal-cheer`, `--border-faint`, `--border-subtle`, `--border-strong`, `--text-primary`, `--text-body`, `--text-muted`, `--text-subtle`, `--text-dim`

#### Scenario: shadcn compatibility tokens available

- **WHEN** any page in the application boots
- **THEN** `getComputedStyle(document.documentElement)` SHALL return non-empty values for `--background`, `--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--input`, `--ring`, `--radius`
- **AND** every shadcn/ui component (button, card, separator, alert-dialog) SHALL render without transparent fallback backgrounds

#### Scenario: No hardcoded hex in component files

- **WHEN** a developer searches the `src/components/` directory for hex color patterns (`#[0-9A-Fa-f]{3,8}`)
- **THEN** zero matches SHALL be found outside of `globals.css` and `tailwind.config.ts`


<!-- @trace
source: add-cyberpunk-now-page
updated: 2026-05-09
code:
  - src/components/ui/button.tsx
  - src/components/theme-toggle.tsx
  - CLAUDE.md
  - src/components/ui/background-gradient.tsx
  - src/components/hud/hud-label.tsx
  - src/components/now/channel-tile.tsx
  - src/app/luckyDraw/components/setting.tsx
  - src/app/globals.css
  - src/components/ui/sheet.tsx
  - src/lib/now-page/channels.ts
  - src/app/api/og/route.tsx
  - src/app/luckyDraw/components/history.tsx
  - src/app/luckyDraw/components/footer.tsx
  - package.json
  - src/components/ask-box.tsx
  - src/components/footer.tsx
  - src/components/hud/status-dot.tsx
  - src/app/page.tsx
  - src/components/now/whisper-terminal.tsx
  - src/lib/twitch/helix.ts
  - src/app/api/messageBoard.ts
  - src/app/luckyDraw/components/drawButton.tsx
  - tailwind.config.ts
  - .env.example
  - src/components/now/twitch-stream.tsx
  - src/components/ui/meteors.tsx
  - src/components/self-card.tsx
  - src/app/layout.tsx
  - src/components/now/channels-grid.tsx
  - src/components/now/hud-header.tsx
  - src/components/effects/crt-scanline.tsx
  - src/components/social-link.tsx
  - src/hooks/use-tpe-clock.ts
  - src/lib/twitch/token-manager.ts
  - src/app/api/twitch/stream/route.ts
  - src/components/hud/panel-card.tsx
  - src/hooks/use-twitch-stream.ts
  - .spectra.yaml
-->

---
### Requirement: Typography Token System (implemented)

The design system SHALL define typography tokens that map font families to CSS custom properties, with Space Mono used for all HUD/machine-readable elements and Noto Sans TC for Chinese body text.

#### Scenario: Mono font applied to HUD labels

- **WHEN** a component uses the `font-mono` Tailwind utility or `var(--font-mono)` CSS property
- **THEN** the rendered font SHALL be Space Mono or a system monospace fallback
- **AND** the font SHALL be loaded via `next/font/google` without layout shift

#### Scenario: Sans font applied to Chinese text

- **WHEN** a component renders Chinese characters using `font-sans` Tailwind utility
- **THEN** the rendered font SHALL be Noto Sans TC


<!-- @trace
source: add-cyberpunk-now-page
updated: 2026-05-09
code:
  - src/components/ui/button.tsx
  - src/components/theme-toggle.tsx
  - CLAUDE.md
  - src/components/ui/background-gradient.tsx
  - src/components/hud/hud-label.tsx
  - src/components/now/channel-tile.tsx
  - src/app/luckyDraw/components/setting.tsx
  - src/app/globals.css
  - src/components/ui/sheet.tsx
  - src/lib/now-page/channels.ts
  - src/app/api/og/route.tsx
  - src/app/luckyDraw/components/history.tsx
  - src/app/luckyDraw/components/footer.tsx
  - package.json
  - src/components/ask-box.tsx
  - src/components/footer.tsx
  - src/components/hud/status-dot.tsx
  - src/app/page.tsx
  - src/components/now/whisper-terminal.tsx
  - src/lib/twitch/helix.ts
  - src/app/api/messageBoard.ts
  - src/app/luckyDraw/components/drawButton.tsx
  - tailwind.config.ts
  - .env.example
  - src/components/now/twitch-stream.tsx
  - src/components/ui/meteors.tsx
  - src/components/self-card.tsx
  - src/app/layout.tsx
  - src/components/now/channels-grid.tsx
  - src/components/now/hud-header.tsx
  - src/components/effects/crt-scanline.tsx
  - src/components/social-link.tsx
  - src/hooks/use-tpe-clock.ts
  - src/lib/twitch/token-manager.ts
  - src/app/api/twitch/stream/route.ts
  - src/components/hud/panel-card.tsx
  - src/hooks/use-twitch-stream.ts
  - .spectra.yaml
-->

---
### Requirement: HUD Primitive Components (implemented)

The design system SHALL provide three reusable primitive components — `PanelCard`, `HudLabel`, and `StatusDot` — that all now-page modules MUST use as their building blocks. `PanelCard`'s `accent` prop SHALL support the values `"live"`, `"idle"`, `"sub"`, `"cheer"`, and `"tier2"`.

#### Scenario: PanelCard renders corner accents

- **WHEN** `PanelCard` is rendered with an `accent` prop
- **THEN** the card SHALL display four corner accent marks using `--border-faint` color by default
- **AND** when `accent="live"` the corner marks SHALL use `--signal-live` color

#### Scenario: PanelCard renders tier2 accent

- **WHEN** `PanelCard` is rendered with `accent="tier2"`
- **THEN** the card's border and corner marks SHALL use `--signal-tier2` color

#### Scenario: HudLabel renders uppercase monospace label

- **WHEN** `HudLabel` is rendered with a `label` prop value of `"STREAM_STATUS"`
- **THEN** the output SHALL display `// STREAM_STATUS` in Space Mono font
- **AND** letter-spacing SHALL be 0.22em
- **AND** the text SHALL be uppercase

#### Scenario: StatusDot animates when live

- **WHEN** `StatusDot` is rendered with `state="live"`
- **THEN** the dot SHALL display in `--signal-live` color with a sonar ping animation
- **WHEN** the user has enabled `prefers-reduced-motion`
- **THEN** the ping animation SHALL be disabled and the dot SHALL remain static

#### Scenario: StatusDot shows correctly for offline state

- **WHEN** `StatusDot` is rendered with `state="offline"`
- **THEN** the dot SHALL display in `--text-dim` color without animation


<!-- @trace
source: add-discord-server-module
updated: 2026-07-28
code:
  - .env.example
  - src/app/page.tsx
  - src/components/hud/panel-card.tsx
  - src/components/now/channels-grid.tsx
  - src/lib/now-page/channels.ts
  - src/app/api/discord/guild/route.ts
  - src/lib/discord/invite.ts
  - src/hooks/use-discord-guild.ts
  - src/hooks/use-drag-scroll.ts
  - src/lib/now-page/discord.ts
  - src/lib/now-page/bibi-features.ts
  - src/components/now/discord-server.tsx
  - src/components/now/discord-stat-rail.tsx
  - src/components/now/bibi-feature-carousel.tsx
  - src/components/now/bibi-feature-card.tsx
  - src/components/now/bibi-preview.tsx
  - src/components/hud/panel-card.tsx
  - src/hooks/use-twitch-stream.ts
  - .spectra.yaml
-->

---
### Requirement: CRT Scanline Overlay (implemented)

The design system SHALL provide a `CrtScanline` component that renders a subtle full-page scanline effect on the home page only, without interfering with interactions or the `/luckyDraw` route.

#### Scenario: Overlay renders on home page

- **WHEN** the user visits `/`
- **THEN** a fixed-position overlay SHALL be visible covering the full viewport
- **AND** the overlay SHALL use `repeating-linear-gradient` with 1.2% opacity mint lines every 3px
- **AND** the overlay SHALL have `pointer-events: none` so it does not intercept clicks

#### Scenario: Overlay absent on luckyDraw

- **WHEN** the user visits `/luckyDraw`
- **THEN** no CRT scanline overlay SHALL be rendered

#### Scenario: Overlay disabled for reduced motion

- **WHEN** the user has `prefers-reduced-motion: reduce` enabled in their OS
- **THEN** the CRT scanline overlay animation SHALL be disabled

<!-- @trace
source: add-cyberpunk-now-page
updated: 2026-05-09
code:
  - src/components/ui/button.tsx
  - src/components/theme-toggle.tsx
  - CLAUDE.md
  - src/components/ui/background-gradient.tsx
  - src/components/hud/hud-label.tsx
  - src/components/now/channel-tile.tsx
  - src/app/luckyDraw/components/setting.tsx
  - src/app/globals.css
  - src/components/ui/sheet.tsx
  - src/lib/now-page/channels.ts
  - src/app/api/og/route.tsx
  - src/app/luckyDraw/components/history.tsx
  - src/app/luckyDraw/components/footer.tsx
  - package.json
  - src/components/ask-box.tsx
  - src/components/footer.tsx
  - src/components/hud/status-dot.tsx
  - src/app/page.tsx
  - src/components/now/whisper-terminal.tsx
  - src/lib/twitch/helix.ts
  - src/app/api/messageBoard.ts
  - src/app/luckyDraw/components/drawButton.tsx
  - tailwind.config.ts
  - .env.example
  - src/components/now/twitch-stream.tsx
  - src/components/ui/meteors.tsx
  - src/components/self-card.tsx
  - src/app/layout.tsx
  - src/components/now/channels-grid.tsx
  - src/components/now/hud-header.tsx
  - src/components/effects/crt-scanline.tsx
  - src/components/social-link.tsx
  - src/hooks/use-tpe-clock.ts
  - src/lib/twitch/token-manager.ts
  - src/app/api/twitch/stream/route.ts
  - src/components/hud/panel-card.tsx
  - src/hooks/use-twitch-stream.ts
  - .spectra.yaml
-->