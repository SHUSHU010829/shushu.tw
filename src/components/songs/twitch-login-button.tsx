"use client";

import { useSession } from "@/hooks/use-session";
import { StatusDot } from "@/components/hud/status-dot";

export function TwitchLoginButton() {
  const { session, logout } = useSession();

  if (session.status === "authenticated") {
    return (
      <div className="flex items-center gap-2">
        <StatusDot state="live" />
        <span className="font-mono text-[11px] text-[hsl(var(--text-body))]">
          {session.displayName}
        </span>
        <button
          type="button"
          onClick={logout}
          className="rounded-[var(--radius-sm)] border border-[hsl(var(--border-faint))] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--text-muted))] transition-colors duration-200 hover:border-[hsl(var(--border-subtle))]"
        >
          登出
        </button>
      </div>
    );
  }

  return (
    <a
      href="/api/auth/twitch/login"
      className="rounded-[var(--radius-sm)] border border-[hsl(var(--border-subtle))] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--text-muted))] transition-colors duration-200 hover:border-[hsl(var(--signal-live))] hover:text-[hsl(var(--signal-live))]"
    >
      使用 TWITCH 登入
    </a>
  );
}
