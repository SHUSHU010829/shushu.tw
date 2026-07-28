## ADDED Requirements

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

### Requirement: Data Source Fallback Contract (implemented)

Any live-presence data source that fails SHALL degrade gracefully without blocking the rendering of other modules or the overall page. This contract applies to all data sources added in future changes (M2+).

#### Scenario: Single source failure does not break page

- **WHEN** a live-presence Route Handler returns a non-200 status
- **THEN** the corresponding module SHALL render a placeholder or last-known state
- **AND** all other modules on the page SHALL continue to render normally
- **AND** no uncaught error SHALL propagate to the React error boundary at the page level
