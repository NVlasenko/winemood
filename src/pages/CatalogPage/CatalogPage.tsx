import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useNavigation,
  useSearchParams,
} from "react-router";

import { useQueryClient } from "@tanstack/react-query";

import { CatalogContent } from "@/components/catalog/CatalogContent";
import {
  CatalogControls,
  type CatalogSortOption,
} from "@/components/catalog/CatalogControls";
import { CatalogPagination } from "@/components/catalog/CatalogPagination";
import { CatalogSearch } from "@/components/catalog/CatalogSearch";

import { CatalogFilters } from "@/components/catalog-filters";
import { SectionTitle } from "@/components/ui/SectionTitle";

import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";

import { filterWines } from "@/shared/api/wineFilterApi";
import { CATALOG_PAGE_SIZE } from "@/shared/config/catalog";
import { buildWineFilters } from "@/shared/lib/buildWineFilters";
import { refetchAchievementsSafe } from "@/shared/lib/refetchAchievementsSafe";

import type { WineCatalogCard as WineCatalogCardType } from "@/types/wineCatalogCard";

import "./CatalogPage.scss";

const CATALOG_TOP_ID = "catalog-top";
const HEADER_OFFSET = 90;

const CHEESE_FOOD_NAMES = new Set([
  "SOFT_CHEESE",
  "HARD_CHEESE",
  "BLUE_CHEESE",
]);

const getArrayParam = (
  searchParams: URLSearchParams,
  key: string,
): string[] => {
  const value = searchParams.get(key);

  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const getSort = (
  searchParams: URLSearchParams,
): string[] => {
  switch (searchParams.get("sort")) {
    case "TOP_RATED":
      return ["rating,desc"];

    case "ALPHABETICAL":
      return ["name,asc"];

    case "POPULARITY":
      return ["viewCount,desc"];

    default:
      return [];
  }
};

const scrollToCatalogTop = () => {
  const catalogElement =
    document.getElementById(
      CATALOG_TOP_ID,
    );

  if (!catalogElement) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return;
  }

  const elementPosition =
    catalogElement.getBoundingClientRect().top;

  const offsetPosition =
    elementPosition +
    window.scrollY -
    HEADER_OFFSET;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

type CatalogPageProps = {
  wines: WineCatalogCardType[];
  currentPage: number;
  totalPages: number;
};

export const CatalogPage = ({
  wines,
  currentPage,
  totalPages,
}: CatalogPageProps) => {
  const navigation =
    useNavigation();

  const queryClient =
    useQueryClient();

  const {
    user,
    refreshUser,
  } = useAuth();

  const [
    isFiltersOpen,
    setIsFiltersOpen,
  ] = useState(false);

  const {
    favoriteIds,
    toggleFavorite,
  } = useFavorites();

  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const trackedFilterRequestRef =
    useRef<string | null>(null);

  const searchQuery =
    searchParams.get("search") ?? "";

  const isSearchOpen =
    searchParams.get("searchOpen") ===
    "true";

  const sortParam =
    searchParams.get("sort");

  const wineTypes =
    getArrayParam(
      searchParams,
      "wineTypes",
    );

  const countries =
    getArrayParam(
      searchParams,
      "countries",
    );

  const sweetnessLevels =
    getArrayParam(
      searchParams,
      "sweetnessLevels",
    );

  const grapeVarieties =
    getArrayParam(
      searchParams,
      "grapeVarieties",
    );

  const wineStyles =
    getArrayParam(
      searchParams,
      "wineStyles",
    );

  const acidityLevels =
    getArrayParam(
      searchParams,
      "acidityLevels",
    );

  const aromaNotes =
    getArrayParam(
      searchParams,
      "aromaNotes",
    );

  const moods =
    getArrayParam(
      searchParams,
      "moods",
    );

  const events =
    getArrayParam(
      searchParams,
      "events",
    );

  const seasons =
    getArrayParam(
      searchParams,
      "seasons",
    );

  const foodName =
    getArrayParam(
      searchParams,
      "foodName",
    );

  const sort =
    getSort(searchParams);

  const activeSort:
    | CatalogSortOption
    | null =
    sortParam === "TOP_RATED"
      ? "Top Rated"
      : sortParam ===
          "ALPHABETICAL"
        ? "Alphabetical"
        : sortParam ===
            "POPULARITY"
          ? "Popularity"
          : null;

  const isCatalogNavigation =
    navigation.location?.pathname ===
    "/catalog";

  const isCurating =
    navigation.state === "loading" &&
    isCatalogNavigation;

  const favoriteIdsSet =
    useMemo(
      () => new Set(favoriteIds),
      [favoriteIds],
    );

  useEffect(() => {
    if (!user) {
      return;
    }

    if (navigation.state !== "idle") {
      return;
    }

    const normalizedSearchQuery =
      searchQuery.trim();

    if (normalizedSearchQuery) {
      return;
    }

    const hasAchievementFilters =
      events.length > 0 ||
      foodName.length > 0;

    if (!hasAchievementFilters) {
      trackedFilterRequestRef.current =
        null;

      return;
    }

    const filters =
      buildWineFilters({
        searchQuery,
        wineTypes,
        countries,
        sweetnessLevels,
        grapeVarieties,
        wineStyles,
        acidityLevels,
        aromaNotes,
        moods,
        events,
        seasons,
        foodName,
      });

    const requestKey =
      JSON.stringify({
        filters,
        sort,
      });

    if (
      trackedFilterRequestRef.current ===
      requestKey
    ) {
      return;
    }

    trackedFilterRequestRef.current =
      requestKey;

    const trackFilterAchievements =
      async () => {
        try {
          await filterWines({
            filters,
            page: 0,
            size: CATALOG_PAGE_SIZE,
            sort,
          });

          const selectedCheeses =
            foodName.filter(
              (item) =>
                CHEESE_FOOD_NAMES.has(
                  item,
                ),
            );

          if (
            selectedCheeses.length > 0
          ) {
            await filterWines({
              filters: {
                ...filters,
                foodName:
                  selectedCheeses,
              },
              page: 0,
              size: CATALOG_PAGE_SIZE,
              sort,
            });
          }
          
          await refetchAchievementsSafe(
            queryClient,
            user.id,
          );

          await refreshUser();
        } catch (error) {
          console.error(
            "Failed to track catalog filter achievements",
            error,
          );

          trackedFilterRequestRef.current =
            null;
        }
      };

    void trackFilterAchievements();
  }, [
    navigation.state,
    searchQuery,
    wineTypes,
    countries,
    sweetnessLevels,
    grapeVarieties,
    wineStyles,
    acidityLevels,
    aromaNotes,
    moods,
    events,
    seasons,
    foodName,
    sort,
    user?.id,
    queryClient,
    refreshUser,
  ]);

  const handleOpenFilters =
    useCallback(() => {
      setIsFiltersOpen(true);
    }, []);

  const handleCloseFilters =
    useCallback(() => {
      setIsFiltersOpen(false);
    }, []);

  const handleSortSelect =
    useCallback(
      (
        option: CatalogSortOption,
      ) => {
        const nextParams =
          new URLSearchParams(
            searchParams,
          );

        nextParams.delete("page");

        if (
          option === "Top Rated"
        ) {
          nextParams.set(
            "sort",
            "TOP_RATED",
          );
        }

        if (
          option === "Alphabetical"
        ) {
          nextParams.set(
            "sort",
            "ALPHABETICAL",
          );
        }

        if (
          option === "Popularity"
        ) {
          nextParams.set(
            "sort",
            "POPULARITY",
          );
        }

        setSearchParams(
          nextParams,
        );
      },
      [
        searchParams,
        setSearchParams,
      ],
    );

  const handleCloseSearch =
    useCallback(() => {
      const nextParams =
        new URLSearchParams(
          searchParams,
        );

      nextParams.delete(
        "searchOpen",
      );

      setSearchParams(
        nextParams,
      );
    }, [
      searchParams,
      setSearchParams,
    ]);

  const handlePageChange =
    useCallback(
      (page: number) => {
        const nextParams =
          new URLSearchParams(
            searchParams,
          );

        if (page <= 0) {
          nextParams.delete(
            "page",
          );
        } else {
          nextParams.set(
            "page",
            String(page + 1),
          );
        }

        setSearchParams(
          nextParams,
        );

        requestAnimationFrame(
          () => {
            scrollToCatalogTop();
          },
        );
      },
      [
        searchParams,
        setSearchParams,
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
          onSortSelect={
            handleSortSelect
          }
          onOpenFilters={
            handleOpenFilters
          }
        />

        <CatalogSearch
          isOpen={isSearchOpen}
          hasNoResults={
            Boolean(
              searchQuery.trim(),
            ) &&
            !isCurating &&
            wines.length === 0
          }
          onClose={
            handleCloseSearch
          }
        />

        <CatalogContent
          wines={wines}
          favoriteIds={
            favoriteIdsSet
          }
          isInitialLoading={
            false
          }
          isCurating={
            isCurating
          }
          error=""
          onOpenFilters={
            handleOpenFilters
          }
          onToggleFavorite={
            toggleFavorite
          }
        />

        <CatalogPagination
          currentPage={
            currentPage
          }
          totalPages={
            totalPages
          }
          onPageChange={
            handlePageChange
          }
        />
      </div>

      <CatalogFilters
        isOpen={isFiltersOpen}
        onClose={
          handleCloseFilters
        }
      />
    </main>
  );
};