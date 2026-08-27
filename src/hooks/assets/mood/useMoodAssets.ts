import { getMoodAssets } from "@/shared/api/assets/assetsMoodApi";
import { useQuery } from "@tanstack/react-query";

export const useMoodAssets = () => {
  return useQuery({
    queryKey: ["mood-assets"],
    queryFn: getMoodAssets,
    staleTime: Infinity,
  });
};