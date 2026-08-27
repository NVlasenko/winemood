import { useQuery } from "@tanstack/react-query";
import type { HistoryWomanImages } from "@/types/historyWomanImages";
import { getHistoryWomanImages } from "@/shared/api/assets/historyAssetsApi";

export const useHistoryWomanImages = () => {
  return useQuery<HistoryWomanImages>({
    queryKey: ["history-woman-images"],
    queryFn: getHistoryWomanImages,

    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};