import ecoDefault from "@/assets/images/wineDetailsInfo/eco/eco-default.svg";
import ecoCelebration from "@/assets/images/wineDetailsInfo/eco/eco-celebration.svg";
import ecoCozy from "@/assets/images/wineDetailsInfo/eco/eco-cozy-evening.svg";
import ecoDateNight from "@/assets/images/wineDetailsInfo/eco/eco-date-night.svg";
import ecoCulinary from "@/assets/images/wineDetailsInfo/eco/eco-culinary.svg";

import type { MoodTheme } from "@/types/mood";

export const ecoIcons: Record<MoodTheme, string> = {
  default: ecoDefault,
  celebration: ecoCelebration,
  cozy: ecoCozy,
  dateNight: ecoDateNight,
  culinary: ecoCulinary,
};