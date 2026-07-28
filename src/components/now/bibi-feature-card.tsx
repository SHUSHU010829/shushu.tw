import type { BibiFeature } from "@/lib/now-page/bibi-features";
import { BibiPreview } from "@/components/now/bibi-preview";

export function BibiFeatureCard({ feature }: { feature: BibiFeature }) {
  return (
    <a
      href={feature.href}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      data-carousel-card
      className="group flex min-h-[340px] w-[280px] shrink-0 snap-start flex-col gap-3 rounded-[var(--radius-md)] border border-[hsl(var(--border-faint))] bg-[hsl(var(--surface-panel-2))] p-4 hover:border-[hsl(var(--signal-live))] focus-visible:border-[hsl(var(--signal-live))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--signal-live))] focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--surface-panel-2))] motion-safe:transition-[transform,border-color] motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5 sm:w-[300px] xl:w-[320px]"
    >
      <div className="flex items-center justify-between" aria-hidden="true">
        <span className="font-mono text-[11px] text-[hsl(var(--text-dim))]">
          [{feature.idx}/07]
        </span>
        <span className="rounded-[var(--radius-sm)] border border-[hsl(var(--border-faint))] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[hsl(var(--text-subtle))]">
          {feature.tag}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="font-notoSans text-[20px] font-bold text-[hsl(var(--text-body))]">
          {feature.name}
        </h3>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[hsl(var(--text-subtle))]">
          {feature.en}
        </span>
      </div>

      <p className="font-notoSans text-[12.5px] leading-[1.7] text-[hsl(var(--text-muted))]">
        {feature.blurb}
      </p>

      <BibiPreview k={feature.k} />

      <span className="sr-only">（開新分頁）</span>
    </a>
  );
}
