## ADDED Requirements

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
