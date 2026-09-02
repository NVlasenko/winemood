import { CatalogEmptyState } from "@/components/catalog/CatalogEmptyState";
import { CatalogErrorState } from "@/components/catalog/CatalogErrorState";
import { WineCatalogCard } from "@/components/catalog/WineCatalogCard";

import type { WineCatalogCard as WineCatalogCardType } from "@/types/wineCatalogCard";

type Props = {
  wines: WineCatalogCardType[];
  favoriteIds: Set<number>;
  isCurating: boolean;
  error: string;
  onOpenFilters: () => void;
  onToggleFavorite: (
    wine: WineCatalogCardType,
  ) => Promise<void>;
};

export const CatalogContent = ({
  wines,
  favoriteIds,
  isCurating,
  error,
  onOpenFilters,
  onToggleFavorite,
}: Props) => {
  if (error) {
    return (
      <CatalogErrorState
        message={error}
      />
    );
  }

  if (!wines.length) {
    return (
      <CatalogEmptyState
        onOpenFilters={
          onOpenFilters
        }
      />
    );
  }

  return (
    <div className="catalog-page__curation">
      <div
        className={`catalog-page__grid ${
          isCurating
            ? "catalog-page__grid--curating"
            : ""
        }`}
      >
        {wines.map(
          (wine, index) => (
            <WineCatalogCard
              key={wine.id}
              wine={wine}
              index={index}
              isFavorite={favoriteIds.has(
                wine.id,
              )}
              onToggleFavorite={
                onToggleFavorite
              }
            />
          ),
        )}
      </div>
    </div>
  );
};