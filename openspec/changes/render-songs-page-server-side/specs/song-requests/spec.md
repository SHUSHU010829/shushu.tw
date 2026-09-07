## MODIFIED Requirements

### Requirement: Song Request Page

The system SHALL provide a standalone `/songs` page, independent of the home page's locked module composition, that lets a visitor browse the catalog filtered by any category dimension returned by the API, view the current queue, and — once logged in via Twitch — submit a song request with inline status feedback (idle, sending, sent, duplicate, unauthenticated, error).

The page SHALL be readable without authentication. The server SHALL resolve the catalog, the current queue, and the viewer's session status before responding, and SHALL include the resolved catalog and queue content in the initial HTML response. The page SHALL NOT show an unavailable or empty placeholder for content the server resolved successfully.

The page SHALL distinguish a queue that could not be loaded from a queue that is genuinely empty.

Requesting a song SHALL be the only action on the page that requires authentication.

#### Scenario: Anonymous visitor reads the catalog and queue in the initial response

- **WHEN** a visitor with no session cookie requests `/songs` and stream_api responds successfully
- **THEN** the initial HTML response SHALL contain the catalog songs and the current queue entries
- **AND** the response SHALL NOT contain the catalog-unavailable or queue-unavailable placeholder text
- **AND** the page SHALL render this content without any client-side JavaScript having executed

#### Scenario: Anonymous visitor sees a login prompt instead of a request action

- **WHEN** an anonymous visitor views a song in the catalog on `/songs`
- **THEN** the song SHALL display a call-to-action to log in with Twitch instead of an active request button

#### Scenario: Authenticated visitor sees the request action in the initial response

- **WHEN** a visitor with a valid session cookie requests `/songs`
- **THEN** the initial HTML response SHALL render an active request button for each catalog song
- **AND** SHALL NOT render the log-in call-to-action for any catalog song

#### Scenario: Unavailable queue is distinguished from an empty queue

- **WHEN** `/songs` cannot resolve the current queue from stream_api
- **THEN** the queue panel SHALL indicate that the queue could not be loaded
- **AND** SHALL NOT indicate that there are no queued songs
- **WHEN** the queue resolves successfully with zero entries
- **THEN** the queue panel SHALL indicate that there are no queued songs

#### Scenario: Authenticated visitor requests a song

- **WHEN** a logged-in visitor clicks the request action on a catalog song
- **THEN** the UI SHALL transition through `sending` to either `sent` (on success) or `duplicate`/`error` (on 409/other failure), without a full page reload

#### Scenario: Expired session is surfaced as a login prompt

- **WHEN** a request submitted from the page receives an HTTP 401 response
- **THEN** the song SHALL display a call-to-action to log in with Twitch again
- **AND** SHALL NOT display the generic submission-failure label
