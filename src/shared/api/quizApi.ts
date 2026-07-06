import type { QuizRequestDto } from "@/types/quiz";
import type { Wine } from "@/types/wine";
import { httpClient } from "./httpClient";


export const quizApi = {
  getResult: (payload: QuizRequestDto) => {
    return httpClient<Wine[]>("/api/quiz/result", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};