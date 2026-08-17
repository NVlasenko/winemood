import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { CatalogContent } from "@/components/catalog/CatalogContent";
import {
  CatalogControls,
  type CatalogSortOption,
} from "@/components/catalog/CatalogControls";
import { CatalogPagination } from "@/components/catalog/CatalogPagination";
import { CatalogSearch } from "@/components/catalog/CatalogSearch";

import { CatalogFilters } from "@/components/catalog-filters";
import { SectionTitle } from "@/components/ui/SectionTitle";

import { useFavorites } from "@/context/FavoritesContext";
import { useCatalogWines } from "@/hooks/catalog";

import "./CatalogPage.scss";

const CATALOG_TOP_ID = "catalog-top";
const HEADER_OFFSET = 90;

const getArrayParam = (searchParams: URLSearchParams, key: string) => {
  const value = searchParams.get(key) || "";

  return value ? value.split(",") : [];
};

const scrollToCatalogTop = () => {
  const catalogElement = document.getElementById(CATALOG_TOP_ID);

  if (!catalogElement) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return;
  }

  const elementPosition = catalogElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.scrollY - HEADER_OFFSET;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

export const CatalogPage = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { favoriteIds, toggleFavorite } = useFavorites(); 
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const isSearchOpen = searchParams.get("searchOpen") === "true";
  const pageParam = searchParams.get("page") || "1";
  const sortParam = searchParams.get("sort");

const activeSort: CatalogSortOption | null =
  sortParam === "TOP_RATED"
    ? "Top Rated"
    : sortParam === "ALPHABETICAL"
      ? "Alphabetical"
         : sortParam === "POPULARITY"
      ? "Popularity"
      : null;


  const wineTypesFromUrl = useMemo(
    () => getArrayParam(searchParams, "wineTypes"),
    [searchParams],
  );

  const countriesFromUrl = useMemo(
    () => getArrayParam(searchParams, "countries"),
    [searchParams],
  );

  const sweetnessLevelsFromUrl = useMemo(
    () => getArrayParam(searchParams, "sweetnessLevels"),
    [searchParams],
  );

  const grapeVarietiesFromUrl = useMemo(
    () => getArrayParam(searchParams, "grapeVarieties"),
    [searchParams],
  );

  const wineStylesFromUrl = useMemo(
    () => getArrayParam(searchParams, "wineStyles"),
    [searchParams],
  );

  const acidityLevelsFromUrl = useMemo(
    () => getArrayParam(searchParams, "acidityLevels"),
    [searchParams],
  );

  const aromaNotesFromUrl = useMemo(
    () => getArrayParam(searchParams, "aromaNotes"),
    [searchParams],
  );

  const moodsFromUrl = useMemo(
    () => getArrayParam(searchParams, "moods"),
    [searchParams],
  );

  const eventsFromUrl = useMemo(
    () => getArrayParam(searchParams, "events"),
    [searchParams],
  );

  const seasonsFromUrl = useMemo(
    () => getArrayParam(searchParams, "seasons"),
    [searchParams],
  );

  const foodNameFromUrl = useMemo(
    () => getArrayParam(searchParams, "foodName"),
    [searchParams],
  );

  const pageFromUrl = useMemo(() => {
    const parsedPage = Number(pageParam);

    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
      return 0;
    }

    return parsedPage - 1;
  }, [pageParam]);

  const backendSort = useMemo<string[]>(() => {
    switch (activeSort) {
      case "Top Rated":
        return ["rating,desc"];
  
      case "Alphabetical":
        return ["name,asc"];
  
      case "Popularity":
      default:
        return [];
    }
  }, [activeSort]);

  const {
    wines,
    currentPage,
    totalPages,
    isInitialLoading,
    isCurating,
    error,
    setCurrentPage,
    startCuratingAnimation,
  } = useCatalogWines({
    searchQuery,
    sort: backendSort,
    wineTypes: wineTypesFromUrl,
    countries: countriesFromUrl,
    sweetnessLevels: sweetnessLevelsFromUrl,
    grapeVarieties: grapeVarietiesFromUrl,
    wineStyles: wineStylesFromUrl,
    acidityLevels: acidityLevelsFromUrl,
    aromaNotes: aromaNotesFromUrl,
    moods: moodsFromUrl,
    events: eventsFromUrl,
    seasons: seasonsFromUrl,
    foodName: foodNameFromUrl,
  });

  useEffect(() => {
    setCurrentPage(pageFromUrl);
  }, [pageFromUrl, setCurrentPage]);

  const favoriteIdsSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const handleOpenFilters = useCallback(() => {
    setIsFiltersOpen(true);
  }, []);

  const handleCloseFilters = useCallback(() => {
    setIsFiltersOpen(false);
  }, []);

  const handleSortSelect = useCallback(
    (option: CatalogSortOption) => {
      startCuratingAnimation();
  
      const nextParams = new URLSearchParams(searchParams);
  
      nextParams.delete("page");
  
      if (option === "Top Rated") {
        nextParams.set("sort", "TOP_RATED");
      }
  
      if (option === "Alphabetical") {
        nextParams.set("sort", "ALPHABETICAL");
      }
  
      if (option === "Popularity") {
        nextParams.set("sort", "POPULARITY");
      }
  
      setSearchParams(nextParams);
      setCurrentPage(0);
    },
    [
      startCuratingAnimation,
      searchParams,
      setSearchParams,
      setCurrentPage,
    ],
  );

  const handleCloseSearch = useCallback(() => {
    const nextParams = new URLSearchParams(searchParams);

    nextParams.delete("searchOpen");

    setSearchParams(nextParams);
  }, [searchParams, setSearchParams]);

  const handlePageChange = useCallback(
    (page: number) => {
      const nextParams = new URLSearchParams(searchParams);

      if (page <= 0) {
        nextParams.delete("page");
      } else {
        nextParams.set("page", String(page + 1));
      }

      setSearchParams(nextParams);
      setCurrentPage(page);

      requestAnimationFrame(() => {
        scrollToCatalogTop();
      });
    },
    [searchParams, setSearchParams, setCurrentPage],
  );

  return (
    <main className="catalog-page" id={CATALOG_TOP_ID}>
      <div className="container">
        <SectionTitle title="Catalog" />

        <CatalogControls
          activeSort={activeSort}
          onSortSelect={handleSortSelect}
          onOpenFilters={handleOpenFilters}
        />

        <CatalogSearch
          isOpen={isSearchOpen}
          hasNoResults={
            Boolean(searchQuery.trim()) && !isInitialLoading && wines.length === 0
          }
          onClose={handleCloseSearch}
        />

      <CatalogContent
         wines={wines}
        favoriteIds={favoriteIdsSet}
        isInitialLoading={isInitialLoading}
        isCurating={isCurating}
        error={error}
        onOpenFilters={handleOpenFilters}
        onToggleFavorite={toggleFavorite}
      />

        <CatalogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <CatalogFilters isOpen={isFiltersOpen} onClose={handleCloseFilters} />
    </main>
  );
};