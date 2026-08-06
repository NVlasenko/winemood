import { httpClient } from "@/shared/api/httpClient";

import type { PageDto } from "@/types/pagination";
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
  signal?: AbortSignal;
};

const cleanFilters = (filters: WineFilterRequest): WineFilterRequest => {
  return Object.fromEntries(
    Object.entries(filters).filter(
      ([_, value]) => Array.isArray(value) && value.length > 0
    )
  );
};

export const filterWines = ({
  filters,
  page,
  size,
  signal,
}: FilterWinesParams): Promise<PageDto<WineCatalogCard>> => {
  const searchParams = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  return httpClient<PageDto<WineCatalogCard>>(
    `/api/wines/filter?${searchParams.toString()}`,
    {
      method: "POST",
      body: cleanFilters(filters) as unknown as BodyInit,
      signal,
    }
  );
};