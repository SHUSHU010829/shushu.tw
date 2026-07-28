# live-presence Specification

## Purpose

TBD - created by archiving change 'add-cyberpunk-now-page'. Update Purpose after archive.

## Requirements

### Requirement: Twitch Stream State Contract (implemented)

The live-presence capability SHALL provide a `useTwitchStream` React hook that returns the current Twitch stream state for channel `shushu010829`. All state fetching SHALL happen through a server-side Route Handler so that Twitch API credentials are never exposed to the client.

#### Scenario: Hook returns live state when streaming

- **WHEN** the `useTwitchStream` hook is mounted
- **AND** the Twitch Helix API `getStreams` call returns a stream record for `shushu010829`
- **THEN** the hook SHALL return `{ status: "live", title: string, gameName: string, viewerCount: number, startedAt: string, thumbnailUrl: string }`

#### Scenario: Hook returns offline state when not streaming

- **WHEN** the `useTwitchStream` hook is mounted
- **AND** the Twitch Helix API `getStreams` call returns an empty data array
- **THEN** the hook SHALL return `{ status: "offline" }`

#### Scenario: Hook returns unknown state on fetch failure

- **WHEN** the `useTwitchStream` hook is mounted
- **AND** the `/api/twitch/stream` Route Handler returns a non-200 status or throws
- **THEN** the hook SHALL return `{ status: "unknown" }` without throwing
- **AND** the hook SHALL retry according to SWR's default retry behavior

#### Scenario: Polling interval

- **WHEN** the `useTwitchStream` hook is mounted and the page remains open
- **THEN** the hook SHALL re-fetch stream state at most once every 60 seconds
- **AND** it SHALL also re-fetch when the browser tab regains focus


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
### Requirement: Twitch API Route Handler (implemented)

The system SHALL provide a Next.js Route Handler at `GET /api/twitch/stream` that fetches the current stream state using Twitch App Access Token authentication and returns it as JSON. The response SHALL be cached at the edge for 60 seconds.

#### Scenario: Route returns live stream data

- **WHEN** `GET /api/twitch/stream` is called
- **AND** the Twitch broadcaster is live
- **THEN** the response SHALL be HTTP 200 with JSON `{ status: "live", title, gameName, viewerCount, startedAt, thumbnailUrl }`
- **AND** the response SHALL include `Cache-Control: s-maxage=60, stale-while-revalidate=30`

#### Scenario: Route returns offline status

- **WHEN** `GET /api/twitch/stream` is called
- **AND** the broadcaster is not live
- **THEN** the response SHALL be HTTP 200 with JSON `{ status: "offline" }`

#### Scenario: Route returns unknown on Twitch API error

- **WHEN** the Twitch Helix API returns a non-200 response or the token is invalid
- **THEN** `GET /api/twitch/stream` SHALL return HTTP 200 with JSON `{ status: "unknown" }`
- **AND** the response SHALL NOT expose API credentials or internal error details

#### Scenario: Credentials never exposed to client

- **WHEN** any page in the application is rendered
- **THEN** `TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET`, and any Twitch OAuth token SHALL NOT appear in any client-side JavaScript bundle or network response visible to the browser


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
### Requirement: Data Source Fallback Contract (implemented)

Any live-presence data source that fails SHALL degrade gracefully without blocking the rendering of other modules or the overall page. This contract applies to all data sources added in future changes (M2+).

#### Scenario: Single source failure does not break page

- **WHEN** a live-presence Route Handler returns a non-200 status
- **THEN** the corresponding module SHALL render a placeholder or last-known state
- **AND** all other modules on the page SHALL continue to render normally
- **AND** no uncaught error SHALL propagate to the React error boundary at the page level

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
### Requirement: Discord Guild State Contract

The live-presence capability SHALL provide a `useDiscordGuild` React hook that returns the current Discord guild state for the invite code `shushu010829`. All state fetching SHALL happen through a server-side Route Handler.

#### Scenario: Hook returns ok state with guild data

- **WHEN** the `useDiscordGuild` hook is mounted
- **AND** the Discord invite API returns a resolvable invite with member and online counts
- **THEN** the hook SHALL return `{ status: "ok", guildId, name, description, iconUrl, memberCount, onlineCount, boostCount, boostTier }`

#### Scenario: Hook returns unavailable state when invite is gone

- **WHEN** the `useDiscordGuild` hook is mounted
- **AND** the Discord invite API returns HTTP 404 or an unknown-invite error code
- **THEN** the hook SHALL return `{ status: "unavailable" }`

#### Scenario: Hook returns unknown state on fetch failure

- **WHEN** the `useDiscordGuild` hook is mounted
- **AND** the `/api/discord/guild` Route Handler returns a non-200 status, throws, or the network request fails
- **THEN** the hook SHALL return `{ status: "unknown" }` without throwing

#### Scenario: Polling interval

- **WHEN** the `useDiscordGuild` hook is mounted and the page remains open
- **THEN** the hook SHALL re-fetch guild state at most once every 300 seconds
- **AND** it SHALL also re-fetch when the browser tab regains focus

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
-->

---
### Requirement: Discord Guild Route Handler

The system SHALL provide a Next.js Route Handler at `GET /api/discord/guild` that fetches guild data from the unauthenticated Discord invite endpoint (`GET https://discord.com/api/v10/invites/{code}?with_counts=true`) and returns it as JSON. The upstream fetch SHALL specify an explicit revalidation interval so the Next.js Data Cache does not freeze the response indefinitely. The response SHALL always be HTTP 200 and SHALL be cached at the edge for 300 seconds.

#### Scenario: Route returns guild data

- **WHEN** `GET /api/discord/guild` is called
- **AND** the upstream invite resolves with member and online counts
- **THEN** the response SHALL be HTTP 200 with JSON `{ status: "ok", guildId, name, description, iconUrl, memberCount, onlineCount, boostCount, boostTier }`
- **AND** the response SHALL include `Cache-Control: s-maxage=300, stale-while-revalidate=600`

#### Scenario: Route returns unavailable on gone invite

- **WHEN** the upstream invite endpoint returns HTTP 404 or an unknown-invite error code
- **THEN** `GET /api/discord/guild` SHALL return HTTP 200 with JSON `{ status: "unavailable" }`

#### Scenario: Route returns unknown on upstream error

- **WHEN** the upstream invite endpoint returns any other non-200 response, times out, or returns malformed JSON
- **THEN** `GET /api/discord/guild` SHALL return HTTP 200 with JSON `{ status: "unknown" }`
- **AND** the response SHALL NOT expose upstream error details, status codes, or URLs to the client

#### Scenario: Counts stay fresh across polling cycles

- **WHEN** the upstream Discord member or online count changes between two polling cycles at least 300 seconds apart
- **THEN** a subsequent `GET /api/discord/guild` call SHALL reflect the updated count rather than a frozen first-fetch value

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
-->
