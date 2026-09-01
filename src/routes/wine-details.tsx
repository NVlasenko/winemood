import { useLoaderData } from "react-router";

import { WineDetailsPage } from "@/pages/WineDetailsPage";

import { getSiteAssets } from "@/shared/api/assets/siteAssetsApi";
import { reviewApi } from "@/shared/api/reviewApi";
import { getSimilarWines } from "@/shared/api/similarWinesApi";
import { getWineById } from "@/shared/api/wineApi";

const MAX_SIMILAR_WINES = 4;

const getWineDetailsErrorMessage = (
  error: unknown,
): string => {
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

    if (
      error.message.includes(
        "Failed to fetch",
      )
    ) {
      return "Unable to connect to the server.";
    }
  }

  return "Something went wrong. Please try again later.";
};

export async function loader({
  params,
}: {
  params: {
    id?: string;
  };
}) {
  const id = params.id;

  if (!id) {
    return {
      wine: null,
      siteAssets: null,
      similarWines: [],
      wineReviews: [],
      error: "Wine id is missing.",
    };
  }

  const numericId = Number(id);

  if (
    !Number.isInteger(numericId) ||
    numericId <= 0
  ) {
    return {
      wine: null,
      siteAssets: null,
      similarWines: [],
      wineReviews: [],
      error: "Invalid wine id.",
    };
  }

  try {
    const [
      wine,
      siteAssets,
      similarWines,
      wineReviews,
    ] = await Promise.all([
      getWineById(numericId),
      getSiteAssets(),
      getSimilarWines(numericId),
      reviewApi.getWineReviews(numericId),
    ]);

    if (!wine) {
      return {
        wine: null,
        siteAssets,
        similarWines: [],
        wineReviews: [],
        error: "Wine not found.",
      };
    }

    return {
      wine,
      siteAssets,
      similarWines:
        Array.isArray(similarWines)
          ? similarWines.slice(
              0,
              MAX_SIMILAR_WINES,
            )
          : [],
      wineReviews:
        Array.isArray(wineReviews)
          ? wineReviews
          : [],
      error: "",
    };
  } catch (error) {
    console.error(
      "Failed to load wine details",
      error,
    );

    return {
      wine: null,
      siteAssets: null,
      similarWines: [],
      wineReviews: [],
      error:
        getWineDetailsErrorMessage(
          error,
        ),
    };
  }
}

export default function WineDetailsRoute() {
  const data =
    useLoaderData<typeof loader>();

  return (
    <WineDetailsPage
      wine={data.wine}
      pagePatternUrl={
        data.siteAssets?.shared
          .pagePatternUrl
      }
      reviewsBackdropUrl={
        data.siteAssets?.reviews
          .wineBackdropUrl
      }
      similarWines={
        data.similarWines
      }
      wineReviews={
        data.wineReviews
      }
      error={data.error}
    />
  );
}