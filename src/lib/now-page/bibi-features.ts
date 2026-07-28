import { BIBI_DOCS_BASE } from "@/lib/now-page/discord";

export type BibiFeatureKey =
  | "mine"
  | "fish"
  | "casino"
  | "lotto"
  | "stock"
  | "econ"
  | "level"
  | "dungeon"
  | "farm"
  | "guild"
  | "trade"
  | "theft"
  | "event"
  | "cook";

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
  {
    k: "dungeon",
    idx: "08",
    tag: "Game",
    name: "地城",
    en: "DUNGEON",
    href: `${BIBI_DOCS_BASE}/dungeon`,
    blurb:
      "跟怪物拼血條的多輪戰鬥，礦坑暴君、冰晶女王等首領輪番上陣——全服合力打世界 BOSS，接上連段傷害直接 ×1.3。傳說之劍砍斷太多次？恭喜你，本週斷劍王，詛咒認命戴著。",
  },
  {
    k: "farm",
    idx: "09",
    tag: "Game",
    name: "農場",
    en: "FARMING",
    href: `${BIBI_DOCS_BASE}/farming`,
    blurb:
      "半夜田鼠烏鴉會來洗劫你的作物，得提刀護院。撐過去才種得出傳說級黑玫瑰——限定種子從地城首領身上掉，收成還有機率挖到打造神器的素材。",
  },
  {
    k: "guild",
    idx: "10",
    tag: "Social",
    name: "公會",
    en: "GUILD",
    href: `${BIBI_DOCS_BASE}/guild`,
    blurb:
      "一個人扛不住，全公會一起扛。捐料蓋熔爐、升訓練場，膳坊點滿還能開流水席——一鍵開席，全員同時吃 buff 衝副本。",
  },
  {
    k: "trade",
    idx: "11",
    tag: "Sim",
    name: "交易",
    en: "TRADING",
    href: `${BIBI_DOCS_BASE}/trading`,
    blurb:
      "不只是擺攤賣東西。掛收購單讓別人分批賣你、開競標搶稀有礦、或直接以物易物換到你缺的貨——一整套訂單簿，價格公道還防坑人。",
  },
  {
    k: "theft",
    idx: "12",
    tag: "Game",
    name: "偷竊",
    en: "THEFT",
    href: `${BIBI_DOCS_BASE}/theft`,
    blurb:
      "半夜摸進別人錢包順手牽羊，得手了神不知鬼不覺；失風就得靠鑽暗巷、飛簷走壁甩開追兵。被偷了別急，花錢請偵探抓人——只是偵探有時候自己就是內鬼。",
  },
  {
    k: "event",
    idx: "13",
    tag: "Core",
    name: "世界事件",
    en: "EVENTS",
    href: `${BIBI_DOCS_BASE}/world-events`,
    blurb:
      "挖礦、釣魚、打副本都可能意外觸發全服任務，大家一起捐物資衝目標——達標全服直接吃 48 小時 buff，慢一步就錯過，手腳要快。",
  },
  {
    k: "cook",
    idx: "14",
    tag: "Game",
    name: "料理",
    en: "COOKING",
    href: `${BIBI_DOCS_BASE}/cooking`,
    blurb:
      "魚跟菜煮成料理不會馬上見效，放進食物倉庫挑時機吃，新鮮度越高效果越強。拿煤炭下去炭烤還能升級加強版，吃剩放到過期也能變堆肥回田裡。",
  },
];
