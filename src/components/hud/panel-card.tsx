import { cn } from "@/lib/utils";

type Accent = "live" | "idle" | "sub" | "cheer";

const accentBorderMap: Record<Accent, string> = {
  live: "border-[hsl(var(--signal-live))] [--corner-color:var(--signal-live)]",
  idle: "border-[hsl(var(--border-faint))] [--corner-color:var(--border-subtle)]",
  sub: "border-[hsl(var(--signal-sub))] [--corner-color:var(--signal-sub)]",
  cheer: "border-[hsl(var(--signal-cheer))] [--corner-color:var(--signal-cheer)]",
};

interface PanelCardProps {
  accent?: Accent;
  className?: string;
  children?: React.ReactNode;
}

export function PanelCard({
  accent = "idle",
  className,
  children,
}: PanelCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-[var(--radius-md)] border bg-[hsl(var(--surface-tile))] p-4",
        accentBorderMap[accent],
        className
      )}
    >
      {/* corner accents */}
      <span className="absolute left-0 top-0 h-2 w-2 rounded-tl-[var(--radius-md)] border-l-2 border-t-2 border-[hsl(var(--corner-color,var(--border-faint)))]" />
      <span className="absolute right-0 top-0 h-2 w-2 rounded-tr-[var(--radius-md)] border-r-2 border-t-2 border-[hsl(var(--corner-color,var(--border-faint)))]" />
      <span className="absolute bottom-0 left-0 h-2 w-2 rounded-bl-[var(--radius-md)] border-b-2 border-l-2 border-[hsl(var(--corner-color,var(--border-faint)))]" />
      <span className="absolute bottom-0 right-0 h-2 w-2 rounded-br-[var(--radius-md)] border-b-2 border-r-2 border-[hsl(var(--corner-color,var(--border-faint)))]" />
      {children}
    </div>
  );
}
