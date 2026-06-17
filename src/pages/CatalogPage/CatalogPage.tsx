import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { CatalogContent } from "@/components/catalog/CatalogContent";
import {
  CatalogControls,
  type CatalogSortOption,
} from "@/components/catalog/CatalogControls";

import { SectionTitle } from "@/components/ui/SectionTitle";

import { useFavorites } from "@/context/FavoritesContext";
import { useCatalogSort, useCatalogWines } from "@/hooks/catalog";
import { CatalogFilters } from "@/components/catalog-filters";

import "./CatalogPage.scss";
import { CatalogSearch } from "@/components/catalog/CatalogSearch";


export const CatalogPage = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const { favorites, toggleFavorite } = useFavorites();

  const [searchParams, setSearchParams] = useSearchParams();

  const isSearchOpen = searchParams.get("searchOpen") === "true";
  const wineTypesParam = searchParams.get("wineTypes") || "";
  const countriesParam = searchParams.get("countries") || "";

  const wineTypesFromUrl = useMemo(
    () => (wineTypesParam ? wineTypesParam.split(",") : []),
    [wineTypesParam],
  );

  const countriesFromUrl = useMemo(
    () => (countriesParam ? countriesParam.split(",") : []),
    [countriesParam],
  );

  const {
    wines,
    isInitialLoading,
    isCurating,
    error,
    startCuratingAnimation,
  } = useCatalogWines({
    wineTypes: wineTypesFromUrl,
    countries: countriesFromUrl,
  });

  const { activeSort, sortedWines, setActiveSort } = useCatalogSort(wines);

  const favoriteIds = useMemo(() => new Set(favorites), [favorites]);

  const handleOpenFilters = useCallback(() => {
    setIsFiltersOpen(true);
  }, []);

  const handleCloseFilters = useCallback(() => {
    setIsFiltersOpen(false);
  }, []);

  const handleSortSelect = useCallback(
    (option: CatalogSortOption) => {
      startCuratingAnimation();
      setActiveSort(option);
    },
    [startCuratingAnimation, setActiveSort],
  );

  const handleCloseSearch = useCallback(() => {
    const nextParams = new URLSearchParams(searchParams);
  
    nextParams.delete("searchOpen");
  
    setSearchParams(nextParams);
  }, [searchParams, setSearchParams]);

  return (
    <main className="catalog-page">
      <div className="container">
        <SectionTitle title="Catalog" />

        <CatalogControls
          activeSort={activeSort}
          onSortSelect={handleSortSelect}
          onOpenFilters={handleOpenFilters}
        />

        <CatalogSearch
          isOpen={isSearchOpen}
          isSearching={false}
          hasNoResults={false}
          onClose={handleCloseSearch}
        />

        <CatalogContent
          wines={sortedWines}
          favoriteIds={favoriteIds}
          isInitialLoading={isInitialLoading}
          isCurating={isCurating}
          error={error}
          onOpenFilters={handleOpenFilters}
          onToggleFavorite={toggleFavorite}
        />
      </div>

      <CatalogFilters isOpen={isFiltersOpen} onClose={handleCloseFilters} />
    </main>
  );
};