export interface ChannelConfig {
  id: "twitch" | "discord" | "youtube" | "twitter";
  displayName: string;
  handle: string;
  url: string;
  accentToken: string;
  statusText: string;
}

export const CHANNELS: ChannelConfig[] = [
  {
    id: "twitch",
    displayName: "Twitch",
    handle: "shushu010829",
    url: "https://www.twitch.tv/shushu010829",
    accentToken: "--signal-sub",
    statusText: "last · 2d",
  },
  {
    id: "discord",
    displayName: "Discord",
    handle: "shushu010829",
    url: "https://discord.gg/shushu010829",
    accentToken: "--signal-tier2",
    statusText: "last · 2d",
  },
  {
    id: "youtube",
    displayName: "YouTube",
    handle: "SHUSHU0829",
    url: "https://www.youtube.com/@SHUSHU0829",
    accentToken: "--signal-alert",
    statusText: "last · 2d",
  },
  {
    id: "twitter",
    displayName: "Twitter / X",
    handle: "SHUSHU_0829",
    url: "https://twitter.com/SHUSHU_0829",
    accentToken: "--text-muted",
    statusText: "last · 2d",
  },
];
