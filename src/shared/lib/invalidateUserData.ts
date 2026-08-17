import { queryClient } from "@/shared/lib/reactQuery";

export const invalidateUserData = (userId?: number) => {
  queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
  queryClient.invalidateQueries({ queryKey: ["achievements", userId] });
  queryClient.invalidateQueries({ queryKey: ["quiz-history", userId] });
};