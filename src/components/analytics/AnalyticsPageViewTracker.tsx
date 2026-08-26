import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { analytics } from "@/shared/lib/analytics";

const getAnalyticsPageUrl = (
  pathname: string,
  search: string,
) => {
  const searchParams = new URLSearchParams(search);

  searchParams.delete("searchOpen");
  searchParams.delete("search");

  const query = searchParams.toString();

  return query
    ? `${pathname}?${query}`
    : pathname;
};

export const AnalyticsPageViewTracker = () => {
  const location = useLocation();

  const lastTrackedPageRef = useRef<string | null>(null);

  useEffect(() => {
    const pageUrl = getAnalyticsPageUrl(
      location.pathname,
      location.search,
    );

    if (lastTrackedPageRef.current === pageUrl) {
      return;
    }

    lastTrackedPageRef.current = pageUrl;

    analytics
      .pageViewed(pageUrl)
      .catch((error) => {
        console.error(
          "Failed to send PAGE_VIEWED analytics event:",
          error,
        );
      });
  }, [
    location.pathname,
    location.search,
  ]);

  return null;
};