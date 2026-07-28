export type DiscordGuildState =
  | {
      status: "ok";
      guildId: string;
      name: string;
      description: string | null;
      iconUrl: string | null;
      memberCount: number;
      onlineCount: number;
      boostCount: number;
      boostTier: 0 | 1 | 2 | 3;
    }
  | { status: "unavailable" }
  | { status: "unknown" };

function buildIconUrl(guildId: string, hash: string | null): string | null {
  if (!hash) return null;
  const ext = hash.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/icons/${guildId}/${hash}.${ext}?size=128`;
}

export async function getGuildFromInvite(
  code: string
): Promise<DiscordGuildState> {
  const res = await fetch(
    `https://discord.com/api/v10/invites/${code}?with_counts=true`,
    { next: { revalidate: 300 } }
  );

  if (res.status === 404) {
    return { status: "unavailable" };
  }

  if (!res.ok) {
    throw new Error(`Discord invite API error: ${res.status}`);
  }

  const json = (await res.json()) as Record<string, unknown>;
  const guild = (json.guild ?? {}) as Record<string, unknown>;
  const profile = (json.profile ?? {}) as Record<string, unknown>;

  const memberCount = Number(
    profile.member_count ?? json.approximate_member_count ?? NaN
  );
  const onlineCount = Number(
    profile.online_count ?? json.approximate_presence_count ?? NaN
  );

  if (Number.isNaN(memberCount) || Number.isNaN(onlineCount)) {
    return { status: "unavailable" };
  }

  const guildId = String(guild.id ?? "");

  return {
    status: "ok",
    guildId,
    name: String(guild.name ?? ""),
    description: guild.description ? String(guild.description) : null,
    iconUrl: buildIconUrl(guildId, guild.icon ? String(guild.icon) : null),
    memberCount,
    onlineCount,
    boostCount: Number(guild.premium_subscription_count ?? 0),
    boostTier: (Number(guild.premium_tier ?? 0) as 0 | 1 | 2 | 3) ?? 0,
  };
}
