## Context

`shushu.tw` has no design token system — `globals.css` only contains `.drawBtn`. The existing Tailwind config has a custom `addVariablesForColors` plugin that auto-generates CSS variables, but the color palette is wrong (warm beige, not cyberpunk) and shadcn/ui token names (`--background`, `--foreground`, etc.) are entirely missing. The OBS overlay at `obs-tool.vercel.app` already has the correct cyberpunk tokens; this change ports them here.

The Twitch API integration was previously built in the OBS overlay project (same SHUSHU platform). `twitchTokenManager.ts` handles App Access Token lifecycle there. We port it directly rather than re-implementing.

## Goals / Non-Goals

**Goals:**

- Establish a single, authoritative CSS custom property token system consumable by both Tailwind utilities and direct `var()` references
- Get the home page to live-render Twitch stream state on first visit (within 60s polling)
- Replace the legacy profile card with a cyberpunk HUD layout that is visually stable (no CLS, no hydration errors)

**Non-Goals:**

- Full OBS overlay parity (that requires Spotify, GitHub, Discord — deferred to M2/M3)
- Pixel-perfect mobile optimization (RWD required but mobile is secondary audience)
- Test suite setup (no testing framework exists; not adding one in M1)

## Decisions

### 1. CSS custom properties as single token source of truth

**Decision**: Define all tokens in `globals.css` `:root` and make Tailwind colors point to `hsl(var(--…))`. Remove the `addVariablesForColors` plugin.

**Rationale**: shadcn/ui requires `hsl(var(--token))` pattern. The existing plugin was generating wrong tokens anyway. Unifying means M4's theme-switching (MAGENTA/CYAN accent) only needs to override `:root.dark` — no Tailwind config rebuild.

**Alternatives considered**: Pure Tailwind `extend.colors` with hardcoded hex → rejected because shadcn components require CSS variable format and would still be broken.

### 2. M1 connects Twitch API, defers all other data sources to M2

**Decision**: Move `twitchTokenManager.ts` and Helix `getStreams` call from OBS repo to this project. All other data sources (Spotify, GitHub, YouTube, Discord, Twitter) wait for M2.

**Rationale**: Twitch live/offline is the single most important signal for the target audience (Twitch viewers). Showing "OFFLINE" when the streamer is actually live would be the worst first impression. The Twitch API code is already proven in OBS repo — migration risk is low. Other APIs each carry OAuth/quota complexity that would delay M1.

### 3. TWITCH_STREAM uses CRT frame + embedded Twitch iframe (not thumbnail)

**Decision**: When live, embed `https://player.twitch.tv/` in an iframe, wrapped in a custom CRT-style frame (scanline region, REC dot, corner accents, HUD bar below).

**Rationale**: Allows viewers to watch the stream without leaving `shushu.tw`. The CRT frame carries the cyberpunk aesthetic while the iframe content is native Twitch quality. Confirmed by user.

**iframe `parent` parameter**: Must include both `shushu.tw` (production) and `localhost` (development). Vercel preview URLs will need to be added or suppressed via env var if Twitch blocks them.

### 4. SWR as the only client-side fetcher

**Decision**: Add `swr` for all client-side polling hooks.

**Rationale**: Bundle ~6KB gzipped (vs React Query ~13KB). Ships with built-in deduplication, focus revalidation, and configurable polling intervals — exactly what `useTwitchStream` needs. Next.js App Router team recommends SWR for client components that need real-time data alongside RSC.

**Alternatives**: Raw `fetch` + `useEffect` + `setInterval` → no deduplication, error state management becomes manual. React Query → larger bundle, no benefit for single-endpoint use case.

### 5. `design-system` is a separate capability from `now-page`

**Decision**: Tokens, primitives, and CRT overlay are spec'd under `design-system`, not embedded in `now-page`.

**Rationale**: These contracts will be referenced by `/luckyDraw` (once it adopts the token system), the OG image route, and any future pages. Embedding them in `now-page` would make cross-capability references semantically incorrect.

### 6. `/luckyDraw` visual isolation

**Decision**: The `.drawBtn` rule in `globals.css` is preserved verbatim. Token additions use explicit `:root` rules that do not override the existing `.drawBtn` red styling.

**Verification gate**: Task 10.2 requires a visual screenshot comparison of `/luckyDraw` before and after. If the button changes color, the PR is blocked.

### 7. `ThemeToggle` removed in M1

**Decision**: Delete `src/components/theme-toggle.tsx` and its usage in `layout.tsx`.

**Rationale**: The M1 cyberpunk palette is only a dark theme. Leaving a broken toggle is worse UX than no toggle. M4 will introduce an accent-color toggle (MAGENTA/CYAN) as a deliberate design feature, not a light/dark switch.

### 8. CRT scanline managed via route detection, not layout nesting

**Decision**: `CrtScanline` component uses `usePathname()` to conditionally render. It is imported in `src/app/layout.tsx` for easy future extension, but internally returns `null` on `/luckyDraw*` paths.

**Alternative**: Create `(home)/layout.tsx` route group → more idiomatic App Router but adds structural complexity for a one-file component. Not worth it for M1.

## Risks / Trade-offs

- **Twitch iframe `parent` domain mismatch** → Twitch will refuse to load the iframe if `shushu.tw` isn't in the `parent` list when deployed. Mitigation: test on production domain before merging; add `TWITCH_PARENT_DOMAINS` env var for flexibility.
- **shadcn token override side effects** → Adding `--background`, `--foreground` etc. may make previously invisible shadcn components (button in luckyDraw) suddenly styled. Task 10.2 catches this.
- **Hydration mismatch on TPE clock** → Clock reads `new Date()` which differs between server and client. Mitigation: return `null` from hook during SSR; render `--:--:--` placeholder.
- **SWR bundle on first load** → SWR is ~6KB gzipped but adds to the initial bundle. Monitor `npm run build` output; if first-load JS exceeds 200KB, lazy-load SWR.
