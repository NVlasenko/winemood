import { useQuery } from "@tanstack/react-query";

import type { SiteAssets } from "@/types/siteAssets";
import { getSiteAssets } from "@/shared/api/assets/siteAssetsApi";

export const useSiteAssets = () => {
  return useQuery<SiteAssets>({
    queryKey: ["site-assets"],
    queryFn: getSiteAssets,

    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};