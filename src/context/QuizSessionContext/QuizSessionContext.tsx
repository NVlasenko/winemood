import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { WineCatalogCard } from "@/types/wineCatalogCard";

import { useAuth } from "@/context/AuthContext";

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

const QUIZ_RESULT_STORAGE_KEY = "quizResult";

const QUIZ_RESULTS_BACK_TARGET: WineDetailsBackTarget = {
  to: "/quiz",
  label: "Quiz results",
};

const getSavedQuizResult = (): WineCatalogCard[] | null => {
  try {
    const savedQuiz = sessionStorage.getItem(QUIZ_RESULT_STORAGE_KEY);

    if (!savedQuiz) {
      return null;
    }

    const parsed = JSON.parse(savedQuiz);

    if (!Array.isArray(parsed)) {
      sessionStorage.removeItem(QUIZ_RESULT_STORAGE_KEY);

      return null;
    }

    return parsed;
  } catch {
    sessionStorage.removeItem(QUIZ_RESULT_STORAGE_KEY);

    return null;
  }
};

export const QuizSessionProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();

  const [quizResult, setQuizResult] = useState<WineCatalogCard[] | null>(() =>
    getSavedQuizResult()
  );

  const [backTarget, setBackTarget] = useState<WineDetailsBackTarget | null>(
    null
  );

  const previousUserIdRef = useRef<number | null>(user?.id ?? null);

  const clearQuizResult = useCallback(() => {
    setQuizResult(null);

    sessionStorage.removeItem(QUIZ_RESULT_STORAGE_KEY);
  }, []);
  const saveQuizResult = useCallback(
    (wines: WineCatalogCard[]) => {
      setQuizResult(wines);

      if (!isAuthenticated) {
        sessionStorage.setItem(QUIZ_RESULT_STORAGE_KEY, JSON.stringify(wines));
      }
    },
    [isAuthenticated]
  );

  const markWineDetailsOpenedFromQuizResults = useCallback(() => {
    setBackTarget(QUIZ_RESULTS_BACK_TARGET);
  }, []);

  const clearWineDetailsBackTarget = useCallback(() => {
    setBackTarget(null);
  }, []);

  useEffect(() => {
    const previousUserId = previousUserIdRef.current;

    const currentUserId = user?.id ?? null;

    if (
      previousUserId !== null &&
      currentUserId !== null &&
      previousUserId !== currentUserId
    ) {
      clearQuizResult();
      setBackTarget(null);
    }

    if (previousUserId !== null && !isAuthenticated) {
      clearQuizResult();
      setBackTarget(null);
    }

    previousUserIdRef.current = currentUserId;
  }, [user?.id, isAuthenticated, clearQuizResult]);

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
