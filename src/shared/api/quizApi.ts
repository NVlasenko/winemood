import type { QuizRequestDto } from "@/types/quiz";
import { httpClient } from "./httpClient";
import type { WineCatalogCard } from "@/types/wineCatalogCard";
import type { QuizHistoryItem } from "@/types/quizProfile";


export const quizApi = {

  getHistory: () => {
    return httpClient<QuizHistoryItem[]>("/api/users/quiz-history", {
      method: "GET",
    });
  },

  getResult: (payload: QuizRequestDto) => {
    return httpClient<WineCatalogCard[]>("/api/quiz/result", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
