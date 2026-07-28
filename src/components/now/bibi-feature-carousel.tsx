"use client";

import { HudLabel } from "@/components/hud/hud-label";
import { BibiFeatureCard } from "@/components/now/bibi-feature-card";
import { BIBI_FEATURES } from "@/lib/now-page/bibi-features";
import { useDragScroll } from "@/hooks/use-drag-scroll";

export function BibiFeatureCarousel() {
  const { ref, dragging, scrollByCard } = useDragScroll<HTMLDivElement>();

  return (
    <div>
      <div className="flex items-center justify-between px-4 pt-4 md:px-6">
        <HudLabel label="BIBIBOT_MODULES" />
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] tracking-[0.12em] text-[hsl(var(--text-subtle))]">
            [←→] 拖曳瀏覽
          </span>
          <div className="hidden items-center gap-1 lg:flex">
            <button
              type="button"
              aria-label="上一組"
              onClick={() => scrollByCard(-1)}
              className="rounded-[var(--radius-sm)] border border-[hsl(var(--border-faint))] px-2 py-1 font-mono text-[11px] text-[hsl(var(--text-muted))] transition-colors duration-200 hover:border-[hsl(var(--signal-live))] hover:text-[hsl(var(--signal-live))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--signal-live))]"
            >
              ←
            </button>
            <button
              type="button"
              aria-label="下一組"
              onClick={() => scrollByCard(1)}
              className="rounded-[var(--radius-sm)] border border-[hsl(var(--border-faint))] px-2 py-1 font-mono text-[11px] text-[hsl(var(--text-muted))] transition-colors duration-200 hover:border-[hsl(var(--signal-live))] hover:text-[hsl(var(--signal-live))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--signal-live))]"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={ref}
        tabIndex={0}
        role="region"
        aria-label="BIBIBOT 功能一覽"
        data-dragging={dragging}
        className="flex cursor-grab select-none snap-x snap-mandatory scroll-pl-4 gap-3 overflow-x-auto px-4 pb-4 pt-3 [scrollbar-color:hsl(var(--border-subtle))_transparent] [scrollbar-width:thin] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[hsl(var(--signal-live))] data-[dragging=true]:cursor-grabbing data-[dragging=true]:snap-none md:scroll-pl-6 md:px-6 [&::-webkit-scrollbar-thumb]:bg-[hsl(var(--border-subtle))] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5"
      >
        {BIBI_FEATURES.map(feature => (
          <BibiFeatureCard key={feature.k} feature={feature} />
        ))}
      </div>
    </div>
  );
}
