import { useCallback, useEffect, useState } from "react";

const SEARCH_HISTORY_KEY = "wine_search_history";
const MAX_SEARCH_HISTORY_ITEMS = 5;

const normalizeSearchQuery = (query: string) => {
  return query.trim();
};

const readSearchHistory = (): string[] => {
  try {
    const rawValue = localStorage.getItem(SEARCH_HISTORY_KEY);

    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter((item): item is string => {
      return typeof item === "string" && item.trim().length > 0;
    });
  } catch {
    return [];
  }
};

const writeSearchHistory = (history: string[]) => {
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
};

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory(readSearchHistory());
  }, []);

  const addSearchQuery = useCallback((query: string) => {
    const normalizedQuery = normalizeSearchQuery(query);

    if (!normalizedQuery) {
      return;
    }

    setHistory((currentHistory) => {
      const nextHistory = [
        normalizedQuery,
        ...currentHistory.filter(
          (item) => item.toLowerCase() !== normalizedQuery.toLowerCase(),
        ),
      ].slice(0, MAX_SEARCH_HISTORY_ITEMS);

      writeSearchHistory(nextHistory);

      return nextHistory;
    });
  }, []);

  const removeSearchQuery = useCallback((query: string) => {
    setHistory((currentHistory) => {
      const nextHistory = currentHistory.filter(
        (item) => item.toLowerCase() !== query.toLowerCase(),
      );

      writeSearchHistory(nextHistory);

      return nextHistory;
    });
  }, []);

  const clearSearchHistory = useCallback(() => {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
    setHistory([]);
  }, []);

  return {
    history,
    addSearchQuery,
    removeSearchQuery,
    clearSearchHistory,
  };
};