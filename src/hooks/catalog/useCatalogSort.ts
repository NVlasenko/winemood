import { useMemo, useState } from "react";

import type { CatalogSortOption } from "@/components/catalog/CatalogControls";
import type { WineCatalogCard as WineCatalogCardType } from "@/types/wineCatalogCard";

export const useCatalogSort = (wines: WineCatalogCardType[]) => {
  const [activeSort, setActiveSort] = useState<CatalogSortOption>("Popularity");

  const sortedWines = useMemo(() => {
    switch (activeSort) {
      case "Top Rated":
        return [...wines].sort((a, b) => b.rating - a.rating);

      case "Alphabetical":
        return [...wines].sort((a, b) => a.name.localeCompare(b.name));

      case "Popularity":
      default:
        return wines;
    }
  }, [wines, activeSort]);

  return {
    activeSort,
    sortedWines,
    setActiveSort,
  };
};