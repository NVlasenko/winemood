import { COLORS } from '../constants/colors';
import type { MoodTheme } from '../types/mood';

export const moodThemeValues: Record<
  MoodTheme,
  {
    background: string;
    glowRgb: string;

    buttonGradientStart: string;
    buttonGradientEnd: string;
    buttonShadow: string;

    lineGradientStart: string;
    lineGradientEnd: string;
    lineShadow: string;

    borderColor: string;

    linkColor: string;
    linkHoverColor: string;
  }
> = {
  default: {
    background: `linear-gradient(
      180deg,
      ${COLORS.darkSoft} 0%,
      ${COLORS.dark} 100%
    )`,

    glowRgb: '164, 22, 26',

    buttonGradientStart: COLORS.wineDark,
    buttonGradientEnd: COLORS.wine,
    buttonShadow: 'rgba(102, 7, 8, 0.55)',

    lineGradientStart: 'rgba(102, 7, 8, 0.12)',
    lineGradientEnd: COLORS.wine,
    lineShadow: 'rgba(164, 22, 26, 0.25)',

    borderColor: COLORS.wine,

    linkColor: 'rgba(211, 211, 211, 1)',
    linkHoverColor: 'rgba(186, 24, 27, 1)',
  },

  celebration: {
    background: `
      radial-gradient(circle at top left, rgba(255, 210, 255, 0.18) 0%, transparent 32%),
      radial-gradient(circle at top right, rgba(255, 120, 220, 0.12) 0%, transparent 28%),
      linear-gradient(180deg, #3b163f 0%, #211026 28%, #120d16 58%, ${COLORS.dark} 100%)
    `,

    glowRgb: '255, 170, 240',

    buttonGradientStart: COLORS.celebrationDark,
    buttonGradientEnd: COLORS.celebration,
    buttonShadow: 'rgba(247, 170, 251, 0.55)',

    lineGradientStart: 'rgba(247, 170, 251, 0.12)',
    lineGradientEnd: COLORS.celebration,
    lineShadow: 'rgba(247, 170, 251, 0.35)',

    borderColor: COLORS.celebration,

    linkColor: 'rgba(255, 255, 255, 0.95)',
    linkHoverColor: 'rgba(247, 170, 251, 1)',
  },

  cozy: {
    background: `
      radial-gradient(circle at top left, rgba(120, 180, 255, 0.18) 0%, transparent 34%),
      radial-gradient(circle at top right, rgba(60, 120, 255, 0.12) 0%, transparent 28%),
      linear-gradient(180deg, #102a52 0%, #0d1d36 30%, #09111f 62%, ${COLORS.dark} 100%)
    `,

    glowRgb: '120, 180, 255',

    buttonGradientStart: COLORS.cozyDark,
    buttonGradientEnd: COLORS.cozy,
    buttonShadow: 'rgba(125, 211, 252, 0.45)',

    lineGradientStart: 'rgba(125, 211, 252, 0.12)',
    lineGradientEnd: COLORS.cozy,
    lineShadow: 'rgba(125, 211, 252, 0.35)',

    borderColor: COLORS.cozy,

    linkColor: 'rgba(230, 240, 255, 0.96)',
    linkHoverColor: 'rgba(125, 211, 252, 1)',
  },

  dateNight: {
    background: `
      radial-gradient(circle at top left, rgba(255, 120, 220, 0.18) 0%, transparent 34%),
      radial-gradient(circle at top right, rgba(255, 60, 180, 0.12) 0%, transparent 28%),
      linear-gradient(180deg, #4a1035 0%, #2b0d22 30%, #160b13 62%, ${COLORS.dark} 100%)
    `,

    glowRgb: '255, 90, 190',

    buttonGradientStart: COLORS.dateNightDark,
    buttonGradientEnd: COLORS.dateNight,
    buttonShadow: 'rgba(255, 79, 163, 0.45)',

    lineGradientStart: 'rgba(255, 79, 163, 0.12)',
    lineGradientEnd: COLORS.dateNight,
    lineShadow: 'rgba(255, 79, 163, 0.35)',

    borderColor: COLORS.dateNight,

    linkColor: 'rgba(255, 240, 248, 0.96)',
    linkHoverColor: 'rgba(255, 79, 163, 1)',
  },

  culinary: {
    background: `
      radial-gradient(circle at top left, rgba(255, 170, 120, 0.18) 0%, transparent 34%),
      radial-gradient(circle at top right, rgba(255, 110, 70, 0.12) 0%, transparent 28%),
      linear-gradient(180deg, #4a1f12 0%, #2b140d 30%, #170d0b 62%, ${COLORS.dark} 100%)
    `,

    glowRgb: '255, 140, 100',

    buttonGradientStart: COLORS.culinaryDark,
    buttonGradientEnd: COLORS.culinary,
    buttonShadow: 'rgba(255, 94, 50, 0.45)',

    lineGradientStart: 'rgba(255, 94, 50, 0.12)',
    lineGradientEnd: COLORS.culinary,
    lineShadow: 'rgba(255, 94, 50, 0.35)',

    borderColor: COLORS.culinary,

    linkColor: 'rgba(255, 244, 235, 0.96)',
    linkHoverColor: 'rgba(255, 94, 50, 1)',
  },
};