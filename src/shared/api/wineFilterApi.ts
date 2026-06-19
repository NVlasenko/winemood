import { httpClient } from "@/shared/api/httpClient";

import type { PageResponse } from "@/types/pagination";
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
  events?: string[];
  seasons?: string[];
  foodName?: string[];
};

type FilterWinesParams = {
  filters: WineFilterRequest;
  page: number;
  size: number;
};

export const filterWines = ({
  filters,
  page,
  size,
}: FilterWinesParams): Promise<PageResponse<WineCatalogCard>> => {
  const searchParams = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  return httpClient<PageResponse<WineCatalogCard>>(
    `/api/wines/filter?${searchParams.toString()}`,
    {
      method: "POST",
      body: JSON.stringify(filters),
    },
  );
};