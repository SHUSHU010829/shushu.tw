"use client";

import { HudHeader } from "@/components/now/hud-header";
import { TwitchStream } from "@/components/now/twitch-stream";
import { ChannelsGrid } from "@/components/now/channels-grid";
import { WhisperTerminal } from "@/components/now/whisper-terminal";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[hsl(var(--surface-void))]">
      <HudHeader />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 md:px-8">
        <TwitchStream />
        <ChannelsGrid />
        <WhisperTerminal />
      </div>
    </main>
  );
}
