import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import { userApi } from "@/shared/api/userApi";
import { useAuth } from "@/context/AuthContext";

import type { WineCatalogCard as WineCatalogCardType } from "@/types/wineCatalogCard";

type FavoritesContextType = {
  favoriteWines: WineCatalogCardType[];
  favoriteIds: number[];
  favoritesCount: number;

  toggleFavorite: (wine: WineCatalogCardType) => Promise<void>;
  isFavorite: (id: number) => boolean;
  isPending: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const FavoritesProvider = ({ children }: Props) => {
  const { isAuthenticated, isLoadingUser } = useAuth();

  const [favoriteWines, setFavoriteWines] = useState<WineCatalogCardType[]>([]);
  const [pendingIds, setPendingIds] = useState<number[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      setFavoriteWines([]);
      return;
    }

    if (isLoadingUser) return;

    userApi
      .getFavorites()
      .then(setFavoriteWines)
      .catch((e) => {
        console.error("Failed to load favorites", e);
        setFavoriteWines([]);
      });
  }, [isAuthenticated, isLoadingUser]);

  const favoriteIds = useMemo(
    () => favoriteWines.map((w) => w.id),
    [favoriteWines]
  );

  const favoriteSet = useMemo(
    () => new Set(favoriteIds),
    [favoriteIds]
  );

  const pendingSet = useMemo(
    () => new Set(pendingIds),
    [pendingIds]
  );

  const favoritesCount = favoriteWines.length;

  const toggleFavorite = useCallback(
    async (wine: WineCatalogCardType) => {
      const id = wine.id;

      let shouldSkip = false;

      setPendingIds((prev) => {
        if (prev.includes(id)) {
          shouldSkip = true;
          return prev;
        }
        return [...prev, id];
      });

      if (shouldSkip) return;

      const isFav = favoriteSet.has(id);

      setFavoriteWines((prev) => {
        if (isFav) {
          return prev.filter((w) => w.id !== id);
        }

        if (prev.some((w) => w.id === id)) {
          return prev;
        }

        return [...prev, wine];
      });

      try {
        if (isFav) {
          await userApi.removeFavorite(id);
        } else {
          await userApi.addFavorite(id);
        }
      } catch (e) {
        console.error("Toggle favorite failed", e);
        
        setFavoriteWines((prev) => {
          if (isFav) {
            return prev.some((w) => w.id === id)
              ? prev
              : [...prev, wine];
          }

          return prev.filter((w) => w.id !== id);
        });
      } finally {
        setPendingIds((prev) => prev.filter((i) => i !== id));
      }
    },
    [favoriteSet]
  );

  const isFavorite = useCallback(
    (id: number) => favoriteSet.has(id),
    [favoriteSet]
  );

  const isPending = useCallback(
    (id: number) => pendingSet.has(id),
    [pendingSet]
  );

  const value = useMemo(
    () => ({
      favoriteWines,
      favoriteIds,
      favoritesCount,
      toggleFavorite,
      isFavorite,
      isPending,
    }),
    [
      favoriteWines,
      favoriteIds,
      favoritesCount,
      toggleFavorite,
      isFavorite,
      isPending,
    ]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
};