import { httpClient } from "@/shared/api/httpClient";

import type { SiteAssets } from "@/types/siteAssets";

export const getSiteAssets =
  async (): Promise<SiteAssets> => {
    return httpClient<SiteAssets>(
      "/api/assets/site",
    );
  };