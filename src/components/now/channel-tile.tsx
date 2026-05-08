import { PanelCard } from "@/components/hud/panel-card";
import { HudLabel } from "@/components/hud/hud-label";
import { StatusDot } from "@/components/hud/status-dot";
import type { ChannelConfig } from "@/lib/now-page/channels";

interface ChannelTileProps {
  channel: ChannelConfig;
  isLive?: boolean;
}

export function ChannelTile({ channel, isLive = false }: ChannelTileProps) {
  const accent = channel.id === "twitch" && isLive ? "live" : "idle";

  return (
    <a
      href={channel.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--signal-live))]"
    >
      <PanelCard
        accent={accent}
        className="flex h-full flex-col gap-3 transition-colors duration-200 hover:border-[hsl(var(--border-subtle))]"
      >
        <div className="flex items-center justify-between">
          <HudLabel label={channel.displayName} />
          <StatusDot
            state={channel.id === "twitch" && isLive ? "live" : "idle"}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-[12px] text-[hsl(var(--text-body))]">
            @{channel.handle}
          </span>
          <span className="font-mono text-[10px] text-[hsl(var(--text-muted))]">
            {channel.statusText}
          </span>
        </div>
      </PanelCard>
    </a>
  );
}
