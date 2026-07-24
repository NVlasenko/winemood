import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/shared/api/userApi";

export const useQuizHistory = () => {
  return useQuery({
    queryKey: ["quiz-history"],
    queryFn: userApi.getQuizHistory,
  });
};