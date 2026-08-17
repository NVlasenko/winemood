import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

import { WineDetails } from "@/components/wineDetails/WineDetails";
import { WineDetailsErrorState } from "@/components/wineDetails/sections/WineDetailsErrorState";
import { WineDetailsLoader } from "@/components/wineDetails/sections/WineDetailsLoader";
import { WineDetailsNotFoundState } from "@/components/wineDetails/sections/WineDetailsNotFoundState";

import { useWineDetails } from "@/hooks/wineDetails";

import { useAuth } from "@/context/AuthContext";

import { refetchAchievementsSafe } from "@/shared/lib/refetchAchievementsSafe";

import "./WineDetailsPage.scss";

export const WineDetailsPage = () => {
  const { id } = useParams();

  const { user, refreshUser } = useAuth();
  const queryClient = useQueryClient();

  const { wine, isLoading, error } = useWineDetails(id);

  const trackedWineRef = useRef<number | null>(null);

  useEffect(() => {
    if (!user || !wine) return;

    if (trackedWineRef.current === wine.id) return;

    trackedWineRef.current = wine.id;

    const refreshAchievements = async () => {
      await refetchAchievementsSafe(queryClient, user.id);
      await refreshUser();
    };

    refreshAchievements();
  }, [wine, user?.id, queryClient, refreshUser]);

  return (
    <main className="wine-details-page">
      {isLoading && <WineDetailsLoader />}

      {!isLoading && error && <WineDetailsErrorState message={error} />}

      {!isLoading && !error && !wine && <WineDetailsNotFoundState />}

      {!isLoading && !error && wine && <WineDetails wine={wine} />}
    </main>
  );
};
