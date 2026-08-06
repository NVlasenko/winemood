import { httpClient } from "@/shared/api/httpClient";

import type { PageDto } from "@/types/pagination";
import type { WineCatalogCard } from "@/types/wineCatalogCard";

type SearchWinesParams = {
  query: string;
  page: number;
  size: number;
  signal?: AbortSignal;
};

export const searchWines = async ({
  query,
  page,
  size,
  signal,
}: SearchWinesParams): Promise<PageDto<WineCatalogCard>> => {
  if (!query.trim()) {
    return {
      data: [],
      meta: {
        totalElements: 0,
        totalPages: 0,
        currentPage: page,
        size,
      },
    };
  }

  const searchParams = new URLSearchParams({
    query: query.trim(),
    page: String(page),
    size: String(size),
  });

  return httpClient<PageDto<WineCatalogCard>>(
    `/api/wines/search?${searchParams.toString()}`,
    { signal }
  );
};