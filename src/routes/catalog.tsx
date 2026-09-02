import { useLoaderData } from "react-router";

import { CatalogPage } from "@/pages/CatalogPage";

import { filterWines } from "@/shared/api/wineFilterApi";
import { CATALOG_PAGE_SIZE } from "@/shared/config/catalog";
import { buildWineFilters } from "@/shared/lib/buildWineFilters";

const getArrayParam = (
  searchParams: URLSearchParams,
  key: string,
): string[] => {
  const value = searchParams.get(key);

  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const getPage = (
  searchParams: URLSearchParams,
): number => {
  const value = Number(
    searchParams.get("page") ?? "1",
  );

  if (
    !Number.isInteger(value) ||
    value < 1
  ) {
    return 0;
  }

  return value - 1;
};

const getSort = (
  searchParams: URLSearchParams,
): string[] => {
  switch (searchParams.get("sort")) {
    case "TOP_RATED":
      return ["rating,desc"];

    case "ALPHABETICAL":
      return ["name,asc"];

    case "POPULARITY":
      return ["viewCount,desc"];

    default:
      return [];
  }
};

export async function loader({
  request,
}: {
  request: Request;
}) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const searchQuery =
    searchParams.get("search") ?? "";

  const wineTypes = getArrayParam(
    searchParams,
    "wineTypes",
  );

  const countries = getArrayParam(
    searchParams,
    "countries",
  );

  const sweetnessLevels = getArrayParam(
    searchParams,
    "sweetnessLevels",
  );

  const grapeVarieties = getArrayParam(
    searchParams,
    "grapeVarieties",
  );

  const wineStyles = getArrayParam(
    searchParams,
    "wineStyles",
  );

  const acidityLevels = getArrayParam(
    searchParams,
    "acidityLevels",
  );

  const aromaNotes = getArrayParam(
    searchParams,
    "aromaNotes",
  );

  const moods = getArrayParam(
    searchParams,
    "moods",
  );

  const events = getArrayParam(
    searchParams,
    "events",
  );

  const seasons = getArrayParam(
    searchParams,
    "seasons",
  );

  const foodName = getArrayParam(
    searchParams,
    "foodName",
  );

  const page = getPage(searchParams);
  const sort = getSort(searchParams);

  const response = await filterWines({
    filters: buildWineFilters({
      searchQuery,
      wineTypes,
      countries,
      sweetnessLevels,
      grapeVarieties,
      wineStyles,
      acidityLevels,
      aromaNotes,
      moods,
      events,
      seasons,
      foodName,
    }),
    page,
    size: CATALOG_PAGE_SIZE,
    sort,
  });

  if (!Array.isArray(response.data)) {
    throw new Error(
      "Invalid wines data",
    );
  }

  return {
    wines: response.data,
    currentPage: page,
    totalPages:
      response.meta.totalPages,
  };
}

export function shouldRevalidate({
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}: {
  currentUrl: URL;
  nextUrl: URL;
  defaultShouldRevalidate: boolean;
}) {
  const currentParams =
    new URLSearchParams(
      currentUrl.searchParams,
    );

  const nextParams =
    new URLSearchParams(
      nextUrl.searchParams,
    );

  currentParams.delete("searchOpen");
  nextParams.delete("searchOpen");

  if (
    currentParams.toString() ===
    nextParams.toString()
  ) {
    return false;
  }

  return defaultShouldRevalidate;
}

export default function CatalogRoute() {
  const data =
    useLoaderData<typeof loader>();

  return (
    <CatalogPage
      wines={data.wines}
      currentPage={
        data.currentPage
      }
      totalPages={
        data.totalPages
      }
    />
  );
}