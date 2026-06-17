import { useCallback, useEffect, useRef, useState } from "react";

import { filterWines } from "@/shared/api/wineFilterApi";
import { getWines } from "@/shared/api/wineApi";

import type { WineCatalogCard as WineCatalogCardType } from "@/types/wineCatalogCard";

type UseCatalogWinesParams = {
  wineTypes: string[];
  countries: string[];
};

export const useCatalogWines = ({
  wineTypes,
  countries,
}: UseCatalogWinesParams) => {
  const [wines, setWines] = useState<WineCatalogCardType[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isCurating, setIsCurating] = useState(false);
  const [error, setError] = useState("");

  const hasLoadedRef = useRef(false);
  const curatingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

        const hasFilters = wineTypes.length > 0 || countries.length > 0;

        const data = hasFilters
          ? await filterWines({
              wineTypes,
              countries,
            })
          : await getWines();

        if (!Array.isArray(data)) {
          throw new Error("Invalid wines data");
        }

        if (isMounted) {
          setWines(data);
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
  }, [wineTypes, countries, startCuratingAnimation]);

  useEffect(() => {
    return () => {
      if (curatingTimeoutRef.current) {
        clearTimeout(curatingTimeoutRef.current);
      }
    };
  }, []);

  return {
    wines,
    isInitialLoading,
    isCurating,
    error,
    startCuratingAnimation,
  };
};