## ADDED Requirements

### Requirement: Twitch Authorization Code Login

The system SHALL provide a `GET /api/auth/twitch/login` Route Handler that initiates a Twitch OAuth authorization-code flow with an empty scope, and redirects the browser to Twitch's authorization endpoint.

The system SHALL generate a cryptographically random `state` value for each login attempt, store it in a short-lived (5 minute) httpOnly cookie with `sameSite: "lax"`, and include the same value as the `state` query parameter in the authorization URL.

#### Scenario: Viewer starts login

- **WHEN** a viewer requests `GET /api/auth/twitch/login`
- **THEN** the response SHALL be an HTTP redirect to `https://id.twitch.tv/oauth2/authorize` with `client_id`, `redirect_uri`, `response_type=code`, an empty `scope`, and a `state` parameter
- **AND** an httpOnly `oauth_state` cookie SHALL be set containing the same `state` value with `sameSite: "lax"` and a maximum age of 5 minutes

### Requirement: Twitch OAuth Callback and Identity Exchange

The system SHALL provide a `GET /api/auth/twitch/callback` Route Handler that validates the `state` parameter against the `oauth_state` cookie using a constant-time comparison, exchanges the authorization `code` for a Twitch access token, fetches the viewer's Twitch identity (`id`, `login`, `display_name`) via `GET https://api.twitch.tv/helix/users`, and issues a signed session cookie.

The Twitch access token obtained during this exchange SHALL NOT be persisted beyond the request that fetches the viewer's identity, and SHALL NOT be included in the session cookie or any stored data.

#### Scenario: Successful callback

- **WHEN** the callback receives a `code` and a `state` that matches the `oauth_state` cookie
- **THEN** the system SHALL exchange the code for a Twitch access token, fetch the viewer's identity, issue a signed session cookie, delete the `oauth_state` cookie, and redirect to `/songs`

#### Scenario: State mismatch is rejected

- **WHEN** the callback receives a `state` parameter that does not match the value in the `oauth_state` cookie, or the cookie is missing
- **THEN** the system SHALL NOT exchange the authorization code
- **AND** the system SHALL redirect to `/songs?auth_error=state_mismatch` and delete the `oauth_state` cookie

### Requirement: Signed Session Cookie

The system SHALL represent an authenticated viewer session as a JWT signed with `SESSION_SECRET`, containing the Twitch user id, login, and display name, with a 7-day expiry. The session SHALL be stored in an httpOnly cookie with `sameSite: "lax"` and the `secure` attribute enabled in production.

The system SHALL NOT persist session state in any server-side store (database, in-memory map, or external cache); session validity SHALL be determined solely by verifying the JWT signature and expiry on each request.

#### Scenario: Session cookie is verified on each request

- **WHEN** a Route Handler needs to identify the current viewer
- **THEN** the system SHALL verify the session cookie's JWT signature and expiry
- **AND** SHALL treat verification failure (missing cookie, invalid signature, or expired token) identically to an anonymous visitor

### Requirement: Session Status and Logout

The system SHALL provide `GET /api/auth/me`, returning the authenticated viewer's identity when a valid session cookie is present, or an anonymous status otherwise. The system SHALL provide a logout action that clears the session cookie.

#### Scenario: Authenticated status

- **WHEN** a viewer with a valid session cookie requests `GET /api/auth/me`
- **THEN** the response SHALL indicate authenticated status and include the viewer's Twitch login and display name

#### Scenario: Anonymous status

- **WHEN** a visitor with no valid session cookie requests `GET /api/auth/me`
- **THEN** the response SHALL indicate anonymous status without error

#### Scenario: Logout clears session

- **WHEN** an authenticated viewer triggers logout
- **THEN** the session cookie SHALL be cleared
- **AND** a subsequent `GET /api/auth/me` SHALL indicate anonymous status
