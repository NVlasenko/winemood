import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { WineCatalogCard } from "@/types/wineCatalogCard";

type WineDetailsBackTarget = {
  to: string;
  label: string;
};

type QuizSessionContextValue = {
  quizResult: WineCatalogCard[] | null;
  backTarget: WineDetailsBackTarget | null;

  saveQuizResult: (wines: WineCatalogCard[]) => void;
  clearQuizResult: () => void;

  markWineDetailsOpenedFromQuizResults: () => void;
  clearWineDetailsBackTarget: () => void;
};

const QuizSessionContext = createContext<QuizSessionContextValue | null>(null);

const QUIZ_RESULTS_BACK_TARGET: WineDetailsBackTarget = {
  to: "/quiz",
  label: "Quiz results",
};

export const QuizSessionProvider = ({ children }: { children: ReactNode }) => {
  const [quizResult, setQuizResult] = useState<WineCatalogCard[] | null>(null);
  const [backTarget, setBackTarget] = useState<WineDetailsBackTarget | null>(null);

  const saveQuizResult = useCallback((wines: WineCatalogCard[]) => {
    setQuizResult(wines);
  }, []);

  const clearQuizResult = useCallback(() => {
    setQuizResult(null);
  }, []);

  const markWineDetailsOpenedFromQuizResults = useCallback(() => {
    setBackTarget(QUIZ_RESULTS_BACK_TARGET);
  }, []);

  const clearWineDetailsBackTarget = useCallback(() => {
    setBackTarget(null);
  }, []);

  const value = useMemo(
    () => ({
      quizResult,
      backTarget,
      saveQuizResult,
      clearQuizResult,
      markWineDetailsOpenedFromQuizResults,
      clearWineDetailsBackTarget,
    }),
    [
      quizResult,
      backTarget,
      saveQuizResult,
      clearQuizResult,
      markWineDetailsOpenedFromQuizResults,
      clearWineDetailsBackTarget,
    ]
  );

  return (
    <QuizSessionContext.Provider value={value}>
      {children}
    </QuizSessionContext.Provider>
  );
};

export const useQuizSession = () => {
  const context = useContext(QuizSessionContext);

  if (!context) {
    throw new Error("useQuizSession must be used within QuizSessionProvider");
  }

  return context;
};