import type { UseCatalogWinesParams } from "@/types/catalogWinesParams";
import type { WineFilterRequest } from "@/types/filters";

export const buildWineFilters = ({
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
}: UseCatalogWinesParams): WineFilterRequest => {
  const filters: WineFilterRequest = {};

  const normalizedSearchQuery =
    searchQuery.trim();

  if (normalizedSearchQuery) {
    filters.search =
      normalizedSearchQuery;
  }

  if (wineTypes.length > 0) {
    filters.wineTypes =
      wineTypes;
  }

  if (countries.length > 0) {
    filters.countries =
      countries;
  }

  if (sweetnessLevels.length > 0) {
    filters.sweetnessLevels =
      sweetnessLevels;
  }

  if (grapeVarieties.length > 0) {
    filters.grapeVarieties =
      grapeVarieties;
  }

  if (wineStyles.length > 0) {
    filters.wineStyles =
      wineStyles;
  }

  if (acidityLevels.length > 0) {
    filters.acidityLevels =
      acidityLevels;
  }

  if (aromaNotes.length > 0) {
    filters.aromaNotes =
      aromaNotes;
  }

  if (moods.length > 0) {
    filters.moods =
      moods;
  }

  if (events.length > 0) {
    filters.events =
      events;
  }

  if (seasons.length > 0) {
    filters.seasons =
      seasons;
  }

  if (foodName.length > 0) {
    filters.foodName =
      foodName;
  }

  return filters;
};