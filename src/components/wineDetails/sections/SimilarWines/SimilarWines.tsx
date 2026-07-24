import { useEffect, useState } from "react";

import { WineCatalogCard } from "@/components/catalog/WineCatalogCard";
import { SectionTitle } from "@/components/ui/SectionTitle";

import { useFavorites } from "@/context/FavoritesContext";

import type { WineCatalogCard as WineCatalogCardType } from "@/types/wineCatalogCard";

import "./SimilarWines.scss";
import { getSimilarWines } from "@/shared/api/similarWinesApi";

type Props = {
  wineId: number;
};

const MAX_SIMILAR_WINES = 4;

export const SimilarWines = ({ wineId }: Props) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const [similarWines, setSimilarWines] = useState<WineCatalogCardType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadSimilarWines = async () => {
      try {
        setIsLoading(true);
        setError("");

        const wines = await getSimilarWines(wineId);

        if (!Array.isArray(wines)) {
          throw new Error("Invalid similar wines data");
        }

        if (isMounted) {
          setSimilarWines(wines.slice(0, MAX_SIMILAR_WINES));
        }
      } catch (e) {
        console.error("Failed to load similar wines", e);

        if (isMounted) {
          setError("Failed to load similar wines.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadSimilarWines();

    return () => {
      isMounted = false;
    };
  }, [wineId]);

  if (isLoading) {
    return (
      <section className="similar-wines">
        <div className="container">
          <SectionTitle title="You May Also Like" />
          <p className="similar-wines__state">Loading similar wines...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="similar-wines">
        <div className="container">
          <SectionTitle title="You May Also Like" />
          <p className="similar-wines__state">{error}</p>
        </div>
      </section>
    );
  }

  if (!similarWines.length) return null;

  return (
    <section className="similar-wines">
      <div className="container">
        <SectionTitle title="You May Also Like" />

        <div className="similar-wines__grid">
          {similarWines.map((wine, index) => (
            <WineCatalogCard
              key={wine.id}
              wine={wine}
              index={index}
              isFavorite={isFavorite(wine.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </div>
    </section>
  );
};