import { httpClient } from "@/shared/api/httpClient";

import type { AnalyticsEvent } from "@/types/analytics";

export const sendAnalyticsEvent = async (
  event: AnalyticsEvent
): Promise<void> => {
  await httpClient<void>("/api/analytics/events", {
    method: "POST",
    body: event,
  });
};