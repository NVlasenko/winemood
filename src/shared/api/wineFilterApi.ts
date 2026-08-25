import { httpClient } from "@/shared/api/httpClient";
import type { FilterWinesParams, WineFilterRequest } from "@/types/filters";

import type { PageDto } from "@/types/pagination";
import type { WineCatalogCard } from "@/types/wineCatalogCard";


const cleanFilters = (
  filters: WineFilterRequest
): WineFilterRequest => {
  return Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => {
      if (typeof value === "string") {
        return value.trim().length > 0;
      }

      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return false;
    })
  );
};

export const filterWines = ({
  filters,
  page,
  size,
  sort = [],
  signal,
}: FilterWinesParams): Promise<PageDto<WineCatalogCard>> => {
  const searchParams = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  sort.forEach((sortItem) => {
    searchParams.append("sort", sortItem);
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