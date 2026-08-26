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
  const offsetPosition =
    elementPosition + window.scrollY - HEADER_OFFSET;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

export const CatalogPage = () => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const { favoriteIds, toggleFavorite } = useFavorites();

  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") ?? "";
  const isSearchOpen =
    searchParams.get("searchOpen") === "true";

  const pageParam = searchParams.get("page") ?? "1";
  const sortParam = searchParams.get("sort");

  const wineTypesParam =
    searchParams.get("wineTypes") ?? "";

  const countriesParam =
    searchParams.get("countries") ?? "";

  const sweetnessLevelsParam =
    searchParams.get("sweetnessLevels") ?? "";

  const grapeVarietiesParam =
    searchParams.get("grapeVarieties") ?? "";

  const wineStylesParam =
    searchParams.get("wineStyles") ?? "";

  const acidityLevelsParam =
    searchParams.get("acidityLevels") ?? "";

  const aromaNotesParam =
    searchParams.get("aromaNotes") ?? "";

  const moodsParam =
    searchParams.get("moods") ?? "";

  const eventsParam =
    searchParams.get("events") ?? "";

  const seasonsParam =
    searchParams.get("seasons") ?? "";

  const foodNameParam =
    searchParams.get("foodName") ?? "";

  const activeSort: CatalogSortOption | null =
    sortParam === "TOP_RATED"
      ? "Top Rated"
      : sortParam === "ALPHABETICAL"
        ? "Alphabetical"
        : sortParam === "POPULARITY"
          ? "Popularity"
          : null;

  const wineTypesFromUrl = useMemo(
    () =>
      wineTypesParam
        ? wineTypesParam.split(",")
        : [],
    [wineTypesParam],
  );

  const countriesFromUrl = useMemo(
    () =>
      countriesParam
        ? countriesParam.split(",")
        : [],
    [countriesParam],
  );

  const sweetnessLevelsFromUrl = useMemo(
    () =>
      sweetnessLevelsParam
        ? sweetnessLevelsParam.split(",")
        : [],
    [sweetnessLevelsParam],
  );

  const grapeVarietiesFromUrl = useMemo(
    () =>
      grapeVarietiesParam
        ? grapeVarietiesParam.split(",")
        : [],
    [grapeVarietiesParam],
  );

  const wineStylesFromUrl = useMemo(
    () =>
      wineStylesParam
        ? wineStylesParam.split(",")
        : [],
    [wineStylesParam],
  );

  const acidityLevelsFromUrl = useMemo(
    () =>
      acidityLevelsParam
        ? acidityLevelsParam.split(",")
        : [],
    [acidityLevelsParam],
  );

  const aromaNotesFromUrl = useMemo(
    () =>
      aromaNotesParam
        ? aromaNotesParam.split(",")
        : [],
    [aromaNotesParam],
  );

  const moodsFromUrl = useMemo(
    () =>
      moodsParam
        ? moodsParam.split(",")
        : [],
    [moodsParam],
  );

  const eventsFromUrl = useMemo(
    () =>
      eventsParam
        ? eventsParam.split(",")
        : [],
    [eventsParam],
  );

  const seasonsFromUrl = useMemo(
    () =>
      seasonsParam
        ? seasonsParam.split(",")
        : [],
    [seasonsParam],
  );

  const foodNameFromUrl = useMemo(
    () =>
      foodNameParam
        ? foodNameParam.split(",")
        : [],
    [foodNameParam],
  );

  const pageFromUrl = useMemo(() => {
    const parsedPage = Number(pageParam);

    if (
      !Number.isInteger(parsedPage) ||
      parsedPage < 1
    ) {
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
        return ["viewCount,desc"];

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
  }, [
    pageFromUrl,
    setCurrentPage,
  ]);

  const favoriteIdsSet = useMemo(
    () => new Set(favoriteIds),
    [favoriteIds],
  );

  const handleOpenFilters = useCallback(() => {
    setIsFiltersOpen(true);
  }, []);

  const handleCloseFilters = useCallback(() => {
    setIsFiltersOpen(false);
  }, []);

  const handleSortSelect = useCallback(
    (option: CatalogSortOption) => {
      const nextParams =
        new URLSearchParams(searchParams);

      nextParams.delete("page");

      if (option === "Top Rated") {
        nextParams.set(
          "sort",
          "TOP_RATED",
        );
      }

      if (option === "Alphabetical") {
        nextParams.set(
          "sort",
          "ALPHABETICAL",
        );
      }

      if (option === "Popularity") {
        nextParams.set(
          "sort",
          "POPULARITY",
        );
      }

      setSearchParams(nextParams);
      setCurrentPage(0);
    },
    [
      searchParams,
      setSearchParams,
      setCurrentPage,
    ],
  );

  const handleCloseSearch = useCallback(() => {
    const nextParams =
      new URLSearchParams(searchParams);

    nextParams.delete("searchOpen");

    setSearchParams(nextParams);
  }, [
    searchParams,
    setSearchParams,
  ]);

  const handlePageChange = useCallback(
    (page: number) => {
      const nextParams =
        new URLSearchParams(searchParams);

      if (page <= 0) {
        nextParams.delete("page");
      } else {
        nextParams.set(
          "page",
          String(page + 1),
        );
      }

      setSearchParams(nextParams);
      setCurrentPage(page);

      requestAnimationFrame(() => {
        scrollToCatalogTop();
      });
    },
    [
      searchParams,
      setSearchParams,
      setCurrentPage,
    ],
  );

  return (
    <main
      className="catalog-page"
      id={CATALOG_TOP_ID}
    >
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
            Boolean(searchQuery.trim()) &&
            !isInitialLoading &&
            wines.length === 0
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

      <CatalogFilters
        isOpen={isFiltersOpen}
        onClose={handleCloseFilters}
      />
    </main>
  );
};