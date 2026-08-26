import type { AnalyticsDeviceType } from "@/types/analytics";

const ANALYTICS_SESSION_ID_KEY = "analyticsSessionId";

export const getOrCreateAnalyticsSession = () => {
  const existingSessionId = sessionStorage.getItem(
    ANALYTICS_SESSION_ID_KEY,
  );

  if (existingSessionId) {
    return {
      sessionId: existingSessionId,
      isNew: false,
    };
  }

  const sessionId = crypto.randomUUID();

  sessionStorage.setItem(
    ANALYTICS_SESSION_ID_KEY,
    sessionId,
  );

  return {
    sessionId,
    isNew: true,
  };
};

export const getAnalyticsDeviceType = (): AnalyticsDeviceType => {
  const width = window.innerWidth;

  if (width < 768) {
    return "mobile";
  }

  if (width < 1024) {
    return "tablet";
  }

  return "desktop";
};