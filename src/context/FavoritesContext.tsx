import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const FAVORITES_STORAGE_KEY = "favoriteWineIds";

type FavoritesContextType = {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

type Props = {
  children: ReactNode;
};

const getSavedFavorites = (): number[] => {
  try {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);

    if (!savedFavorites) {
      return [];
    }

    const parsedFavorites: unknown = JSON.parse(savedFavorites);

    if (!Array.isArray(parsedFavorites)) {
      return [];
    }

    return parsedFavorites.filter(
      (favoriteId): favoriteId is number => typeof favoriteId === "number",
    );
  } catch {
    return [];
  }
};

export const FavoritesProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<number[]>(() =>
    getSavedFavorites(),
  );

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const nextFavorites = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];

      localStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(nextFavorites),
      );

      return nextFavorites;
    });
  }, []);

  const isFavorite = useCallback(
    (id: number) => {
      return favorites.includes(id);
    },
    [favorites],
  );

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
      isFavorite,
    }),
    [favorites, toggleFavorite, isFavorite],
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