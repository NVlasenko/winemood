import sweetnessDefault from "../../../assets/images/wineCard/sweetness/sweet-default.svg";
import sweetnessCelebration from "../../../assets/images/wineCard/sweetness/sweet-celebration.svg";
import sweetnessCozy from "../../../assets/images/wineCard/sweetness/sweet-cozy-evening.svg";
import sweetnessDateNight from "../../../assets/images/wineCard/sweetness/sweet-date-night.svg";
import sweetnessCulinary from "../../../assets/images/wineCard/sweetness/sweet-culinary.svg";

import type { MoodTheme } from "../../../types/mood";

export const wineSweetnessIcons: Record<MoodTheme, string> = {
  default: sweetnessDefault,
  celebration: sweetnessCelebration,
  cozy: sweetnessCozy,
  dateNight: sweetnessDateNight,
  culinary: sweetnessCulinary,
};