"use client";

import { useDiscordGuild } from "@/hooks/use-discord-guild";
import { PanelCard } from "@/components/hud/panel-card";
import { DiscordStatRail } from "@/components/now/discord-stat-rail";
import { BibiFeatureCarousel } from "@/components/now/bibi-feature-carousel";

export function DiscordServer() {
  const guild = useDiscordGuild();
  const ok = guild.status === "ok";

  return (
    <div data-module="discord-server">
      <PanelCard accent={ok ? "tier2" : "idle"} className="overflow-hidden p-0">
        <DiscordStatRail state={guild} />
        <div className="border-t border-[hsl(var(--border-faint))]">
          <BibiFeatureCarousel />
        </div>
      </PanelCard>
    </div>
  );
}
