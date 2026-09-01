import { WineCatalogCard } from "@/components/catalog/WineCatalogCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

import { useFavorites } from "@/context/FavoritesContext";

import type { WineCatalogCard as WineCatalogCardType } from "@/types/wineCatalogCard";

import "./SimilarWines.scss";

type Props = {
  wines: WineCatalogCardType[];
};

export const SimilarWines = ({
  wines,
}: Props) => {
  const {
    isFavorite,
    toggleFavorite,
  } = useFavorites();

  if (!wines.length) {
    return null;
  }

  return (
    <section className="similar-wines">
      <div className="container">
        <SectionTitle title="You May Also Like" />

        <div className="similar-wines__grid">
          {wines.map(
            (wine, index) => (
              <WineCatalogCard
                key={wine.id}
                wine={wine}
                index={index}
                isFavorite={isFavorite(
                  wine.id,
                )}
                onToggleFavorite={
                  toggleFavorite
                }
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
};