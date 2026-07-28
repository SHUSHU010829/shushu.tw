"use client";

import { CHANNELS } from "@/lib/now-page/channels";
import { ChannelTile } from "./channel-tile";
import { useTwitchStream } from "@/hooks/use-twitch-stream";

export function ChannelsGrid() {
  const stream = useTwitchStream();
  const isLive = stream.status === "live";

  return (
    <div
      data-module="channels-grid"
      className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3"
    >
      {CHANNELS.map(channel => (
        <ChannelTile
          key={channel.id}
          channel={channel}
          isLive={channel.id === "twitch" ? isLive : false}
        />
      ))}
    </div>
  );
}
