import { useQuery } from "@tanstack/react-query";
import type { HistoryOrigin } from "@/types/historyOrigin";
import { getHistoryOrigins } from "@/shared/api/assets/historyAssetsApi";

export const useHistoryOrigins = () => {
  return useQuery<HistoryOrigin[]>({
    queryKey: ["history-origins"],
    queryFn: getHistoryOrigins,

    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};