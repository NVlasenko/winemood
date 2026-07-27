import { useQuery } from "@tanstack/react-query";
import { reviewApi } from "@/shared/api/reviewApi";

export const useWineReviews = (wineId: number) => {
  return useQuery({
    queryKey: ["wine-reviews", wineId],
    queryFn: () => reviewApi.getWineReviews(wineId),
    enabled: !!wineId,
  });
};