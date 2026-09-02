import { httpClient } from "@/shared/api/httpClient";

import type { Wine } from "@/types/wine";

export const getWineById = (id: number): Promise<Wine> => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid wine id.");
  }

  return httpClient<Wine>(`/api/wines/${id}`);
};