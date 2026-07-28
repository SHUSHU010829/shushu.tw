## MODIFIED Requirements

### Requirement: Page Module Composition (implemented)

The home page at `/` SHALL render modules in the following fixed order: HUD_HEADER, TWITCH_STREAM, CHANNELS_GRID, DISCORD_SERVER, WHISPER_TERMINAL. Modules SHALL be added, removed, or reordered only via an approved spec change. Each module SHALL render independently — a failure in one module MUST NOT prevent other modules from rendering.

#### Scenario: Modules render in correct order on desktop

- **WHEN** the user visits `/` on a viewport ≥1280px wide
- **THEN** the DOM SHALL contain, in vertical order: `data-module="hud-header"`, `data-module="twitch-stream"`, `data-module="channels-grid"`, `data-module="discord-server"`, `data-module="whisper-terminal"`
- **AND** each module SHALL be visible without horizontal scrolling

#### Scenario: Module isolation on API failure

- **WHEN** the Twitch API Route Handler returns a 500 error
- **THEN** the TWITCH_STREAM module SHALL render the offline placeholder
- **AND** CHANNELS_GRID, DISCORD_SERVER, and WHISPER_TERMINAL SHALL still render normally

#### Scenario: Module isolation on Discord API failure

- **WHEN** the `/api/discord/guild` Route Handler returns a non-200 status or throws
- **THEN** the DISCORD_SERVER module SHALL still render its static server identity, its JOIN CTA, and the full BIBIBOT feature carousel
- **AND** HUD_HEADER, TWITCH_STREAM, CHANNELS_GRID, and WHISPER_TERMINAL SHALL still render normally

### Requirement: Channels Grid (implemented)

The CHANNELS_GRID module SHALL display exactly three social platform tiles — TWITCH, YOUTUBE, TWITTER — in a responsive grid. Each tile SHALL be fully clickable and link to the corresponding platform profile.

#### Scenario: Three-column layout on desktop

- **WHEN** the user views the page on a viewport ≥1280px
- **THEN** all three channel tiles SHALL be displayed in a single row of three columns

#### Scenario: Two-column layout on tablet

- **WHEN** the user views the page on a viewport between 768px and 1279px
- **THEN** the three channel tiles SHALL be displayed in two rows, with two columns in the first row and one column in the second row

#### Scenario: Single-column layout on mobile

- **WHEN** the user views the page on a viewport <768px
- **THEN** the three channel tiles SHALL be displayed in a single column

#### Scenario: Entire tile is clickable

- **WHEN** the user clicks anywhere on a channel tile
- **THEN** the corresponding platform URL SHALL open in a new tab
- **AND** the click target SHALL cover the full tile area, not just the label text

#### Scenario: Live Twitch tile receives accent

- **WHEN** `useTwitchStream` returns `{ status: "live" }`
- **THEN** the TWITCH channel tile SHALL display with `--signal-live` accent color on its border
- **AND** its `StatusDot` SHALL have `state="live"`

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

#### Scenario: Discord feature carousel does not cause page-level horizontal scroll

- **WHEN** the user views the page at 375px, 768px, 1280px, or 1920px viewport widths
- **THEN** the BIBIBOT feature carousel inside DISCORD_SERVER SHALL overflow only within its own scroll container
- **AND** `document.body.scrollWidth` SHALL equal `window.innerWidth` at every listed width

## ADDED Requirements

### Requirement: Discord Server Module

The DISCORD_SERVER module SHALL render as a full-width panel positioned between CHANNELS_GRID and WHISPER_TERMINAL, displaying the server's static identity, live member statistics, and a JOIN CTA, independent of whether live data is available.

#### Scenario: Live data available

- **WHEN** `useDiscordGuild` returns `{ status: "ok", name, iconUrl, memberCount, onlineCount, boostCount, boostTier }`
- **THEN** the module SHALL display the server name, icon, member count, online count, and boost count
- **AND** the module's `PanelCard` SHALL use `accent="tier2"`

#### Scenario: Live data unavailable

- **WHEN** `useDiscordGuild` returns `{ status: "unknown" }` or `{ status: "unavailable" }`
- **THEN** the module SHALL display the static server name and handle from `src/lib/now-page/discord.ts`
- **AND** the member count, online count, and boost count SHALL display as `---` placeholders
- **AND** the module's `PanelCard` SHALL use `accent="idle"`
- **AND** the JOIN CTA SHALL remain visible and functional

#### Scenario: JOIN CTA opens invite link

- **WHEN** the user clicks the JOIN SERVER CTA
- **THEN** `https://discord.gg/shushu010829` SHALL open in a new tab via `target="_blank" rel="noopener noreferrer"`

#### Scenario: Counts render only after hydration

- **WHEN** the page is server-rendered before hydration
- **THEN** the member count, online count, and boost count areas SHALL render the identical placeholder markup on server and first client render
- **AND** the browser console SHALL contain zero hydration mismatch warnings related to these values

#### Scenario: Responsive stat layout

- **WHEN** the user views the page on a viewport ≥1024px
- **THEN** the server identity, stat rail, and JOIN CTA SHALL render in a single row
- **WHEN** the user views the page on a viewport between 768px and 1023px
- **THEN** the identity SHALL render on its own row above a three-column stat grid and a full-width CTA row
- **WHEN** the user views the page on a viewport <768px
- **THEN** the identity, stat grid, and CTA SHALL each render as a stacked row with the server description hidden

### Requirement: BIBIBOT Feature Carousel

The DISCORD_SERVER module SHALL include a horizontally scrollable carousel of exactly 7 BIBIBOT feature cards in a fixed order, each linking to its corresponding documentation page on `bibi.shushu.tw`.

#### Scenario: Fixed card order and destinations

- **WHEN** the carousel renders
- **THEN** it SHALL display exactly 7 cards in this order: 挖礦 MINING, 釣魚 FISHING, 賭場 CASINO, 樂透 LOTTERY, 股市 STOCK, 經濟 ECONOMY, 等級 LEVELS
- **AND** each card SHALL link respectively to `https://bibi.shushu.tw/docs/mining`, `https://bibi.shushu.tw/docs/fishing`, `https://bibi.shushu.tw/docs/casino`, `https://bibi.shushu.tw/docs/lottery`, `https://bibi.shushu.tw/docs/stocks`, `https://bibi.shushu.tw/docs/economy`, `https://bibi.shushu.tw/docs/leveling`

#### Scenario: Drag exceeding threshold does not navigate

- **WHEN** the user performs a pointer-drag gesture on the carousel that moves more than 4px horizontally before release
- **THEN** the carousel SHALL scroll horizontally
- **AND** the click event on the card underneath the pointer SHALL be cancelled so no navigation occurs

#### Scenario: Touch pointers use native scrolling

- **WHEN** the pointer type is `touch`
- **THEN** the drag-scroll handlers SHALL NOT intercept the gesture
- **AND** the carousel SHALL scroll using the browser's native touch scrolling behavior

#### Scenario: Preview animates on hover and on keyboard focus

- **WHEN** the user hovers over a feature card, or moves keyboard focus onto a feature card
- **THEN** the card's preview animation SHALL play identically in both cases

#### Scenario: Reduced motion preserves information, suppresses transforms

- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **AND** a feature card receives hover or focus
- **THEN** state-bearing changes in the preview (such as a progress bar reaching its filled value, or a winning chip changing color) SHALL still apply, without animated transition
- **AND** transform-only effects (such as lift, rotation, or spring motion) SHALL be suppressed

#### Scenario: Carousel is a keyboard-operable labelled region

- **WHEN** a keyboard user tabs to the carousel container
- **THEN** the container SHALL be focusable (`tabIndex={0}`), SHALL have `role="region"`, and SHALL have an accessible label
- **AND** each of the 7 cards SHALL be reachable via subsequent Tab presses in order
