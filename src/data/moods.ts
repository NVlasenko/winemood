import type { Mood } from '../types/mood';

import celebrationImage from '../assets/images/moods/celebration.png';
import cozyEveningImage from '../assets/images/moods/cozy-evening.png';
import dateNightImage from '../assets/images/moods/date-night.png';
import culinaryImage from '../assets/images/moods/culinary.png';

export const moods: Mood[] = [
  {
    id: 1,
    title: 'Celebration',
    image: celebrationImage,
    theme: 'celebration',
  },

  {
    id: 2,
    title: 'Cozy Evening',
    image: cozyEveningImage,
    theme: 'cozy',
  },

  {
    id: 3,
    title: 'Date Night',
    image: dateNightImage,
    theme: 'dateNight',
  },

  {
    id: 4,
    title: 'Culinary',
    image: culinaryImage,
    theme: 'culinary',
  },
];