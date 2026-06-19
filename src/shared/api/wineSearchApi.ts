import { httpClient } from "@/shared/api/httpClient";

import type { PageResponse } from "@/types/pagination";
import type { WineCatalogCard } from "@/types/wineCatalogCard";

type SearchWinesParams = {
  query: string;
  page: number;
  size: number;
};

export const searchWines = ({
  query,
  page,
  size,
}: SearchWinesParams): Promise<PageResponse<WineCatalogCard>> => {
  const searchParams = new URLSearchParams({
    query,
    page: String(page),
    size: String(size),
  });

  return httpClient<PageResponse<WineCatalogCard>>(
    `/api/wines/search?${searchParams.toString()}`,
  );
};