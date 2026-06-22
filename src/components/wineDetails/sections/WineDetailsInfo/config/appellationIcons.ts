import appellationDefault from "@/assets/images/wineDetailsInfo/appellation/appellation-default.svg";
import appellationCelebration from "@/assets/images/wineDetailsInfo/appellation/appellation-celebration.svg";
import appellationCozy from "@/assets/images/wineDetailsInfo/appellation/appellation-cozy-evening.svg";
import appellationDateNight from "@/assets/images/wineDetailsInfo/appellation/appellation-date-night.svg";
import appellationCulinary from "@/assets/images/wineDetailsInfo/appellation/appellation-culinary.svg";

import type { MoodTheme } from "@/types/mood";

export const appellationIcons: Record<MoodTheme, string> = {
  default: appellationDefault,
  celebration: appellationCelebration,
  cozy: appellationCozy,
  dateNight: appellationDateNight,
  culinary: appellationCulinary,
};