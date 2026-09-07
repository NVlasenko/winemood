import { sendAnalyticsEvent } from "@/shared/api/analyticsApi";

import type { AnalyticsDeviceType } from "@/types/analytics";

const createAnalyticsEventId = () =>
  crypto.randomUUID();

export const analytics = {
  searchStarted: (
    query: string,
    searchType: "catalog" = "catalog",
  ) => {
    return sendAnalyticsEvent({
      eventId: createAnalyticsEventId(),
      eventType: "SEARCH_STARTED",
      eventData: {
        search_type: searchType,
        query,
      },
    });
  },

  pageViewed: (
    pageUrl: string,
    eventId: string,
  ) => {
    return sendAnalyticsEvent({
      eventId,
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
      eventId: createAnalyticsEventId(),
      eventType: "SESSION_STARTED",
      eventData: {
        session_id: sessionId,
        device_type: deviceType,
      },
    });
  },
};