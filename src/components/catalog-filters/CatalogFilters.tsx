import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getMetadata } from "@/shared/api/metadataApi";
import { filterWines } from "@/shared/api/wineFilterApi";
import ResetIcon from "@/assets/images/filters/reset/reset-default.svg?react";

import type { MetadataFilter } from "@/types/metadata";
import type { WineArrayFilterKey, WineFilterRequest } from "@/types/filters";

import { buildFilterGroups } from "./config/buildFilterGroups";
import { CatalogFilterGroup } from "./sections/CatalogFilterGroup";

import "./CatalogFilters.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};



type SelectedFilters = Partial<
  Record<WineArrayFilterKey, string[]>
>;

const PREVIEW_PAGE = 0;
const PREVIEW_PAGE_SIZE = 1;

const FILTER_PARAM_KEYS = [
  "wineTypes",
  "countries",
  "sweetnessLevels",
  "grapeVarieties",
  "wineStyles",
  "acidityLevels",
  "aromaNotes",
  "moods",
  "events",
  "seasons",
  "foodName",
] as const satisfies readonly WineArrayFilterKey[];

const buildSelectedFiltersFromUrl = (
  searchParams: URLSearchParams,
): SelectedFilters => {
  return FILTER_PARAM_KEYS.reduce<SelectedFilters>((acc, key) => {
    const param = searchParams.get(key);

    acc[key] = param ? param.split(",") : [];

    return acc;
  }, {});
};

const buildWineFilters = (
  selectedFilters: SelectedFilters,
  searchQuery: string,
): WineFilterRequest => {
  const filters: WineFilterRequest = {};

  const normalizedSearchQuery = searchQuery.trim();

  if (normalizedSearchQuery) {
    filters.search = normalizedSearchQuery;
  }

  FILTER_PARAM_KEYS.forEach((key) => {
    const values = selectedFilters[key] ?? [];

    if (values.length > 0) {
      filters[key] = values;
    }
  });

  return filters;
};

const buildCatalogUrl = (params: URLSearchParams) => {
  const query = params.toString();

  return query ? `/catalog?${query}` : "/catalog";
};

export const CatalogFilters = ({
  isOpen,
  onClose,
}: Props) => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const previewDebounceRef = useRef<number | null>(null);

  const [metadataFilters, setMetadataFilters] = useState<MetadataFilter[]>([]);
  const [openedFilter, setOpenedFilter] = useState("");

  const [selectedFilters, setSelectedFilters] =
    useState<SelectedFilters>(() =>
      buildSelectedFiltersFromUrl(searchParams),
    );

  const [previewCount, setPreviewCount] = useState(0);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const searchQuery = searchParams.get("search") ?? "";

  const filterGroups = useMemo(
    () => buildFilterGroups(metadataFilters),
    [metadataFilters],
  );

  useEffect(() => {
    let isMounted = true;

    const loadMetadata = async () => {
      try {
        const metadata = await getMetadata();

        if (isMounted) {
          setMetadataFilters(metadata);
        }
      } catch (error) {
        console.error(
          "Failed to load metadata filters:",
          error,
        );
      }
    };

    loadMetadata();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setSelectedFilters(
      buildSelectedFiltersFromUrl(searchParams),
    );
  }, [isOpen, searchParams]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let isMounted = true;

    if (previewDebounceRef.current !== null) {
      window.clearTimeout(previewDebounceRef.current);
    }

    previewDebounceRef.current = window.setTimeout(
      async () => {
        try {
          setIsPreviewLoading(true);

          const response = await filterWines({
            filters: buildWineFilters(
              selectedFilters,
              searchQuery,
            ),
            page: PREVIEW_PAGE,
            size: PREVIEW_PAGE_SIZE,
          });

          if (isMounted) {
            setPreviewCount(
              response.meta.totalElements,
            );
          }
        } catch (error) {
          console.error(
            "Failed to load preview count:",
            error,
          );

          if (isMounted) {
            setPreviewCount(0);
          }
        } finally {
          if (isMounted) {
            setIsPreviewLoading(false);
          }
        }
      },
      350,
    );

    return () => {
      isMounted = false;

      if (previewDebounceRef.current !== null) {
        window.clearTimeout(previewDebounceRef.current);
        previewDebounceRef.current = null;
      }
    };
  }, [
    isOpen,
    selectedFilters,
    searchQuery,
  ]);

  const handleClose = useCallback(() => {
    setOpenedFilter("");
    onClose();
  }, [onClose]);

  const toggleFilter = useCallback(
    (id: string) => {
      setOpenedFilter((prev) =>
        prev === id ? "" : id,
      );
    },
    [],
  );

  const toggleOption = useCallback(
    (
      filterId: WineArrayFilterKey,
      value: string,
    ) => {
      setSelectedFilters((prev) => {
        const currentValues =
          prev[filterId] ?? [];

        const isSelected =
          currentValues.includes(value);

        return {
          ...prev,
          [filterId]: isSelected
            ? currentValues.filter(
                (item) => item !== value,
              )
            : [...currentValues, value],
        };
      });
    },
    [],
  );

  const resetFilters = useCallback(() => {
    setSelectedFilters({});
    setOpenedFilter("");

    const params = new URLSearchParams(
      searchParams,
    );

    FILTER_PARAM_KEYS.forEach((key) => {
      params.delete(key);
    });

    params.delete("page");

    navigate(buildCatalogUrl(params));
  }, [navigate, searchParams]);

  const handleShowWines = useCallback(() => {
    const params = new URLSearchParams(
      searchParams,
    );

    FILTER_PARAM_KEYS.forEach((key) => {
      params.delete(key);
    });

    FILTER_PARAM_KEYS.forEach((key) => {
      const values =
        selectedFilters[key] ?? [];

      if (values.length > 0) {
        params.set(key, values.join(","));
      }
    });

    params.delete("page");

    navigate(buildCatalogUrl(params));

    onClose();
  }, [
    navigate,
    onClose,
    searchParams,
    selectedFilters,
  ]);

  return (
    <div
      className={[
        "catalog-filters",
        isOpen
          ? "catalog-filters--open"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        className="catalog-filters__backdrop"
        type="button"
        aria-label="Close filters"
        onClick={handleClose}
      />

      <aside className="catalog-filters__panel">
        <div className="catalog-filters__header">
          <div className="catalog-filters__header-left">
            <h2 className="catalog-filters__title">
              Filters
            </h2>

            <button
              className="catalog-filters__reset"
              type="button"
              onClick={resetFilters}
            >
              Reset all

              <ResetIcon
                className="catalog-filters__reset-icon"
                aria-hidden="true"
                focusable="false"
              />
            </button>
          </div>

          <button
            className="catalog-filters__close"
            type="button"
            aria-label="Close filters"
            onClick={handleClose}
          >
            <span />
            <span />
          </button>
        </div>

        <div className="catalog-filters__list">
          {filterGroups.map((filter) => (
            <CatalogFilterGroup
              key={filter.id}
              filter={filter}
              openedFilter={openedFilter}
              selectedFilters={selectedFilters}
              onToggleFilter={toggleFilter}
              onToggleOption={toggleOption}
            />
          ))}
        </div>

        <button
          className="button-primary catalog-filters__show-button"
          type="button"
          onClick={handleShowWines}
        >
          {isPreviewLoading
            ? "Loading wines..."
            : `Show ${previewCount} wines →`}
        </button>
      </aside>
    </div>
  );
};