import { useQuery } from "@tanstack/react-query";

import { achievementApi } from "@/shared/api/achievementApi";

import type { Achievement } from "@/types/achievement";

import { useAuth } from "@/context/AuthContext";

export const useAchievements = (
  enabled: boolean,
  initialData?: Achievement[],
) => {
  const {
    user,
    isAuthenticated,
  } = useAuth();

  const hasInitialData =
    initialData !== undefined;

  return useQuery<Achievement[]>({
    queryKey: [
      "achievements",
      user?.id,
    ],

    queryFn: () =>
      achievementApi.getAchievements(),

    enabled:
      enabled &&
      isAuthenticated &&
      !!user,

    initialData,

    refetchOnWindowFocus: false,

    staleTime: 0,

    gcTime: 0,

    refetchOnMount:
      !hasInitialData,
  });
};