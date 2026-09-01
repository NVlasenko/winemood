import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/context/AuthContext";

import { filterWines } from "@/shared/api/wineFilterApi";
import { CATALOG_PAGE_SIZE } from "@/shared/config/catalog";
import { buildWineFilters } from "@/shared/lib/buildWineFilters";
import { refetchAchievementsSafe } from "@/shared/lib/refetchAchievementsSafe";

import type { UseCatalogWinesParams } from "@/types/catalogWinesParams";
import type { WineCatalogCard as WineCatalogCardType } from "@/types/wineCatalogCard";

type InitialCatalogData = {
  wines: WineCatalogCardType[];
  currentPage: number;
  totalPages: number;
};

export const useCatalogWines = (
  {
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
  }: UseCatalogWinesParams,
  initialData?: InitialCatalogData,
) => {
  const { user, refreshUser } = useAuth();
  const queryClient = useQueryClient();

  const [wines, setWines] = useState<WineCatalogCardType[]>(
    initialData?.wines ?? [],
  );

  const [currentPage, setCurrentPage] = useState(
    initialData?.currentPage ?? 0,
  );

  const [totalPages, setTotalPages] = useState(
    initialData?.totalPages ?? 0,
  );

  const [isInitialLoading, setIsInitialLoading] = useState(
    !initialData,
  );

  const [isCurating, setIsCurating] = useState(false);
  const [error, setError] = useState("");

  const hasLoadedRef = useRef(Boolean(initialData));

  const shouldSkipInitialFetchRef = useRef(
    Boolean(initialData),
  );

  const curatingTimeoutRef = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

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
    if (shouldSkipInitialFetchRef.current) {
      shouldSkipInitialFetchRef.current = false;
      return;
    }

    let isMounted = true;

    const loadWines = async () => {
      try {
        if (hasLoadedRef.current) {
          startCuratingAnimation();
        }

        setError("");

        const response = await filterWines({
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

        if (
          user &&
          !normalizedSearchQuery &&
          events.length > 0
        ) {
          await refetchAchievementsSafe(
            queryClient,
            user.id,
          );

          await refreshUser();
        }

        if (
          user &&
          !normalizedSearchQuery &&
          foodName.length > 0
        ) {
          await refetchAchievementsSafe(
            queryClient,
            user.id,
          );

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

        console.error(
          "Failed to load wines",
          error,
        );

        if (error instanceof TypeError) {
          setError(
            "Network error. Please check your internet connection.",
          );

          return;
        }

        setError(
          "Something went wrong. Please try again later.",
        );
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
    isSearching:
      Boolean(normalizedSearchQuery) &&
      isCurating,
    error,
    setCurrentPage,
    startCuratingAnimation,
  };
};