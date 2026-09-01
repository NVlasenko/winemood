import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@/context/AuthContext";

import { quizApi } from "@/shared/api/quizApi";

import type { QuizHistoryItem } from "@/types/quizProfile";

export const useQuizHistory = (
  enabled: boolean,
  initialData?: QuizHistoryItem[],
) => {
  const { user } = useAuth();

  return useQuery<QuizHistoryItem[]>({
    queryKey: [
      "quiz-history",
      user?.id,
    ],

    queryFn: () =>
      quizApi.getHistory(),

    enabled:
      enabled &&
      !!user,

    initialData,

    staleTime: 0,
    refetchOnMount: true,
  });
};