import type { MoodTheme } from '../types/mood';

import arrowDefault from '../assets/images/moods/mood-arrows/arrow-default.svg';
import arrowCelebration from '../assets/images/moods/mood-arrows/arrow-celebration.svg';
import arrowCozy from '../assets/images/moods/mood-arrows/arrow-cozy.svg';
import arrowDateNight from '../assets/images/moods/mood-arrows/arrow-date-night.svg';
import arrowCulinary from '../assets/images/moods/mood-arrows/arrow-culinary.svg';

export const moodArrows: Record<MoodTheme, string> = {
  default: arrowDefault,
  celebration: arrowCelebration,
  cozy: arrowCozy,
  dateNight: arrowDateNight,
  culinary: arrowCulinary,
};