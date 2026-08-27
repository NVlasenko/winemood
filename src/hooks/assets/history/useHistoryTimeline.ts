import { useQuery } from "@tanstack/react-query";
import { getHistoryTimeline } from "@/shared/api/assets/historyAssetsApi";
import type { HistoryTimelineItem } from "@/types/historyTimelineItem";

export const useHistoryTimeline = () => {
  return useQuery<HistoryTimelineItem[]>({
    queryKey: ["history-timeline"],
    queryFn: getHistoryTimeline,

    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};