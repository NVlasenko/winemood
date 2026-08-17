import { useQuery } from "@tanstack/react-query";
import { achievementApi } from "@/shared/api/achievementApi";
import type { Achievement } from "@/types/achievement";
import { useAuth } from "@/context/AuthContext";

export const useAchievements = (enabled: boolean) => {
  const { user } = useAuth();

  return useQuery<Achievement[]>({
    queryKey: ["achievements", user?.id], 
    queryFn: achievementApi.getAchievements,
    enabled: enabled && !!user,
    refetchOnWindowFocus: false,
    staleTime: 0,
    gcTime: 0,
  });
};