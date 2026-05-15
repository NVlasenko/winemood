import { createContext, useContext, useEffect, useState } from 'react';

import type { MoodTheme } from '../types/mood';
import { moodThemeValues } from '../data/moodThemes';

type MoodThemeContextType = {
  moodTheme: MoodTheme;
  setMoodTheme: (theme: MoodTheme) => void;
};

const MoodThemeContext = createContext<MoodThemeContextType | undefined>(
  undefined,
);

export const MoodThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [moodTheme, setMoodTheme] = useState<MoodTheme>('default');

  useEffect(() => {
    const theme = moodThemeValues[moodTheme];

    document.documentElement.style.setProperty('--background', theme.background);
    document.documentElement.style.setProperty('--wine-glow-rgb', theme.glowRgb);
  }, [moodTheme]);

  return (
    <MoodThemeContext.Provider value={{ moodTheme, setMoodTheme }}>
      {children}
    </MoodThemeContext.Provider>
  );
};

export const useMoodTheme = () => {
  const context = useContext(MoodThemeContext);

  if (!context) {
    throw new Error('useMoodTheme must be used within MoodThemeProvider');
  }

  return context;
};