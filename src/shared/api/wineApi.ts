import { httpClient } from "@/shared/api/httpClient";

import type { Wine } from "@/types/wine";
import type { WineCatalogCard } from "@/types/wineCatalogCard";

export const getWines = (): Promise<WineCatalogCard[]> => {
  return httpClient<WineCatalogCard[]>("/api/wines");
};

export const getWineById = (id: number): Promise<Wine> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid wine id.");
  }

  return httpClient<Wine>(`/api/wines/${id}`);
};

