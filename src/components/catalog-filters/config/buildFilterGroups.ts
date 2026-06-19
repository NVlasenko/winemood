import { formatLabel } from "@/utils/formatLabel";

import type { FilterGroup, FilterOption, FilterSubgroup } from "@/types/filters";
import type {
  MetadataFilter,
  MetadataFoodGroup,
  MetadataMoodOptions,
  MetadataOption,
} from "@/types/metadata";

const FILTER_KEY_TO_QUERY_PARAM: Record<string, string> = {
  WINE_TYPE: "wineTypes",
  COUNTRY: "countries",
  SWEETNESS: "sweetnessLevels",
  GRAPE_VARIETY: "grapeVarieties",
  WINE_STYLE: "wineStyles",
  ACIDITY: "acidityLevels",
  AROMA_NOTE: "aromaNotes",
};

const ENUM_FILTER_KEYS = new Set([
  "WINE_TYPE",
  "SWEETNESS",
  "GRAPE_VARIETY",
  "WINE_STYLE",
  "ACIDITY",
  "AROMA_NOTE",
  "MOOD",
  "FOOD_PAIRING",
]);

const normalizeEnumValue = (value: string) => {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toUpperCase();
};

const getOptionValue = (filterKey: string, value: string) => {
  if (ENUM_FILTER_KEYS.has(filterKey)) {
    return normalizeEnumValue(value);
  }

  return value;
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === "object";
};

const isMetadataOption = (option: unknown): option is MetadataOption => {
  return (
    isRecord(option) &&
    typeof option.name === "string"
  );
};

const isMetadataOptionArray = (
  options: unknown,
): options is MetadataOption[] => {
  return Array.isArray(options) && options.every(isMetadataOption);
};

const isFoodGroup = (group: unknown): group is MetadataFoodGroup => {
  return (
    isRecord(group) &&
    typeof group.category === "string" &&
    isMetadataOptionArray(group.foods)
  );
};

const isFoodGroupArray = (
  options: unknown,
): options is MetadataFoodGroup[] => {
  return Array.isArray(options) && options.every(isFoodGroup);
};

const isMoodOptions = (options: unknown): options is MetadataMoodOptions => {
  if (!isRecord(options)) {
    return false;
  }

  return (
    isMetadataOptionArray(options.moods) &&
    isMetadataOptionArray(options.events) &&
    isMetadataOptionArray(options.seasons)
  );
};

const buildOption = (
  option: MetadataOption,
  filterKey: string,
): FilterOption => ({
  id: option.name,
  label: formatLabel(option.name),
  value: getOptionValue(filterKey, option.name),
});

const buildSubgroup = ({
  id,
  title,
  filterId,
  options,
  filterKey,
}: {
  id: string;
  title: string;
  filterId: string;
  options: MetadataOption[];
  filterKey: string;
}): FilterSubgroup => ({
  id,
  title: formatLabel(title),
  filterId,
  options: options.map((option) => buildOption(option, filterKey)),
});

export const buildFilterGroups = (
  metadataFilters: MetadataFilter[],
): FilterGroup[] => {
  return metadataFilters.map((filter) => {
    if (isMoodOptions(filter.options)) {
      return {
        id: "moodGroup",
        title: filter.title,
        iconUrl: filter.iconUrl,
        subgroups: [
          buildSubgroup({
            id: "moods",
            title: "Moods",
            filterId: "moods",
            options: filter.options.moods,
            filterKey: filter.filterKey,
          }),
          buildSubgroup({
            id: "events",
            title: "Events",
            filterId: "events",
            options: filter.options.events,
            filterKey: filter.filterKey,
          }),
          buildSubgroup({
            id: "seasons",
            title: "Seasons",
            filterId: "seasons",
            options: filter.options.seasons,
            filterKey: filter.filterKey,
          }),
        ],
      };
    }

    if (isFoodGroupArray(filter.options)) {
      return {
        id: "foodName",
        title: filter.title,
        iconUrl: filter.iconUrl,
        subgroups: filter.options.map((group) =>
          buildSubgroup({
            id: group.category,
            title: group.category,
            filterId: "foodName",
            options: group.foods,
            filterKey: filter.filterKey,
          }),
        ),
      };
    }

    if (isMetadataOptionArray(filter.options)) {
      const id = FILTER_KEY_TO_QUERY_PARAM[filter.filterKey];

      if (!id) {
        throw new Error(`Unsupported filter key: ${filter.filterKey}`);
      }

      return {
        id,
        title: filter.title,
        iconUrl: filter.iconUrl,
        options: filter.options.map((option) =>
          buildOption(option, filter.filterKey),
        ),
      };
    }

    throw new Error(`Invalid metadata options for filter: ${filter.filterKey}`);
  });
};