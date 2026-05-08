## ADDED Requirements

### Requirement: Page Module Composition (implemented)

The home page at `/` SHALL render modules in the following fixed order: HUD_HEADER, TWITCH_STREAM, CHANNELS_GRID, WHISPER_TERMINAL. No other modules SHALL appear in M1. Each module SHALL render independently — a failure in one module MUST NOT prevent other modules from rendering.

#### Scenario: Modules render in correct order on desktop

- **WHEN** the user visits `/` on a viewport ≥1280px wide
- **THEN** the DOM SHALL contain, in vertical order: `data-module="hud-header"`, `data-module="twitch-stream"`, `data-module="channels-grid"`, `data-module="whisper-terminal"`
- **AND** each module SHALL be visible without horizontal scrolling

#### Scenario: Module isolation on API failure

- **WHEN** the Twitch API Route Handler returns a 500 error
- **THEN** the TWITCH_STREAM module SHALL render the offline placeholder
- **AND** CHANNELS_GRID and WHISPER_TERMINAL SHALL still render normally

### Requirement: HUD Header (implemented)

The HUD header SHALL be a fixed-height (56px) bar displayed at the top of the home page, containing the site identity, live status indicator, and a real-time Taipei clock.

#### Scenario: Header displays identity and clock

- **WHEN** the user visits `/`
- **THEN** the header SHALL display the text `SHUSHU.SYS` and a version string
- **AND** the right side SHALL display a time string in `HH:MM:SS` format updating every second
- **AND** the time SHALL reflect the `Asia/Taipei` timezone

#### Scenario: Header shows live status when streaming

- **WHEN** the `useTwitchStream` hook returns `{ status: "live" }`
- **THEN** the HUD header SHALL display a `StatusDot` with `state="live"` (pulsing mint)
- **AND** the text `LIVE` SHALL be visible adjacent to the dot

#### Scenario: Header shows idle status when offline

- **WHEN** the `useTwitchStream` hook returns `{ status: "offline" }` or `{ status: "unknown" }`
- **THEN** the HUD header SHALL display a `StatusDot` with `state="offline"` (dim, no animation)

#### Scenario: Clock SSR safety

- **WHEN** the page is server-rendered before hydration
- **THEN** the clock area SHALL display `--:--:--` or be empty
- **AND** the browser console SHALL contain zero hydration mismatch warnings related to the clock

### Requirement: Twitch Stream Hero (implemented)

The TWITCH_STREAM module SHALL be the primary visual element, spanning full width, and displaying either a live CRT-framed player or an offline placeholder depending on the stream state from `useTwitchStream`.

#### Scenario: Live state — CRT frame with embedded player

- **WHEN** `useTwitchStream` returns `{ status: "live", title, gameName, viewerCount, startedAt }`
- **THEN** the module SHALL display a Twitch player iframe for channel `shushu010829`
- **AND** the iframe SHALL be wrapped in a CRT-style frame with corner accents, a scanline overlay region, and a red REC pulse indicator in the top-left
- **AND** a HUD bar below the player SHALL display the stream title, game name, viewer count, and uptime derived from `startedAt`

#### Scenario: Offline state — placeholder with last-live info

- **WHEN** `useTwitchStream` returns `{ status: "offline" }`
- **THEN** the module SHALL display an offline placeholder with a grayscale noise background
- **AND** the text `OFFLINE` SHALL be visible in `--text-muted` color
- **AND** a `TUNE IN @ TWITCH` CTA button SHALL link to `https://twitch.tv/shushu010829` and open in a new tab

#### Scenario: Unknown state — safe fallback

- **WHEN** `useTwitchStream` returns `{ status: "unknown" }` or throws
- **THEN** the module SHALL render the same offline placeholder layout
- **AND** no error message or stack trace SHALL be shown to the user

#### Scenario: Iframe parent domain

- **WHEN** the live Twitch iframe is rendered
- **THEN** the iframe `src` SHALL include `parent=shushu.tw` and `parent=localhost` query parameters

### Requirement: Channels Grid (implemented)

The CHANNELS_GRID module SHALL display exactly four social platform tiles — TWITCH, DISCORD, YOUTUBE, TWITTER — in a responsive grid. Each tile SHALL be fully clickable and link to the corresponding platform profile.

#### Scenario: Four-column layout on desktop

- **WHEN** the user views the page on a viewport ≥1280px
- **THEN** all four channel tiles SHALL be displayed in a single row of four columns

#### Scenario: Two-column layout on tablet

- **WHEN** the user views the page on a viewport between 768px and 1279px
- **THEN** the four channel tiles SHALL be displayed in two rows of two columns

#### Scenario: Single-column layout on mobile

- **WHEN** the user views the page on a viewport <768px
- **THEN** the four channel tiles SHALL be displayed in a single column

#### Scenario: Entire tile is clickable

- **WHEN** the user clicks anywhere on a channel tile
- **THEN** the corresponding platform URL SHALL open in a new tab
- **AND** the click target SHALL cover the full tile area, not just the label text

#### Scenario: Live Twitch tile receives accent

- **WHEN** `useTwitchStream` returns `{ status: "live" }`
- **THEN** the TWITCH channel tile SHALL display with `--signal-live` accent color on its border
- **AND** its `StatusDot` SHALL have `state="live"`

### Requirement: WHISPER Terminal (implemented)

The WHISPER_TERMINAL module SHALL provide a terminal-styled anonymous message input that sends messages to the existing `shustream.zeabur.app` backend and gives terminal-style feedback.

#### Scenario: Submit disabled under 10 characters

- **WHEN** the user types fewer than 10 characters in the WHISPER input
- **THEN** the submit button SHALL be disabled with `cursor: not-allowed`

#### Scenario: Successful message dispatch

- **WHEN** the user types 10 or more characters and submits
- **THEN** the POST request SHALL be sent to `NEXT_PUBLIC_MESSAGE_BOARD_URL`
- **AND** on a 201 response the terminal SHALL display the echo line `> message received · thank you ✓` in `--signal-live` color
- **AND** the input field SHALL be cleared

#### Scenario: Failed message dispatch

- **WHEN** the POST request fails (network error or non-201 response)
- **THEN** the terminal SHALL display `> [ERR] dispatch failed` in `--signal-alert` color
- **AND** no unhandled exception SHALL be thrown to the browser console

### Requirement: Responsive Behavior (implemented)

The home page SHALL support three breakpoints: mobile (<768px), tablet (768–1279px), and desktop (≥1280px). All modules SHALL be accessible and usable at each breakpoint.

#### Scenario: Twitch player hidden on mobile

- **WHEN** the user views the page on a viewport <768px
- **THEN** the Twitch iframe SHALL NOT be rendered
- **AND** the TWITCH_STREAM module SHALL display the offline placeholder layout or a static thumbnail with a "TUNE IN" CTA instead

#### Scenario: No horizontal scrollbar at any breakpoint

- **WHEN** the user views the page at 375px, 768px, 1280px, or 1920px viewport widths
- **THEN** `document.body.scrollWidth` SHALL equal `window.innerWidth`
- **AND** no horizontal scrollbar SHALL be visible
