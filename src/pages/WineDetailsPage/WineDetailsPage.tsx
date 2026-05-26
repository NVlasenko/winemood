import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { WineCard } from "../../components/WineCard/WineCard";

import type { Wine } from "../../types/wine";

import { getWineById } from "@/shared/api/wineApi";

import "./WineDetailsPage.scss";

export const WineDetailsPage = () => {
  const { id } = useParams();

  const [wine, setWine] = useState<Wine | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWine = async () => {
      if (!id) {
        return;
      }

      try {
        setIsLoading(true);

        const data = await getWineById(Number(id));

        setWine(data);
      } catch (error) {
        console.error("Failed to load wine", error);

        setWine(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadWine();
  }, [id]);

  if (isLoading) {
    return (
      <main className="wine-details-page">
        <div className="wine-details-page__loader-wrapper">
          <div className="wine-details-page__loader-glow" />

          <div className="wine-details-page__loader" />
        </div>
      </main>
    );
  }

  if (!wine) {
    return (
      <main className="wine-details-page">
        <div className="wine-details-page__empty">
          <h1 className="wine-details-page__title">
            Wine not found
          </h1>

          <p className="wine-details-page__text">
            This wine does not exist or has been removed.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="wine-details-page">
      <WineCard wine={wine} />
    </main>
  );
};