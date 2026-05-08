import { cn } from "@/lib/utils";

type DotState = "live" | "idle" | "offline";

interface StatusDotProps {
  state: DotState;
  className?: string;
}

export function StatusDot({ state, className }: StatusDotProps) {
  return (
    <span className={cn("relative inline-flex h-2 w-2", className)}>
      {state === "live" && (
        <span
          className="absolute inline-flex h-full w-full animate-live-ping rounded-full bg-[hsl(var(--signal-live))] opacity-75 motion-reduce:animate-none"
          aria-hidden="true"
        />
      )}
      <span
        className={cn("relative inline-flex h-2 w-2 rounded-full", {
          "bg-[hsl(var(--signal-live))]": state === "live",
          "bg-[hsl(var(--text-muted))]": state === "idle",
          "bg-[hsl(var(--text-dim))]": state === "offline",
        })}
      />
    </span>
  );
}
