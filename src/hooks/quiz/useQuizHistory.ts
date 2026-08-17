import { quizApi } from "@/shared/api/quizApi";
import type { QuizHistoryItem } from "@/types/quizProfile";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";

export const useQuizHistory = (enabled: boolean) => {
  const { user } = useAuth();

  return useQuery<QuizHistoryItem[]>({
    queryKey: ["quiz-history", user?.id],
    queryFn: quizApi.getHistory,
    enabled: enabled && !!user,

    staleTime: 0,
    refetchOnMount: true,
  });
};