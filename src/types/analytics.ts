export type AnalyticsDeviceType =
  | "mobile"
  | "tablet"
  | "desktop";

export type AnalyticsEvent =
  | {
      eventType: "SEARCH_STARTED";
      eventData: {
        search_type: "catalog";
        query: string;
      };
    }
  | {
      eventType: "PAGE_VIEWED";
      eventData: {
        page_url: string;
      };
    }
  | {
      eventType: "SESSION_STARTED";
      eventData: {
        session_id: string;
        device_type: AnalyticsDeviceType;
      };
    };