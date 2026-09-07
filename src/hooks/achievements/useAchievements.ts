import { useQuery } from "@tanstack/react-query";

import { achievementApi } from "@/shared/api/achievementApi";

import { useAuth } from "@/context/AuthContext";

import type { Achievement } from "@/types/achievement";

export const useAchievements = (
  enabled: boolean,
  initialData?: Achievement[]
) => {
  const { user, isAuthenticated } = useAuth();

  return useQuery<Achievement[]>({
    queryKey: ["achievements", user?.id],

    queryFn: () => achievementApi.getAchievements(),

    enabled: enabled && isAuthenticated && !!user,

    initialData,

    refetchOnWindowFocus: false,

    staleTime: 0,

    gcTime: 0,

    refetchOnMount: true,
  });
};
