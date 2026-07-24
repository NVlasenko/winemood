import type { Wine } from "@/types/wine";

export type FavoritesResponse = {
  count: number;
  wines: Wine[];
};