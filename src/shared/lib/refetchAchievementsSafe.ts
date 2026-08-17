import type { QueryClient } from "@tanstack/react-query";

export const refetchAchievementsSafe = async (
  queryClient: QueryClient,
  userId: number | string | undefined
) => {
  if (userId === undefined || userId === null) return;

  await queryClient.refetchQueries({
    queryKey: ["achievements", userId],
  });

  await new Promise<void>((resolve) => {
    setTimeout(resolve, 300);
  });

  await queryClient.refetchQueries({
    queryKey: ["achievements", userId],
  });
};