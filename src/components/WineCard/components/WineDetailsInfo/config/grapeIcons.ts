import grapeDefault from "@/assets/images/wineDetailsInfo/grape/grape-default.svg";
import grapeCelebration from "@/assets/images/wineDetailsInfo/grape/grape-celebration.svg";
import grapeCozy from "@/assets/images/wineDetailsInfo/grape/grape-cozy-evening.svg";
import grapeDateNight from "@/assets/images/wineDetailsInfo/grape/grape-date-night.svg";
import grapeCulinary from "@/assets/images/wineDetailsInfo/grape/grape-culinary.svg";

import type { MoodTheme } from "@/types/mood";

export const grapeIcons: Record<MoodTheme, string> = {
  default: grapeDefault,
  celebration: grapeCelebration,
  cozy: grapeCozy,
  dateNight: grapeDateNight,
  culinary: grapeCulinary,
};