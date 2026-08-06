import type { Wine } from "@/types/wine";

export type FavoritesResponseDto = {
  count: number;
  wines: Wine[];
};