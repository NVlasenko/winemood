import type { QuizRequestDto } from "@/types/quiz";
import type { WineCatalogCard } from "@/types/wineCatalogCard";
import type { QuizHistoryItem } from "@/types/quizProfile";

import { httpClient } from "./httpClient";

type AuthOptions = {
  authToken?: string | null;
};

export const quizApi = {
  getHistory: ({
    authToken,
  }: AuthOptions = {}) => {
    return httpClient<QuizHistoryItem[]>(
      "/api/users/quiz-history",
      {
        method: "GET",
        authToken,
      },
    );
  },

  getResult: (
    payload: QuizRequestDto,
  ) => {
    return httpClient<WineCatalogCard[]>(
      "/api/quiz/result",
      {
        method: "POST",
        body: JSON.stringify(
          payload,
        ),
      },
    );
  },
};