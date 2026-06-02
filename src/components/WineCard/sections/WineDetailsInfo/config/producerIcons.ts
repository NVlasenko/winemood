import producerDefault from "@/assets/images/wineDetailsInfo/producer/producer-default.svg";
import producerCelebration from "@/assets/images/wineDetailsInfo/producer/producer-celebration.svg";
import producerCozy from "@/assets/images/wineDetailsInfo/producer/producer-cozy-evening.svg";
import producerDateNight from "@/assets/images/wineDetailsInfo/producer/producer-date-night.svg";
import producerCulinary from "@/assets/images/wineDetailsInfo/producer/producer-culinary.svg";

import type { MoodTheme } from "@/types/mood";

export const producerIcons: Record<MoodTheme, string> = {
  default: producerDefault,
  celebration: producerCelebration,
  cozy: producerCozy,
  dateNight: producerDateNight,
  culinary: producerCulinary,
};