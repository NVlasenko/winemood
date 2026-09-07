export type AnalyticsDeviceType = "mobile" | "tablet" | "desktop";

export type AnalyticsEvent =
  | {
      eventId: string;
      eventType: "SEARCH_STARTED";
      eventData: {
        search_type: "catalog";
        query: string;
      };
    }
  | {
      eventId: string;
      eventType: "PAGE_VIEWED";
      eventData: {
        page_url: string;
      };
    }
  | {
      eventId: string;
      eventType: "SESSION_STARTED";
      eventData: {
        session_id: string;
        device_type: AnalyticsDeviceType;
      };
    };
