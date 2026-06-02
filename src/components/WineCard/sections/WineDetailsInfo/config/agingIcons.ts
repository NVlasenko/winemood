import agingDefault from "@/assets/images/wineDetailsInfo/aging/aging-default.svg";
import agingCelebration from "@/assets/images/wineDetailsInfo/aging/aging-celebration.svg";
import agingCozy from "@/assets/images/wineDetailsInfo/aging/aging-cozy-evening.svg";
import agingDateNight from "@/assets/images/wineDetailsInfo/aging/aging-date-night.svg";
import agingCulinary from "@/assets/images/wineDetailsInfo/aging/aging-culinary.svg";

import type { MoodTheme } from "@/types/mood";

export const agingIcons: Record<MoodTheme, string> = {
  default: agingDefault,
  celebration: agingCelebration,
  cozy: agingCozy,
  dateNight: agingDateNight,
  culinary: agingCulinary,
};