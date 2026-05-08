import { cn } from "@/lib/utils";

interface HudLabelProps {
  label: string;
  className?: string;
}

export function HudLabel({ label, className }: HudLabelProps) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.22em] text-[hsl(var(--text-muted))]",
        className
      )}
    >
      {"// "}
      {label}
    </span>
  );
}
