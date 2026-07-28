import { FaDiscord } from "react-icons/fa6";
import { HudLabel } from "@/components/hud/hud-label";
import { StatusDot } from "@/components/hud/status-dot";
import type { DiscordGuildState } from "@/lib/discord/invite";
import {
  DISCORD_INVITE_URL,
  DISCORD_SERVER_HANDLE,
  DISCORD_SERVER_NAME,
} from "@/lib/now-page/discord";

const numberFormat = new Intl.NumberFormat("en-US");

function formatCount(n: number | undefined): string {
  return n === undefined ? "---" : numberFormat.format(n);
}

function GuildIcon({ iconUrl }: { iconUrl: string | null | undefined }) {
  return (
    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-md)] border border-[hsl(var(--border-faint))] bg-[hsl(var(--surface-void))] md:h-14 md:w-14">
      {iconUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={iconUrl}
          alt=""
          aria-hidden="true"
          width={56}
          height={56}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          onError={e => {
            e.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <FaDiscord
          aria-hidden="true"
          className="h-6 w-6 text-[hsl(var(--text-subtle))] md:h-7 md:w-7"
        />
      )}
    </div>
  );
}

function BoostLadder({ tier }: { tier: 0 | 1 | 2 | 3 }) {
  return (
    <div className="mt-1.5 flex items-center gap-1">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className={
            i < tier
              ? "h-[3px] w-4 rounded-full bg-[hsl(var(--signal-sub))]"
              : "h-[3px] w-4 rounded-full bg-[hsl(var(--border-faint))]"
          }
        />
      ))}
      <span className="ml-1 font-mono text-[10px] text-[hsl(var(--text-dim))]">
        T{tier}
      </span>
    </div>
  );
}

export function DiscordStatRail({ state }: { state: DiscordGuildState }) {
  const ok = state.status === "ok";
  const iconUrl = ok ? state.iconUrl : undefined;
  const description = ok ? state.description : null;
  const memberCount = ok ? state.memberCount : undefined;
  const onlineCount = ok ? state.onlineCount : undefined;
  const boostCount = ok ? state.boostCount : undefined;
  const boostTier = ok ? state.boostTier : 0;

  return (
    <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 sm:py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      <div className="flex items-center gap-3">
        <GuildIcon iconUrl={iconUrl} />
        <div className="flex flex-col gap-0.5">
          <HudLabel label="DISCORD_SERVER" />
          <span className="font-notoSans text-[15px] font-bold text-[hsl(var(--text-body))]">
            {DISCORD_SERVER_NAME}
          </span>
          <span className="font-mono text-[11px] text-[hsl(var(--text-muted))]">
            {DISCORD_SERVER_HANDLE}
          </span>
          {description ? (
            <span className="hidden font-mono text-[11px] text-[hsl(var(--text-dim))] md:inline">
              {description}
            </span>
          ) : null}
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-0 border-y border-[hsl(var(--border-faint))] py-3 lg:flex lg:divide-x lg:divide-[hsl(var(--border-faint))] lg:border-y-0 lg:py-0">
        <div className="flex flex-col gap-1 px-2 lg:px-6">
          <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--text-muted))]">
            // MEMBERS
          </dt>
          <dd className="font-mono text-[18px] tabular-nums leading-none text-[hsl(var(--text-body))] lg:text-[26px]">
            {formatCount(memberCount)}
          </dd>
        </div>
        <div className="flex flex-col gap-1 px-2 lg:px-6">
          <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--text-muted))]">
            <StatusDot state={ok ? "live" : "idle"} />
            // ONLINE
          </dt>
          <dd className="font-mono text-[18px] tabular-nums leading-none text-[hsl(var(--signal-live))] lg:text-[26px]">
            {formatCount(onlineCount)}
          </dd>
        </div>
        <div className="flex flex-col gap-1 px-2 lg:px-6">
          <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--text-muted))]">
            // BOOSTS
          </dt>
          <dd className="font-mono text-[18px] tabular-nums leading-none text-[hsl(var(--signal-sub))] lg:text-[26px]">
            {formatCount(boostCount)}
          </dd>
          <BoostLadder tier={boostTier} />
        </div>
      </dl>

      <a
        href={DISCORD_INVITE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-[var(--radius-sm)] border border-[hsl(var(--signal-tier2))] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[hsl(var(--signal-tier2))] transition-colors duration-200 hover:bg-[hsl(var(--signal-tier2))] hover:text-[hsl(var(--surface-void))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--signal-live))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--surface-panel-2))] lg:w-auto"
      >
        JOIN SERVER →<span className="sr-only">（開新分頁）</span>
      </a>
    </div>
  );
}
