import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { MoodTheme } from "../types/mood";
import { moodThemeValues } from "../data/moodThemes";

const MOOD_THEME_STORAGE_KEY = "moodTheme";
const MOOD_THEME_COOKIE_KEY = "moodTheme";

type MoodThemeContextType = {
  moodTheme: MoodTheme;
  setMoodTheme: (theme: MoodTheme) => void;
};

type MoodThemeProviderProps =
  React.PropsWithChildren<{
    initialMoodTheme?: MoodTheme;
  }>;

const MoodThemeContext = createContext<
  MoodThemeContextType | undefined
>(undefined);

const applyMoodTheme = (
  moodTheme: MoodTheme,
) => {
  const theme =
    moodThemeValues[moodTheme];

  const root =
    document.documentElement;

  const cssVariables = {
    "--background":
      theme.background,

    "--wine-glow-rgb":
      theme.glowRgb,

    "--button-gradient-start":
      theme.buttonGradientStart,

    "--button-gradient-end":
      theme.buttonGradientEnd,

    "--button-shadow":
      theme.buttonShadow,

    "--line-gradient-start":
      theme.lineGradientStart,

    "--line-gradient-end":
      theme.lineGradientEnd,

    "--line-shadow":
      theme.lineShadow,

    "--border-color":
      theme.borderColor,

    "--mood-link-color":
      theme.linkColor,

    "--mood-link-hover-color":
      theme.linkHoverColor,

    "--wine-background-start":
      theme.wineBackgroundStart,

    "--wine-background-middle":
      theme.wineBackgroundMiddle,

    "--wine-background-end":
      theme.wineBackgroundEnd,

    "--theme-icon-gradient-start":
      theme.themeIconGradientStart,

    "--theme-icon-gradient-end":
      theme.themeIconGradientEnd,
  };

  Object.entries(
    cssVariables,
  ).forEach(([key, value]) => {
    root.style.setProperty(
      key,
      value,
    );
  });
};

const saveMoodTheme = (
  moodTheme: MoodTheme,
) => {
  localStorage.setItem(
    MOOD_THEME_STORAGE_KEY,
    moodTheme,
  );

  document.cookie =
    `${MOOD_THEME_COOKIE_KEY}=${encodeURIComponent(
      moodTheme,
    )}; Path=/; Max-Age=31536000; SameSite=Lax`;
};

export const MoodThemeProvider = ({
  children,
  initialMoodTheme = "default",
}: MoodThemeProviderProps) => {
  const [
    moodTheme,
    setMoodThemeState,
  ] = useState<MoodTheme>(
    initialMoodTheme,
  );

  const setMoodTheme =
    useCallback(
      (theme: MoodTheme) => {

        applyMoodTheme(theme);
        saveMoodTheme(theme);
        setMoodThemeState(theme);
      },
      [],
    );

  const value = useMemo(
    () => ({
      moodTheme,
      setMoodTheme,
    }),
    [
      moodTheme,
      setMoodTheme,
    ],
  );

  return (
    <MoodThemeContext.Provider
      value={value}
    >
      {children}
    </MoodThemeContext.Provider>
  );
};

export const useMoodTheme = () => {
  const context =
    useContext(MoodThemeContext);

  if (!context) {
    throw new Error(
      "useMoodTheme must be used within MoodThemeProvider",
    );
  }

  return context;
};