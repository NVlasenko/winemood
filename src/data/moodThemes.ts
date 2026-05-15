import type { MoodTheme } from '../types/mood';

export const moodThemeValues: Record<
  MoodTheme,
  {
    background: string;
    glowRgb: string;
  }
> = {
  default: {
    background:
      'linear-gradient(180deg, #0b0b0b 0%, #050505 100%)',

    glowRgb: '164, 22, 26',
  },

  celebration: {
    background: `
      radial-gradient(
        circle at top left,
        rgba(255, 210, 255, 0.18) 0%,
        transparent 32%
      ),

      radial-gradient(
        circle at top right,
        rgba(255, 120, 220, 0.12) 0%,
        transparent 28%
      ),

      linear-gradient(
        180deg,
        #3b163f 0%,
        #211026 28%,
        #120d16 58%,
        #050505 100%
      )
    `,

    glowRgb: '255, 170, 240',
  },

  cozy: {
    background: `
      radial-gradient(
        circle at top left,
        rgba(120, 180, 255, 0.18) 0%,
        transparent 34%
      ),

      radial-gradient(
        circle at top right,
        rgba(60, 120, 255, 0.12) 0%,
        transparent 28%
      ),

      linear-gradient(
        180deg,
        #102a52 0%,
        #0d1d36 30%,
        #09111f 62%,
        #050505 100%
      )
    `,

    glowRgb: '120, 180, 255',
  },

  dateNight: {
    background: `
      radial-gradient(
        circle at top left,
        rgba(255, 120, 220, 0.18) 0%,
        transparent 34%
      ),

      radial-gradient(
        circle at top right,
        rgba(255, 60, 180, 0.12) 0%,
        transparent 28%
      ),

      linear-gradient(
        180deg,
        #4a1035 0%,
        #2b0d22 30%,
        #160b13 62%,
        #050505 100%
      )
    `,

    glowRgb: '255, 90, 190',
  },

  culinary: {
    background: `
      radial-gradient(
        circle at top left,
        rgba(255, 170, 120, 0.18) 0%,
        transparent 34%
      ),

      radial-gradient(
        circle at top right,
        rgba(255, 110, 70, 0.12) 0%,
        transparent 28%
      ),

      linear-gradient(
        180deg,
        #4a1f12 0%,
        #2b140d 30%,
        #170d0b 62%,
        #050505 100%
      )
    `,

    glowRgb: '255, 140, 100',
  },
};