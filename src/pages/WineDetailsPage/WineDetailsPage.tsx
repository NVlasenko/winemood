import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWineById } from "@/shared/api/wineApi";
import { WineCard } from "../../components/WineCard/WineCard";

import type { Wine } from "../../types/wine";

import "./WineDetailsPage.scss";
import { WineGlassLoader } from "@/components/WineCard/components/WineGlassLoader";

export const WineDetailsPage = () => {
  const { id } = useParams();

  const [wine, setWine] = useState<Wine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadWine = async () => {
      if (!id) {
        setError("Wine id is missing.");
        setIsLoading(false);

        return;
      }

      try {
        setIsLoading(true);
        setError("");

        const numericId = Number(id);

        if (Number.isNaN(numericId)) {
          throw new Error("Invalid wine id.");
        }

        const data = await getWineById(numericId);

        if (!data) {
          throw new Error("Wine not found.");
        }

        if (isMounted) {
          setWine(data);
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error("Failed to load wine", error);

        setWine(null);

        if (error instanceof TypeError) {
          setError("Network error. Please check your internet connection.");

          return;
        }

        if (error instanceof Error) {
          if (error.message.includes("404")) {
            setError("Wine not found.");

            return;
          }

          if (error.message.includes("500")) {
            setError("Server error. Please try again later.");

            return;
          }

          if (error.message.includes("Failed to fetch")) {
            setError("Unable to connect to the server.");

            return;
          }

          setError(error.message);

          return;
        }

        setError("Something went wrong.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadWine();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const renderLoader = () => (
    <div className="wine-details-page__loader-wrapper">
      <div className="wine-details-page__loader-glow" />

      <WineGlassLoader />
    </div>
  );

  const renderError = () => (
    <div className="wine-details-page__empty">
      <h1 className="wine-details-page__title">Failed to load wine</h1>

      <p className="wine-details-page__text">{error}</p>
    </div>
  );

  const renderNotFound = () => (
    <div className="wine-details-page__empty">
      <h1 className="wine-details-page__title">Wine not found</h1>

      <p className="wine-details-page__text">
        This wine does not exist or has been removed.
      </p>
    </div>
  );

  const renderContent = () => {
    if (isLoading) {
      return renderLoader();
    }

    if (error) {
      return renderError();
    }

    if (!wine) {
      return renderNotFound();
    }

    return <WineCard wine={wine} />;
  };

  return <main className="wine-details-page">{renderContent()}</main>;
};
