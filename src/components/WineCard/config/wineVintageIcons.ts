import vintageDefault from "../../../assets/images/wineCard/vintage/vintage-default.svg";
import vintageCelebration from "../../../assets/images/wineCard/vintage/vintage-celebration.svg";
import vintageCozy from "../../../assets/images/wineCard/vintage/vintage-cozy-evening.svg";
import vintageDateNight from "../../../assets/images/wineCard/vintage/vintage-date-night.svg";
import vintageCulinary from "../../../assets/images/wineCard/vintage/vintage-culinary.svg";

import type { MoodTheme } from "../../../types/mood";

export const wineVintageIcons: Record<MoodTheme, string> = {
  default: vintageDefault,
  celebration: vintageCelebration,
  cozy: vintageCozy,
  dateNight: vintageDateNight,
  culinary: vintageCulinary,
};