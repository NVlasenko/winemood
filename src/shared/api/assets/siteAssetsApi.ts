import { httpClient } from "@/shared/api/httpClient";

import type { SiteAssets } from "@/types/siteAssets";

export const getSiteAssets =
  async (): Promise<SiteAssets> => {
    return httpClient<SiteAssets>(
      "/api/assets/site",
    );
  };

export const checkBackendAvailability =
  async (): Promise<void> => {
    await httpClient<SiteAssets>(
      "/api/assets/site",
      {
        skipAuth: true,
      },
    );
  };