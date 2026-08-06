import { quizApi } from "@/shared/api/quizApi";
import type { QuizHistoryItem } from "@/types/quizProfile";
import { useQuery } from "@tanstack/react-query";

export const useQuizHistory = (enabled: boolean) => {
  return useQuery<QuizHistoryItem[]>({
    queryKey: ["quiz-history"],
    queryFn: quizApi.getHistory,
    enabled,

    staleTime: 0,
    refetchOnMount: true,
  });
};