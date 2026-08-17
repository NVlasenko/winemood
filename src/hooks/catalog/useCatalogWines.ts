import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  filterWines,
  type WineFilterRequest,
} from "@/shared/api/wineFilterApi";
import { searchWines } from "@/shared/api/wineSearchApi";

import { useAuth } from "@/context/AuthContext";
import { refetchAchievementsSafe } from "@/shared/lib/refetchAchievementsSafe";

import type { WineCatalogCard as WineCatalogCardType } from "@/types/wineCatalogCard";
import type { UseCatalogWinesParams } from "@/types/catalogWinesParams";

const CATALOG_PAGE_SIZE = 8;

const buildWineFilters = ({
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
}: UseCatalogWinesParams): WineFilterRequest => {
  const filters: WineFilterRequest = {};

  if (wineTypes.length > 0) {
    filters.wineTypes = wineTypes;
  }

  if (countries.length > 0) {
    filters.countries = countries;
  }

  if (sweetnessLevels.length > 0) {
    filters.sweetnessLevels = sweetnessLevels;
  }

  if (grapeVarieties.length > 0) {
    filters.grapeVarieties = grapeVarieties;
  }

  if (wineStyles.length > 0) {
    filters.wineStyles = wineStyles;
  }

  if (acidityLevels.length > 0) {
    filters.acidityLevels = acidityLevels;
  }

  if (aromaNotes.length > 0) {
    filters.aromaNotes = aromaNotes;
  }

  if (moods.length > 0) {
    filters.moods = moods;
  }

  if (events.length > 0) {
    filters.events = events;
  }

  if (seasons.length > 0) {
    filters.seasons = seasons;
  }

  if (foodName.length > 0) {
    filters.foodName = foodName;
  }

  return filters;
};

export const useCatalogWines = ({
  searchQuery,
  sort = [],
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
}: UseCatalogWinesParams) => {
  const { user, refreshUser } = useAuth();
  const queryClient = useQueryClient();

  const [wines, setWines] = useState<WineCatalogCardType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isCurating, setIsCurating] = useState(false);
  const [error, setError] = useState("");

  const hasLoadedRef = useRef(false);
  const curatingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const normalizedSearchQuery = searchQuery.trim();

  const startCuratingAnimation = useCallback(() => {
    setIsCurating(true);

    if (curatingTimeoutRef.current) {
      clearTimeout(curatingTimeoutRef.current);
    }

    curatingTimeoutRef.current = setTimeout(() => {
      setIsCurating(false);
    }, 850);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const loadWines = async () => {
      try {
        if (hasLoadedRef.current) {
          startCuratingAnimation();
        }

        setError("");

        const response = normalizedSearchQuery
          ? await searchWines({
              query: normalizedSearchQuery,
              page: currentPage,
              size: CATALOG_PAGE_SIZE,
            })
          : await filterWines({
              filters: buildWineFilters({
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
              }),
              page: currentPage,
              size: CATALOG_PAGE_SIZE,
              sort,
            });

        if (user && !normalizedSearchQuery && events.length > 0) {
          await refetchAchievementsSafe(queryClient, user.id);
          await refreshUser();
        }

        if (user && !normalizedSearchQuery && foodName.length > 0) {
          await refetchAchievementsSafe(queryClient, user.id);
          await refreshUser();
        }

        if (!Array.isArray(response.data)) {
          throw new Error("Invalid wines data");
        }

        if (isMounted) {
          setWines(response.data);
          setTotalPages(response.meta.totalPages);
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error("Failed to load wines", error);

        if (error instanceof TypeError) {
          setError("Network error. Please check your internet connection.");
          return;
        }

        if (error instanceof Error) {
          setError(error.message);
          return;
        }

        setError("Something went wrong.");
      } finally {
        if (isMounted) {
          hasLoadedRef.current = true;
          setIsInitialLoading(false);
        }
      }
    };

    loadWines();

    return () => {
      isMounted = false;
    };
  }, [
    normalizedSearchQuery,
    searchQuery,
    sort,
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
    currentPage,
    startCuratingAnimation,
    user?.id,
    queryClient,
    refreshUser,
  ]);

  useEffect(() => {
    return () => {
      if (curatingTimeoutRef.current) {
        clearTimeout(curatingTimeoutRef.current);
      }
    };
  }, []);

  return {
    wines,
    currentPage,
    totalPages,
    isInitialLoading,
    isCurating,
    isSearching: Boolean(normalizedSearchQuery) && isCurating,
    error,
    setCurrentPage,
    startCuratingAnimation,
  };
};
