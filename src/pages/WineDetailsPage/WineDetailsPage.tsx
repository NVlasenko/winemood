import {
  useEffect,
  useRef,
} from "react";

import { useQueryClient } from "@tanstack/react-query";

import { WineDetailsErrorState } from "@/components/wineDetails/sections/WineDetailsErrorState";
import { WineDetailsNotFoundState } from "@/components/wineDetails/sections/WineDetailsNotFoundState";

import { useAuth } from "@/context/AuthContext";

import { getWineById } from "@/shared/api/wineApi";
import { refetchAchievementsSafe } from "@/shared/lib/refetchAchievementsSafe";
import { WineDetails } from "@/components/wineDetails";

import type { Wine } from "@/types/wine";
import type { WineCatalogCard } from "@/types/wineCatalogCard";
import type { WineReviewDto } from "@/types/reviews";

import "./WineDetailsPage.scss";

type WineDetailsPageProps = {
  wine: Wine | null;
  pagePatternUrl?: string;
  reviewsBackdropUrl?: string;
  similarWines: WineCatalogCard[];
  wineReviews: WineReviewDto[];
  error: string;
};

export const WineDetailsPage = ({
  wine,
  pagePatternUrl,
  reviewsBackdropUrl,
  similarWines,
  wineReviews,
  error,
}: WineDetailsPageProps) => {
  const {
    user,
    refreshUser,
  } = useAuth();

  const queryClient =
    useQueryClient();

  const trackedWineRef =
    useRef<number | null>(null);

  useEffect(() => {
    if (!user || !wine) {
      return;
    }

    if (
      trackedWineRef.current ===
      wine.id
    ) {
      return;
    }

    trackedWineRef.current =
      wine.id;

    const refreshAchievements =
      async () => {
        try {
          await getWineById(wine.id);

          await refetchAchievementsSafe(
            queryClient,
            user.id,
          );

          await refreshUser();
        } catch (error) {
          console.error(
            "Failed to track wine view",
            error,
          );
        }
      };

    void refreshAchievements();
  }, [
    wine,
    user?.id,
    queryClient,
    refreshUser,
  ]);

  return (
    <main className="wine-details-page">
      {error && (
        <WineDetailsErrorState
          message={error}
        />
      )}

      {!error && !wine && (
        <WineDetailsNotFoundState />
      )}

      {!error && wine && (
        <WineDetails
          wine={wine}
          pagePatternUrl={
            pagePatternUrl
          }
          reviewsBackdropUrl={
            reviewsBackdropUrl
          }
          similarWines={
            similarWines
          }
          wineReviews={
            wineReviews
          }
        />
      )}
    </main>
  );
};