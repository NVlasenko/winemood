import { httpClient } from "@/shared/api/httpClient";

import type { WineCatalogCard } from "@/types/wineCatalogCard";

export type WineFilterRequest = {
  wineTypes?: string[];
  sweetnessLevels?: string[];
  countries?: string[];
  grapeVarieties?: string[];
  wineStyles?: string[];
  acidityLevels?: string[];
  aromaNotes?: string[];
  moods?: string[];
  foodTypes?: string[];
};

export const filterWines = (
  filters: WineFilterRequest,
): Promise<WineCatalogCard[]> => {
  return httpClient<WineCatalogCard[]>("/api/wines/filter", {
    method: "POST",
    body: JSON.stringify(filters),
  });
};