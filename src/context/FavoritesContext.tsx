import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type FavoritesContextType = {
  favorites: number[];
  toggleFavorite: (id: number) => void;
};

const FavoritesContext = createContext<FavoritesContextType | null>(null);

type Props = {
  children: ReactNode;
};

export const FavoritesProvider = ({ children }: Props) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id],
    );
  }, []);

  const value = useMemo(
    () => ({
      favorites,
      toggleFavorite,
    }),
    [favorites, toggleFavorite],
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