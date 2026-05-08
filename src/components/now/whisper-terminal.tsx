"use client";

import { useState } from "react";
import { PanelCard } from "@/components/hud/panel-card";
import { HudLabel } from "@/components/hud/hud-label";
import { createMsg } from "@/app/api/messageBoard";

type Status = "idle" | "sending" | "sent" | "error";

export function WhisperTerminal() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [echoLines, setEchoLines] = useState<
    { text: string; variant: "ok" | "err" }[]
  >([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value.length < 10 || status === "sending") return;

    setStatus("sending");
    try {
      const res = await createMsg(value);
      if (res.status === 201) {
        setEchoLines(prev => [
          ...prev,
          { text: "> message received · thank you ✓", variant: "ok" },
        ]);
        setValue("");
        setStatus("sent");
      } else {
        throw new Error("non-201");
      }
    } catch {
      setEchoLines(prev => [
        ...prev,
        { text: "> [ERR] dispatch failed", variant: "err" },
      ]);
      setStatus("error");
    }
  }

  const isDisabled = value.length < 10 || status === "sending";

  return (
    <div data-module="whisper-terminal">
      <PanelCard className="flex flex-col gap-3">
        <HudLabel label="WHISPER · 偷偷跟我說" />

        {/* echo lines */}
        {echoLines.length > 0 && (
          <div className="flex flex-col gap-0.5">
            {echoLines.map((line, i) => (
              <span
                key={i}
                className={`font-mono text-[11px] ${
                  line.variant === "ok"
                    ? "text-[hsl(var(--signal-live))]"
                    : "text-[hsl(var(--signal-alert))]"
                }`}
              >
                {line.text}
              </span>
            ))}
          </div>
        )}

        {/* terminal input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-1.5">
            <span className="shrink-0 select-none font-mono text-[11px] text-[hsl(var(--text-muted))]">
              shushu@system:~$
            </span>
            <input
              type="text"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="type a message..."
              className="min-w-0 flex-1 bg-transparent font-mono text-[12px] text-[hsl(var(--text-body))] caret-[hsl(var(--signal-live))] outline-none placeholder:text-[hsl(var(--text-dim))]"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <button
            type="submit"
            disabled={isDisabled}
            className="shrink-0 rounded-[var(--radius-sm)] border border-[hsl(var(--border-subtle))] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--text-muted))] transition-colors duration-200 hover:enabled:border-[hsl(var(--signal-live))] hover:enabled:text-[hsl(var(--signal-live))] disabled:cursor-not-allowed disabled:opacity-30"
          >
            SEND
          </button>
        </form>
      </PanelCard>
    </div>
  );
}
