import type { Wine } from "@/types/wine";

const QUIZ_RESULT_STORAGE_KEY = "quizResult";

export const getSavedQuizResult = (): Wine[] | null => {
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

export const saveQuizResult = (wines: Wine[]) => {
  sessionStorage.setItem(QUIZ_RESULT_STORAGE_KEY, JSON.stringify(wines));
};

export const clearQuizResult = () => {
  sessionStorage.removeItem(QUIZ_RESULT_STORAGE_KEY);
};