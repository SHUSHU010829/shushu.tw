# song-requests Specification

## Purpose

TBD - created by archiving change 'add-twitch-song-requests'. Update Purpose after archive.

## Requirements

### Requirement: Song Catalog Browsing

The system SHALL expose the song catalog to visitors via `GET /api/songs/catalog`, proxying stream_api's repertoire data without requiring authentication. The response SHALL include the list of songs and their associated categories, grouped by dimension, without hardcoding any specific dimension name (e.g. language) in the response contract.

On any upstream failure or unexpected response shape, the system SHALL degrade to an `"unknown"` status rather than surfacing an error to the rest of the page, consistent with the existing Twitch/Discord module pattern.

#### Scenario: Catalog loads successfully

- **WHEN** a visitor requests `GET /api/songs/catalog` and stream_api responds successfully
- **THEN** the response SHALL include `status: "ok"`, the list of songs, and a `categories` structure grouping category options by dimension

#### Scenario: Catalog degrades gracefully on upstream failure

- **WHEN** stream_api is unreachable or returns a non-200 response
- **THEN** `GET /api/songs/catalog` SHALL respond with `status: "unknown"`
- **AND** the `/songs` page SHALL render without throwing, showing an unavailable placeholder for the catalog section only


<!-- @trace
source: add-twitch-song-requests
updated: 2026-09-06
code:
  - src/app/api/og/route.tsx
  - src/hooks/use-song-catalog.ts
  - package.json
  - src/app/api/auth/twitch/login/route.ts
  - src/components/songs/twitch-login-button.tsx
  - src/app/api/auth/logout/route.ts
  - src/components/songs/song-catalog.tsx
  - src/hooks/use-session.ts
  - src/app/api/songs/catalog/route.ts
  - src/app/api/songs/request/route.ts
  - src/lib/songs/catalog.ts
  - src/components/songs/song-row.tsx
  - src/lib/auth/session.ts
  - src/hooks/use-song-queue.ts
  - src/app/songs/page.tsx
  - .env.example
  - src/app/api/auth/me/route.ts
  - src/app/api/songs/queue/route.ts
  - src/app/api/auth/twitch/callback/route.ts
-->

---
### Requirement: Current Queue Visibility

The system SHALL expose the current live song queue to visitors via `GET /api/songs/queue`, proxying stream_api's active queue so viewers can see what has already been approved before requesting a song.

#### Scenario: Queue is visible without login

- **WHEN** an anonymous visitor requests `GET /api/songs/queue`
- **THEN** the response SHALL succeed and include the current active queue, requiring no authentication


<!-- @trace
source: add-twitch-song-requests
updated: 2026-09-06
code:
  - src/app/api/og/route.tsx
  - src/hooks/use-song-catalog.ts
  - package.json
  - src/app/api/auth/twitch/login/route.ts
  - src/components/songs/twitch-login-button.tsx
  - src/app/api/auth/logout/route.ts
  - src/components/songs/song-catalog.tsx
  - src/hooks/use-session.ts
  - src/app/api/songs/catalog/route.ts
  - src/app/api/songs/request/route.ts
  - src/lib/songs/catalog.ts
  - src/components/songs/song-row.tsx
  - src/lib/auth/session.ts
  - src/hooks/use-song-queue.ts
  - src/app/songs/page.tsx
  - .env.example
  - src/app/api/auth/me/route.ts
  - src/app/api/songs/queue/route.ts
  - src/app/api/auth/twitch/callback/route.ts
-->

---
### Requirement: Authenticated Song Request Submission

The system SHALL provide `POST /api/songs/request`, which accepts a song identifier from the request body, resolves the requester's identity exclusively from the verified session cookie, and forwards the request to stream_api with a server-side API key. The system SHALL NOT trust any requester identity fields supplied in the request body.

The system SHALL reject the request with HTTP 401 when no valid session is present, without contacting stream_api.

#### Scenario: Authenticated viewer submits a request

- **WHEN** a viewer with a valid session cookie submits `POST /api/songs/request` with a song identifier
- **THEN** the system SHALL forward a request to stream_api that includes the requester's Twitch id, login, and display name taken from the session
- **AND** SHALL ignore any requester identity fields present in the request body

#### Scenario: Anonymous submission is rejected

- **WHEN** a visitor without a valid session cookie submits `POST /api/songs/request`
- **THEN** the system SHALL respond with HTTP 401
- **AND** SHALL NOT forward any request to stream_api

#### Scenario: Duplicate request is surfaced by status code

- **WHEN** stream_api responds to a forwarded request with HTTP 409 (song already queued or already pending)
- **THEN** `POST /api/songs/request` SHALL propagate an HTTP 409 response
- **AND** the client SHALL determine the duplicate condition from the HTTP status code alone, not by parsing message text


<!-- @trace
source: add-twitch-song-requests
updated: 2026-09-06
code:
  - src/app/api/og/route.tsx
  - src/hooks/use-song-catalog.ts
  - package.json
  - src/app/api/auth/twitch/login/route.ts
  - src/components/songs/twitch-login-button.tsx
  - src/app/api/auth/logout/route.ts
  - src/components/songs/song-catalog.tsx
  - src/hooks/use-session.ts
  - src/app/api/songs/catalog/route.ts
  - src/app/api/songs/request/route.ts
  - src/lib/songs/catalog.ts
  - src/components/songs/song-row.tsx
  - src/lib/auth/session.ts
  - src/hooks/use-song-queue.ts
  - src/app/songs/page.tsx
  - .env.example
  - src/app/api/auth/me/route.ts
  - src/app/api/songs/queue/route.ts
  - src/app/api/auth/twitch/callback/route.ts
-->

---
### Requirement: Song Request Page

The system SHALL provide a standalone `/songs` page, independent of the home page's locked module composition, that lets a visitor browse the catalog filtered by any category dimension returned by the API, view the current queue, and — once logged in via Twitch — submit a song request with inline status feedback (idle, sending, sent, duplicate, error).

#### Scenario: Anonymous visitor sees a login prompt instead of a request action

- **WHEN** an anonymous visitor views a song in the catalog on `/songs`
- **THEN** the song SHALL display a call-to-action to log in with Twitch instead of an active request button

#### Scenario: Authenticated visitor requests a song

- **WHEN** a logged-in visitor clicks the request action on a catalog song
- **THEN** the UI SHALL transition through `sending` to either `sent` (on success) or `duplicate`/`error` (on 409/other failure), without a full page reload

<!-- @trace
source: add-twitch-song-requests
updated: 2026-09-06
code:
  - src/app/api/og/route.tsx
  - src/hooks/use-song-catalog.ts
  - package.json
  - src/app/api/auth/twitch/login/route.ts
  - src/components/songs/twitch-login-button.tsx
  - src/app/api/auth/logout/route.ts
  - src/components/songs/song-catalog.tsx
  - src/hooks/use-session.ts
  - src/app/api/songs/catalog/route.ts
  - src/app/api/songs/request/route.ts
  - src/lib/songs/catalog.ts
  - src/components/songs/song-row.tsx
  - src/lib/auth/session.ts
  - src/hooks/use-song-queue.ts
  - src/app/songs/page.tsx
  - .env.example
  - src/app/api/auth/me/route.ts
  - src/app/api/songs/queue/route.ts
  - src/app/api/auth/twitch/callback/route.ts
-->