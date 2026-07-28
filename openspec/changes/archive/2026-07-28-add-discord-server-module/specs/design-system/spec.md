## MODIFIED Requirements

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
