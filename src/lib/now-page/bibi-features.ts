import { BIBI_DOCS_BASE } from "@/lib/now-page/discord";

export type BibiFeatureKey =
  | "mine"
  | "fish"
  | "casino"
  | "lotto"
  | "stock"
  | "econ"
  | "level";

export interface BibiFeature {
  k: BibiFeatureKey;
  idx: string;
  tag: string;
  name: string;
  en: string;
  blurb: string;
  href: string;
}

export const BIBI_FEATURES: BibiFeature[] = [
  {
    k: "mine",
    idx: "01",
    tag: "Game",
    name: "挖礦",
    en: "MINING",
    href: `${BIBI_DOCS_BASE}/mining`,
    blurb:
      "敲下去就對了。升級你的鎬、賭一把區段風險、把運氣加成疊好疊滿——下一鏟，說不定就是傳說礦。",
  },
  {
    k: "fish",
    idx: "02",
    tag: "Game",
    name: "釣魚",
    en: "FISHING",
    href: `${BIBI_DOCS_BASE}/fishing`,
    blurb:
      "甩竿、等浮標、收線——靜靜等的不只是魚，還有熔岩魚、章魚、鯊魚那種會讓你尖叫的稀客。",
  },
  {
    k: "casino",
    idx: "03",
    tag: "Game",
    name: "賭場",
    en: "CASINO",
    href: `${BIBI_DOCS_BASE}/casino`,
    blurb:
      "21 點、輪盤、骰寶、老虎機全都有。莊家總是贏？那就來當那個例外（祝你好運）。",
  },
  {
    k: "lotto",
    idx: "04",
    tag: "Game",
    name: "樂透",
    en: "LOTTERY",
    href: `${BIBI_DOCS_BASE}/lottery`,
    blurb: "每日開獎，彩金一直往上疊。今天的歐皇，會不會剛好戴著你的名字？",
  },
  {
    k: "stock",
    idx: "05",
    tag: "Sim",
    name: "股市",
    en: "STOCK",
    href: `${BIBI_DOCS_BASE}/stocks`,
    blurb:
      "模擬持股、追走勢、接財報事件。零風險體驗一夜翻身，也順便體驗一下住套房。",
  },
  {
    k: "econ",
    idx: "06",
    tag: "Core",
    name: "經濟",
    en: "ECONOMY",
    href: `${BIBI_DOCS_BASE}/economy`,
    blurb: "金幣、商店、交易、每日簽到——一條龍，把你的肝平滑地變現成購買力。",
  },
  {
    k: "level",
    idx: "07",
    tag: "Social",
    name: "等級",
    en: "LEVELS",
    href: `${BIBI_DOCS_BASE}/leveling`,
    blurb: "多嘴就有獎勵。聊天升級、解鎖稱號、季賽搶排名——安靜的人，這裡吃虧。",
  },
];
