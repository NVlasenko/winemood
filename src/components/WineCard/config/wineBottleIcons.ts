import bottleDefault from "../../../assets/images/wineCard/bottle/bottle-default.svg";
import bottleCelebration from "../../../assets/images/wineCard/bottle/bottle-celebration.svg";
import bottleCozy from "../../../assets/images/wineCard/bottle/bottle-cozy-evening.svg";
import bottleDateNight from "../../../assets/images/wineCard/bottle/bottle-date-night.svg";
import bottleCulinary from "../../../assets/images/wineCard/bottle/bottle-culinary.svg";

import type { MoodTheme } from "../../../types/mood";

export const wineBottleIcons: Record<MoodTheme, string> = {
  default: bottleDefault,
  celebration: bottleCelebration,
  cozy: bottleCozy,
  dateNight: bottleDateNight,
  culinary: bottleCulinary,
};