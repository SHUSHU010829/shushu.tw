## MODIFIED Requirements

### Requirement: HUD Header (implemented)

The HUD header SHALL be a fixed-height (56px) bar displayed at the top of the home page, containing the site identity, a link to the song request page, live status indicator, and a real-time Taipei clock.

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

#### Scenario: Header includes a link to the song request page

- **WHEN** the user visits `/`
- **THEN** the identity section of the HUD header SHALL display a link with the visible text `SONGS`
- **AND** the link SHALL navigate to `/songs` within the same tab
- **AND** the link SHALL NOT alter the layout, content, or behavior of the live status indicator or the clock
