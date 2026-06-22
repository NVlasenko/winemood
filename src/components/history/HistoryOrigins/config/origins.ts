import wineOriginsImage from "@/assets/images/history/historyOrigins/history-wine-origins.svg";
import ancientCivilizationsImage from "@/assets/images/history/historyOrigins/history-ancient-civilizations.svg";
import monasticTraditionsImage from "@/assets/images/history/historyOrigins/history-monastic-traditions.svg";
import wineCultureImage from "@/assets/images/history/historyOrigins/history-wine-culture.svg";

import { grapeIcons } from "./grapeIcons";
import { templeIcons } from "./templeIcons";
import { castleIcons } from "./castleIcons";
import { globeIcons } from "./globeIcons";

export const ORIGINS = [
  {
    id: "origins",
    title: "Origins of Wine",
    text: "Wine is one of the oldest alcoholic beverages in human history. Archaeological evidence suggests that winemaking began more than 8,000 years ago in the region of present-day Georgia. Clay vessels containing traces of fermented grapes reveal humanity's long-standing relationship with wine.",
    image: wineOriginsImage,
    icons: grapeIcons,
  },
  {
    id: "ancient-civilizations",
    title: "Wine in Ancient Civilizations",
    text: "The Egyptians, Greeks, and Romans considered wine an essential part of daily life. It was used in religious ceremonies, celebrations, and trade. The Romans played a major role in spreading viticulture throughout Europe.",
    image: ancientCivilizationsImage,
    icons: templeIcons,
  },
  {
    id: "monastic-traditions",
    title: "Monastic Traditions",
    text: "During the Middle Ages, monasteries became centers of winemaking knowledge. Monks carefully documented vineyard practices, improved cultivation techniques, and helped preserve wine culture across Europe.",
    image: monasticTraditionsImage,
    icons: castleIcons,
  },
  {
    id: "modern-wine-culture",
    title: "Modern Wine Culture",
    text: "Today, wine connects tradition with modern taste. From family vineyards to global wine regions, it continues to shape gastronomy, travel, celebration, and cultural identity.",
    image: wineCultureImage,
    icons: globeIcons,
  },
] as const;