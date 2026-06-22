import fermentationDefault from "@/assets/images/wineDetailsInfo/fermentation/fermentation-default.svg";
import fermentationCelebration from "@/assets/images/wineDetailsInfo/fermentation/fermentation-celebration.svg";
import fermentationCozy from "@/assets/images/wineDetailsInfo/fermentation/fermentation-cozy-evening.svg";
import fermentationDateNight from "@/assets/images/wineDetailsInfo/fermentation/fermentation-date-night.svg";
import fermentationCulinary from "@/assets/images/wineDetailsInfo/fermentation/fermentation-culinary.svg";

import type { MoodTheme } from "@/types/mood";

export const fermentationIcons: Record<MoodTheme, string> = {
  default: fermentationDefault,
  celebration: fermentationCelebration,
  cozy: fermentationCozy,
  dateNight: fermentationDateNight,
  culinary: fermentationCulinary,
};