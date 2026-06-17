import { useEffect, useState } from "react";

import { getWineById } from "@/shared/api/wineApi";

import type { Wine } from "@/types/wine";

type UseWineDetailsResult = {
  wine: Wine | null;
  isLoading: boolean;
  error: string;
};

const getWineDetailsErrorMessage = (error: unknown): string => {
  if (error instanceof TypeError) {
    return "Network error. Please check your internet connection.";
  }

  if (error instanceof Error) {
    if (error.message.includes("404")) {
      return "Wine not found.";
    }

    if (error.message.includes("500")) {
      return "Server error. Please try again later.";
    }

    if (error.message.includes("Failed to fetch")) {
      return "Unable to connect to the server.";
    }

    return error.message;
  }

  return "Something went wrong.";
};

export const useWineDetails = (id?: string): UseWineDetailsResult => {
  const [wine, setWine] = useState<Wine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadWine = async () => {
      if (!id) {
        if (isMounted) {
          setWine(null);
          setError("Wine id is missing.");
          setIsLoading(false);
        }

        return;
      }

      const numericId = Number(id);

      if (!Number.isInteger(numericId) || numericId <= 0) {
        if (isMounted) {
          setWine(null);
          setError("Invalid wine id.");
          setIsLoading(false);
        }

        return;
      }

      try {
        setIsLoading(true);
        setError("");

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
        setError(getWineDetailsErrorMessage(error));
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

  return {
    wine,
    isLoading,
    error,
  };
};