import type { Wine } from "@/types/wine";
import { httpClient } from "./httpClient";

export const getWines = () => {
  return httpClient<Wine[]>("/api/wines");
};

export const getWineById = (id: number) => {
  return httpClient<Wine>(`/api/wines/${id}`);
};