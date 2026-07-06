import wineOriginsImage from "@/assets/images/history/historyOrigins/history-wine-origins.png";
import ancientCivilizationsImage from "@/assets/images/history/historyOrigins/history-ancient-civilizations.png";
import monasticTraditionsImage from "@/assets/images/history/historyOrigins/history-monastic-traditions.png";
import wineCultureImage from "@/assets/images/history/historyOrigins/history-wine-culture.png";

import GrapeIcon from "@/assets/images/history/historyOrigins/icons/grape-default.svg?react";
import TempleIcon from "@/assets/images/history/historyOrigins/icons/temple-default.svg?react";
import CastleIcon from "@/assets/images/history/historyOrigins/icons/castle-default.svg?react";
import GlobeIcon from "@/assets/images/history/historyOrigins/icons/globe-default.svg?react";

export const ORIGINS = [
  {
    id: "origins",
    title: "Origins of Wine",
    text: "Wine is one of the oldest alcoholic beverages in human history. Archaeological evidence suggests that winemaking began more than 8,000 years ago in the region of present-day Georgia. Clay vessels containing traces of fermented grapes reveal humanity's long-standing relationship with wine.",
    image: wineOriginsImage,
    Icon: GrapeIcon,
  },
  {
    id: "ancient-civilizations",
    title: "Wine in Ancient Civilizations",
    text: "The Egyptians, Greeks, and Romans considered wine an essential part of daily life. It was used in religious ceremonies, celebrations, and trade. The Romans played a major role in spreading viticulture throughout Europe.",
    image: ancientCivilizationsImage,
    Icon: TempleIcon,
  },
  {
    id: "monastic-traditions",
    title: "Monastic Traditions",
    text: "During the Middle Ages, monasteries became centers of winemaking knowledge. Monks carefully documented vineyard practices, improved cultivation techniques, and helped preserve wine culture across Europe.",
    image: monasticTraditionsImage,
    Icon: CastleIcon,
  },
  {
    id: "modern-wine-culture",
    title: "Modern Wine Culture",
    text: "Today, wine connects tradition with modern taste. From family vineyards to global wine regions, it continues to shape gastronomy, travel, celebration, and cultural identity.",
    image: wineCultureImage,
    Icon: GlobeIcon,
  },
] as const;