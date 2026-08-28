import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import type { MoodTheme } from "../types/mood";
import { moodThemeValues } from "../data/moodThemes";

const MOOD_THEME_STORAGE_KEY = "moodTheme";

type MoodThemeContextType = {
  moodTheme: MoodTheme;
  setMoodTheme: (theme: MoodTheme) => void;
};

const MoodThemeContext = createContext<
  MoodThemeContextType | undefined
>(undefined);

const getInitialMoodTheme = (): MoodTheme => {
  if (typeof window === "undefined") {
    return "default";
  }

  const savedTheme = localStorage.getItem(
    MOOD_THEME_STORAGE_KEY
  );

  if (
    savedTheme &&
    savedTheme in moodThemeValues
  ) {
    return savedTheme as MoodTheme;
  }

  return "default";
};

export const MoodThemeProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [moodTheme, setMoodTheme] =
    useState<MoodTheme>(getInitialMoodTheme);

  useLayoutEffect(() => {
    const theme = moodThemeValues[moodTheme];
    const root = document.documentElement;

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
      cssVariables
    ).forEach(([key, value]) => {
      root.style.setProperty(
        key,
        value
      );
    });

    localStorage.setItem(
      MOOD_THEME_STORAGE_KEY,
      moodTheme
    );
  }, [moodTheme]);

  const value = useMemo(
    () => ({
      moodTheme,
      setMoodTheme,
    }),
    [moodTheme]
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
    useContext(
      MoodThemeContext
    );

  if (!context) {
    throw new Error(
      "useMoodTheme must be used within MoodThemeProvider"
    );
  }

  return context;
};