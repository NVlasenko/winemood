import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { userApi } from "@/shared/api/userApi";
import { useAuth } from "@/context/AuthContext";
import { queryClient } from "@/shared/lib/reactQuery";
import { refetchAchievementsSafe } from "@/shared/lib/refetchAchievementsSafe";

import type { WineCatalogCard as WineCatalogCardType } from "@/types/wineCatalogCard";

type FavoritesContextType = {
  favoriteWines: WineCatalogCardType[];
  favoriteIds: number[];
  favoritesCount: number;

  isLoadingFavorites: boolean;
  hasLoadedFavorites: boolean;

  toggleFavorite: (
    wine: WineCatalogCardType,
  ) => Promise<void>;

  isFavorite: (id: number) => boolean;
  isPending: (id: number) => boolean;
};

const FavoritesContext =
  createContext<FavoritesContextType | null>(
    null,
  );

type Props = {
  children: ReactNode;
  initialFavoriteWines?: WineCatalogCardType[];
};

export const FavoritesProvider = ({
  children,
  initialFavoriteWines = [],
}: Props) => {
  const {
    isAuthenticated,
    isLoadingUser,
    user,
  } = useAuth();

  const [
    favoriteWines,
    setFavoriteWines,
  ] = useState<
    WineCatalogCardType[]
  >(initialFavoriteWines);

  const [
    pendingIds,
    setPendingIds,
  ] = useState<number[]>([]);

  const [
    isLoadingFavorites,
    setIsLoadingFavorites,
  ] = useState(false);

  const [
    hasLoadedFavorites,
    setHasLoadedFavorites,
  ] = useState(
    initialFavoriteWines.length > 0,
  );

  useEffect(() => {
    if (isLoadingUser) {
      return;
    }

    if (
      !isAuthenticated ||
      !user
    ) {
      setFavoriteWines([]);
      setIsLoadingFavorites(false);
      setHasLoadedFavorites(false);

      return;
    }

    let isActive = true;

    const loadFavorites =
      async () => {
        setIsLoadingFavorites(true);

        try {
          const favorites =
            await userApi.getFavorites();

          if (!isActive) {
            return;
          }

          setFavoriteWines(
            favorites,
          );

          setHasLoadedFavorites(true);
        } catch (error) {
          if (!isActive) {
            return;
          }

          console.error(
            "Failed to load favorites",
            error,
          );
          setHasLoadedFavorites(true);
        } finally {
          if (isActive) {
            setIsLoadingFavorites(
              false,
            );
          }
        }
      };

    void loadFavorites();

    return () => {
      isActive = false;
    };
  }, [
    isAuthenticated,
    isLoadingUser,
    user?.id,
  ]);

  const favoriteIds =
    useMemo(
      () =>
        favoriteWines.map(
          (wine) => wine.id,
        ),
      [favoriteWines],
    );

  const favoriteSet =
    useMemo(
      () =>
        new Set(
          favoriteIds,
        ),
      [favoriteIds],
    );

  const pendingSet =
    useMemo(
      () =>
        new Set(
          pendingIds,
        ),
      [pendingIds],
    );

  const favoritesCount =
    favoriteWines.length;

  const toggleFavorite =
    useCallback(
      async (
        wine: WineCatalogCardType,
      ) => {
        const id = wine.id;

        let shouldSkip = false;

        setPendingIds(
          (previousIds) => {
            if (
              previousIds.includes(
                id,
              )
            ) {
              shouldSkip = true;

              return previousIds;
            }

            return [
              ...previousIds,
              id,
            ];
          },
        );

        if (shouldSkip) {
          return;
        }

        const isFav =
          favoriteSet.has(id);

        setFavoriteWines(
          (previousWines) => {
            if (isFav) {
              return previousWines.filter(
                (item) =>
                  item.id !== id,
              );
            }

            if (
              previousWines.some(
                (item) =>
                  item.id === id,
              )
            ) {
              return previousWines;
            }

            return [
              ...previousWines,
              wine,
            ];
          },
        );

        try {
          if (isFav) {
            await userApi.removeFavorite(
              id,
            );
          } else {
            await userApi.addFavorite(
              id,
            );
          }

          queryClient.invalidateQueries(
            {
              queryKey: [
                "favorites",
                user?.id,
              ],
            },
          );

          await refetchAchievementsSafe(
            queryClient,
            user?.id,
          );
        } catch (error) {
          console.error(
            "Toggle favorite failed",
            error,
          );

          setFavoriteWines(
            (previousWines) => {
              if (isFav) {
                return previousWines.some(
                  (item) =>
                    item.id === id,
                )
                  ? previousWines
                  : [
                      ...previousWines,
                      wine,
                    ];
              }

              return previousWines.filter(
                (item) =>
                  item.id !== id,
              );
            },
          );
        } finally {
          setPendingIds(
            (previousIds) =>
              previousIds.filter(
                (item) =>
                  item !== id,
              ),
          );
        }
      },
      [
        favoriteSet,
        user?.id,
      ],
    );

  const isFavorite =
    useCallback(
      (id: number) =>
        favoriteSet.has(id),
      [favoriteSet],
    );

  const isPending =
    useCallback(
      (id: number) =>
        pendingSet.has(id),
      [pendingSet],
    );

  const value = useMemo(
    () => ({
      favoriteWines,
      favoriteIds,
      favoritesCount,

      isLoadingFavorites,
      hasLoadedFavorites,

      toggleFavorite,
      isFavorite,
      isPending,
    }),
    [
      favoriteWines,
      favoriteIds,
      favoritesCount,
      isLoadingFavorites,
      hasLoadedFavorites,
      toggleFavorite,
      isFavorite,
      isPending,
    ],
  );

  return (
    <FavoritesContext.Provider
      value={value}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context =
    useContext(
      FavoritesContext,
    );

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider",
    );
  }

  return context;
};