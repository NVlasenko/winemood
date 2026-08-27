import { httpClient } from "@/shared/api/httpClient";

import type { HistoryWomanImages } from "@/types/historyWomanImages";
import type { HistoryOrigin } from "@/types/historyOrigin";
import type { HistoryTimelineItem } from "@/types/historyTimelineItem";

export const getHistoryWomanImages =
  (): Promise<HistoryWomanImages> => {
    return httpClient<HistoryWomanImages>(
      "/api/assets/history/woman",
    );
  };

export const getHistoryOrigins =
  (): Promise<HistoryOrigin[]> => {
    return httpClient<HistoryOrigin[]>(
      "/api/assets/history/origins",
    );
  };

export const getHistoryTimeline =
  (): Promise<HistoryTimelineItem[]> => {
    return httpClient<HistoryTimelineItem[]>(
      "/api/assets/history/timeline",
    );
  };