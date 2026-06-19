import { httpClient } from "@/shared/api/httpClient";

import type { WineCatalogCard } from "@/types/wineCatalogCard";

export const getSimilarWines = (wineId: number) => {
  return httpClient<WineCatalogCard[]>(`/api/wines/${wineId}/recommendations`);
};