import { useEffect } from "react";

import { analytics } from "@/shared/lib/analytics";
import {
  getAnalyticsDeviceType,
  getOrCreateAnalyticsSession,
} from "@/shared/lib/analyticsSession";

export const AnalyticsSessionTracker = () => {
  useEffect(() => {
    const { sessionId, isNew } =
      getOrCreateAnalyticsSession();

    if (!isNew) {
      return;
    }

    analytics
      .sessionStarted(
        sessionId,
        getAnalyticsDeviceType(),
      )
      .catch((error) => {
        console.error(
          "Failed to send SESSION_STARTED analytics event:",
          error,
        );
      });
  }, []);

  return null;
};