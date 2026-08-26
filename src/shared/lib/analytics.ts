import { sendAnalyticsEvent } from "@/shared/api/analyticsApi";

import type { AnalyticsDeviceType } from "@/types/analytics";

export const analytics = {
  searchStarted: (
    query: string,
    searchType: "catalog" = "catalog",
  ) => {
    return sendAnalyticsEvent({
      eventType: "SEARCH_STARTED",
      eventData: {
        search_type: searchType,
        query,
      },
    });
  },

  pageViewed: (pageUrl: string) => {
    return sendAnalyticsEvent({
      eventType: "PAGE_VIEWED",
      eventData: {
        page_url: pageUrl,
      },
    });
  },

  sessionStarted: (
    sessionId: string,
    deviceType: AnalyticsDeviceType,
  ) => {
    return sendAnalyticsEvent({
      eventType: "SESSION_STARTED",
      eventData: {
        session_id: sessionId,
        device_type: deviceType,
      },
    });
  },
};