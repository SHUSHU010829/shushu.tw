import type { BibiFeatureKey } from "@/lib/now-page/bibi-features";

const screenBase =
  "relative h-[116px] w-full overflow-hidden rounded-[var(--radius-sm)] border border-[hsl(var(--border-faint))] bg-[hsl(var(--surface-void))] px-3 py-2.5";

const scanlineStyle = {
  background:
    "repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,255,135,0.04) 2px 3px)",
};

function ScreenLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] tracking-[0.05em] text-[hsl(var(--text-dim))]">
      {children}
    </span>
  );
}

function MinePreview() {
  return (
    <>
      <ScreenLabel>DEPTH 1,204m</ScreenLabel>
      <div className="mt-4 font-mono text-[10px] text-[hsl(var(--text-subtle))]">
        礦脈進度
      </div>
      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[hsl(var(--border-faint))]">
        <div className="h-full w-[38%] rounded-full bg-[hsl(var(--signal-live))] group-hover:w-[88%] group-focus-visible:w-[88%] motion-safe:transition-[width] motion-safe:duration-700 motion-reduce:w-[88%]" />
      </div>
      <div className="mt-2 font-mono text-[10px] text-[hsl(var(--text-dim))]">
        運氣加成 ×1.8　·　鎬 Lv.7
      </div>
    </>
  );
}

function FishPreview() {
  return (
    <>
      <ScreenLabel>CAST · 18m</ScreenLabel>
      <svg
        className="absolute inset-x-0 bottom-0 h-16 w-full"
        viewBox="0 0 240 88"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="group-hover:translate-x-[-6px] group-focus-visible:translate-x-[-6px] motion-safe:transition-transform motion-safe:duration-1000"
          d="M0,40 Q30,32 60,40 T120,40 T180,40 T240,40 V88 H0 Z"
          fill="hsl(var(--signal-tier2)/0.12)"
        />
        <path
          className="group-hover:translate-x-[8px] group-focus-visible:translate-x-[8px] motion-safe:transition-transform motion-safe:duration-1000"
          d="M0,52 Q30,46 60,52 T120,52 T180,52 T240,52 V88 H0 Z"
          fill="hsl(var(--signal-tier2)/0.2)"
        />
        <line
          x1="40"
          y1="6"
          x2="120"
          y2="44"
          stroke="hsl(var(--text-dim))"
          strokeWidth="1"
        />
        <circle cx="120" cy="44" r="4" fill="hsl(var(--signal-cheer))" />
        <g
          className="opacity-0 group-hover:translate-x-[-160px] group-hover:opacity-100 group-focus-visible:translate-x-[-160px] group-focus-visible:opacity-100 motion-safe:transition-all motion-safe:duration-[1100ms] motion-reduce:opacity-100"
          style={{ transform: "translate(220px, 60px)" }}
        >
          <path
            d="M0,0 Q8,-6 18,0 Q8,6 0,0 Z M-4,0 L0,-3 L0,3 Z"
            fill="hsl(var(--signal-live))"
          />
        </g>
      </svg>
      <div className="absolute bottom-2 left-3 font-mono text-[10px] text-[hsl(var(--text-dim))]">
        竹釣竿　·　魚袋 12 / 30
      </div>
    </>
  );
}

function CasinoPreview() {
  return (
    <>
      <ScreenLabel>BLACKJACK</ScreenLabel>
      <div className="mt-6 flex items-center gap-2">
        <span className="flex h-10 w-7 items-center justify-center rounded-[var(--radius-sm)] border border-[hsl(var(--border-subtle))] font-mono text-[11px] text-[hsl(var(--text-body))] [transition-delay:0ms] group-hover:-translate-y-1 group-hover:rotate-[-4deg] group-focus-visible:-translate-y-1 group-focus-visible:rotate-[-4deg] motion-safe:transition-transform motion-safe:duration-300">
          A♠
        </span>
        <span className="flex h-10 w-7 items-center justify-center rounded-[var(--radius-sm)] border border-[hsl(var(--signal-live))] font-mono text-[11px] text-[hsl(var(--signal-live))] [transition-delay:60ms] group-hover:-translate-y-1 group-hover:rotate-[3deg] group-focus-visible:-translate-y-1 group-focus-visible:rotate-[3deg] motion-safe:transition-transform motion-safe:duration-300">
          K♥
        </span>
        <span className="flex h-10 w-7 items-center justify-center rounded-[var(--radius-sm)] border border-dashed border-[hsl(var(--border-faint))] font-mono text-[11px] text-[hsl(var(--text-dim))] [transition-delay:120ms] group-hover:-translate-y-1 group-focus-visible:-translate-y-1 motion-safe:transition-transform motion-safe:duration-300">
          ?
        </span>
      </div>
      <div className="mt-2 font-mono text-[11px] text-[hsl(var(--text-body))]">
        21 · BLACKJACK
      </div>
    </>
  );
}

function LottoPreview() {
  return (
    <>
      <ScreenLabel>DRAW #318</ScreenLabel>
      <div className="mt-6 flex items-center gap-2">
        {[
          { n: "07", delay: "0ms", hot: false },
          { n: "23", delay: "60ms", hot: true },
          { n: "41", delay: "120ms", hot: false },
        ].map(ball => (
          <span
            key={ball.n}
            className={`flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[11px] group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5 motion-safe:transition-transform motion-safe:duration-300 ${
              ball.hot
                ? "border-[hsl(var(--signal-cheer))] text-[hsl(var(--signal-cheer))]"
                : "border-[hsl(var(--border-subtle))] text-[hsl(var(--text-body))]"
            }`}
            style={{ transitionDelay: ball.delay }}
          >
            {ball.n}
          </span>
        ))}
      </div>
      <div className="mt-2 font-mono text-[11px] text-[hsl(var(--text-subtle))]">
        彩金池 <span className="text-[hsl(var(--signal-cheer))]">842,500</span>
      </div>
    </>
  );
}

function StockPreview() {
  return (
    <>
      <ScreenLabel>$SHUSHU ▲</ScreenLabel>
      <svg
        className="mt-3 h-[60px] w-full"
        viewBox="0 0 240 70"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,54 L34,48 L68,52 L102,34 L136,40 L170,22 L204,28 L240,8 L240,70 L0,70 Z"
          fill="hsl(var(--signal-live)/0.12)"
        />
        <path
          d="M0,54 L34,48 L68,52 L102,34 L136,40 L170,22 L204,28 L240,8"
          fill="none"
          stroke="hsl(var(--signal-live))"
          strokeWidth="2"
          className="[stroke-dasharray:240] [stroke-dashoffset:240] group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0] motion-safe:transition-[stroke-dashoffset] motion-safe:duration-[1100ms] motion-reduce:[stroke-dashoffset:0]"
        />
        <circle cx="240" cy="8" r="3.5" fill="hsl(var(--signal-live))" />
      </svg>
    </>
  );
}

function EconPreview() {
  return (
    <>
      <ScreenLabel>WALLET</ScreenLabel>
      <div className="mt-5 flex items-center gap-3">
        <div className="relative h-6 w-8">
          <i className="absolute bottom-0 left-0 h-2 w-8 rounded-[2px] bg-[hsl(var(--signal-cheer))] group-hover:-translate-y-[2px] group-focus-visible:-translate-y-[2px] motion-safe:transition-transform motion-safe:duration-300" />
          <i className="absolute bottom-2 left-0 h-2 w-8 rounded-[2px] bg-[hsl(var(--signal-cheer)/0.8)] [transition-delay:60ms] group-hover:-translate-y-[5px] group-focus-visible:-translate-y-[5px] motion-safe:transition-transform motion-safe:duration-300" />
          <i className="absolute bottom-4 left-0 h-2 w-8 rounded-[2px] bg-[hsl(var(--signal-cheer)/0.6)] [transition-delay:120ms] group-hover:-translate-y-[9px] group-focus-visible:-translate-y-[9px] motion-safe:transition-transform motion-safe:duration-300" />
        </div>
        <div className="font-mono text-[16px] text-[hsl(var(--text-body))]">
          12,480{" "}
          <em className="text-[11px] not-italic text-[hsl(var(--text-muted))]">
            金幣
          </em>
        </div>
      </div>
      <div className="mt-3 font-mono text-[11px] text-[hsl(var(--text-dim))]">
        每日簽到 +250　·　連續 47 天
      </div>
    </>
  );
}

function LevelPreview() {
  return (
    <>
      <ScreenLabel>SEASON 4</ScreenLabel>
      <div className="mt-5 flex items-center gap-3">
        <span className="flex h-10 w-10 flex-col items-center justify-center rounded-[var(--radius-sm)] border border-[hsl(var(--signal-tier2))] font-mono text-[10px] leading-tight text-[hsl(var(--signal-tier2))]">
          LV
          <br />
          28
        </span>
        <div className="flex-1">
          <div className="mb-1.5 font-mono text-[10px] text-[hsl(var(--text-subtle))]">
            距離下一級 720 XP
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-[hsl(var(--border-faint))]">
            <div className="h-full w-[38%] rounded-full bg-[hsl(var(--signal-tier2))] group-hover:w-[88%] group-focus-visible:w-[88%] motion-safe:transition-[width] motion-safe:duration-700 motion-reduce:w-[88%]" />
          </div>
        </div>
      </div>
      <div className="mt-2 font-mono text-[10px] text-[hsl(var(--text-dim))]">
        稱號：嘴最碎的礦工
      </div>
    </>
  );
}

const PREVIEWS: Record<BibiFeatureKey, () => React.ReactNode> = {
  mine: MinePreview,
  fish: FishPreview,
  casino: CasinoPreview,
  lotto: LottoPreview,
  stock: StockPreview,
  econ: EconPreview,
  level: LevelPreview,
};

export function BibiPreview({ k }: { k: BibiFeatureKey }) {
  const Preview = PREVIEWS[k];
  return (
    <div className={screenBase} style={scanlineStyle} aria-hidden="true">
      <Preview />
    </div>
  );
}
