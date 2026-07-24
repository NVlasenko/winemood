import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import type { Wine } from "@/types/wine";

const QUIZ_RESULT_STORAGE_KEY = "quizResult";
const WINE_DETAILS_BACK_TARGET_KEY = "wineDetailsBackTarget";

type WineDetailsBackTarget = {
  to: string;
  label: string;
};

type QuizSessionContextValue = {
  quizResult: Wine[] | null;
  backTarget: WineDetailsBackTarget | null;
  hasQuizResult: boolean;
  saveQuizResult: (wines: Wine[]) => void;
  clearQuizResult: () => void;
  markWineDetailsOpenedFromQuizResults: () => void;
  clearWineDetailsBackTarget: () => void;
};

type Props = {
  children: ReactNode;
};

const QUIZ_RESULTS_BACK_TARGET: WineDetailsBackTarget = {
  to: "/quiz",
  label: "Quiz results",
};

const QuizSessionContext = createContext<QuizSessionContextValue | null>(null);

const getSavedQuizResult = (): Wine[] | null => {
  try {
    const savedResult = sessionStorage.getItem(QUIZ_RESULT_STORAGE_KEY);

    if (!savedResult) {
      return null;
    }

    const parsedResult = JSON.parse(savedResult);

    if (!Array.isArray(parsedResult)) {
      sessionStorage.removeItem(QUIZ_RESULT_STORAGE_KEY);

      return null;
    }

    return parsedResult as Wine[];
  } catch {
    sessionStorage.removeItem(QUIZ_RESULT_STORAGE_KEY);

    return null;
  }
};

const getSavedWineDetailsBackTarget = (): WineDetailsBackTarget | null => {
  try {
    const savedTarget = sessionStorage.getItem(WINE_DETAILS_BACK_TARGET_KEY);

    if (!savedTarget) {
      return null;
    }

    const parsedTarget = JSON.parse(savedTarget) as WineDetailsBackTarget;

    const isValidTarget =
      parsedTarget &&
      typeof parsedTarget.to === "string" &&
      typeof parsedTarget.label === "string";

    if (!isValidTarget) {
      sessionStorage.removeItem(WINE_DETAILS_BACK_TARGET_KEY);

      return null;
    }

    return parsedTarget;
  } catch {
    sessionStorage.removeItem(WINE_DETAILS_BACK_TARGET_KEY);

    return null;
  }
};

export const QuizSessionProvider = ({ children }: Props) => {
  const [quizResult, setQuizResult] = useState<Wine[] | null>(() =>
    getSavedQuizResult(),
  );

  const [backTarget, setBackTarget] = useState<WineDetailsBackTarget | null>(
    () => getSavedWineDetailsBackTarget(),
  );

  const hasQuizResult = Boolean(quizResult?.length);
  
  const saveQuizResult = useCallback((wines: Wine[]) => {
    sessionStorage.setItem(QUIZ_RESULT_STORAGE_KEY, JSON.stringify(wines));
    setQuizResult(wines);
  }, []);

  const clearQuizResult = useCallback(() => {
    sessionStorage.removeItem(QUIZ_RESULT_STORAGE_KEY);
    setQuizResult(null);
  }, []);

  const markWineDetailsOpenedFromQuizResults = useCallback(() => {
    sessionStorage.setItem(
      WINE_DETAILS_BACK_TARGET_KEY,
      JSON.stringify(QUIZ_RESULTS_BACK_TARGET),
    );

    setBackTarget(QUIZ_RESULTS_BACK_TARGET);
  }, []);

  const clearWineDetailsBackTarget = useCallback(() => {
    sessionStorage.removeItem(WINE_DETAILS_BACK_TARGET_KEY);
    setBackTarget(null);
  }, []);

  const value = useMemo(
    () => ({
      quizResult,
      backTarget,
      hasQuizResult,
      saveQuizResult,
      clearQuizResult,
      markWineDetailsOpenedFromQuizResults,
      clearWineDetailsBackTarget,
    }),
    [
      quizResult,
      backTarget,
      hasQuizResult,
      saveQuizResult,
      clearQuizResult,
      markWineDetailsOpenedFromQuizResults,
      clearWineDetailsBackTarget,
    ],
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