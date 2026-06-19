import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getMetadata } from "@/shared/api/metadataApi";
import { filterWines, type WineFilterRequest } from "@/shared/api/wineFilterApi";

import { useMoodTheme } from "@/context/MoodThemeContext";

import type { MetadataFilter } from "@/types/metadata";

import { arrowByMood } from "./config/filterArrows";
import { resetByMood } from "./config/filterResetIcons";
import { buildFilterGroups } from "./config/buildFilterGroups";

import { CatalogFilterGroup } from "./sections/CatalogFilterGroup";

import "./CatalogFilters.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type SelectedFilters = Record<string, string[]>;

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
] as const;

const buildSelectedFiltersFromUrl = (
  searchParams: URLSearchParams,
): SelectedFilters => {
  return FILTER_PARAM_KEYS.reduce<SelectedFilters>((acc, key) => {
    const param = searchParams.get(key) || "";

    acc[key] = param ? param.split(",") : [];

    return acc;
  }, {});
};

const buildWineFilters = (
  selectedFilters: SelectedFilters,
): WineFilterRequest => {
  const filters: WineFilterRequest = {};

  Object.entries(selectedFilters).forEach(([key, values]) => {
    if (values.length > 0) {
      filters[key as keyof WineFilterRequest] = values;
    }
  });

  return filters;
};

export const CatalogFilters = ({ isOpen, onClose }: Props) => {
  const { moodTheme } = useMoodTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const previewDebounceRef = useRef<number | null>(null);

  const [metadataFilters, setMetadataFilters] = useState<MetadataFilter[]>([]);
  const [openedFilter, setOpenedFilter] = useState("");

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(() =>
    buildSelectedFiltersFromUrl(searchParams),
  );

  const [previewCount, setPreviewCount] = useState(0);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const moodArrowIcon =
    arrowByMood[moodTheme as keyof typeof arrowByMood] || arrowByMood.default;

  const resetIcon =
    resetByMood[moodTheme as keyof typeof resetByMood] || resetByMood.default;

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
        console.error("Failed to load metadata filters:", error);
      }
    };

    loadMetadata();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setSelectedFilters(buildSelectedFiltersFromUrl(searchParams));
  }, [searchParams]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let isMounted = true;

    if (previewDebounceRef.current) {
      clearTimeout(previewDebounceRef.current);
    }

    previewDebounceRef.current = window.setTimeout(async () => {
      try {
        setIsPreviewLoading(true);

        const response = await filterWines({
          filters: buildWineFilters(selectedFilters),
          page: PREVIEW_PAGE,
          size: PREVIEW_PAGE_SIZE,
        });

        if (isMounted) {
          setPreviewCount(response.meta.totalElements);
        }
      } catch (error) {
        console.error("Failed to load preview count:", error);

        if (isMounted) {
          setPreviewCount(0);
        }
      } finally {
        if (isMounted) {
          setIsPreviewLoading(false);
        }
      }
    }, 350);

    return () => {
      isMounted = false;

      if (previewDebounceRef.current) {
        clearTimeout(previewDebounceRef.current);
      }
    };
  }, [isOpen, selectedFilters]);

  const handleClose = useCallback(() => {
    setOpenedFilter("");
    onClose();
  }, [onClose]);

  const toggleFilter = useCallback((id: string) => {
    setOpenedFilter((prev) => (prev === id ? "" : id));
  }, []);

  const toggleOption = useCallback((filterId: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[filterId] || [];
      const isSelected = currentValues.includes(value);

      return {
        ...prev,
        [filterId]: isSelected
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedFilters({});

    setOpenedFilter("");
    navigate("/catalog");
  }, [navigate]);

  const handleShowWines = useCallback(() => {
    const params = new URLSearchParams();

    Object.entries(selectedFilters).forEach(([filterId, values]) => {
      if (values.length) {
        params.set(filterId, values.join(","));
      }
    });

    params.delete("page");

    const query = params.toString();

    navigate(query ? `/catalog?${query}` : "/catalog");
    onClose();
  }, [navigate, onClose, selectedFilters]);

  return (
    <div className={`catalog-filters ${isOpen ? "catalog-filters--open" : ""}`}>
      <button
        className="catalog-filters__backdrop"
        type="button"
        aria-label="Close filters"
        onClick={handleClose}
      />

      <aside className="catalog-filters__panel">
        <div className="catalog-filters__header">
          <div className="catalog-filters__header-left">
            <h2 className="catalog-filters__title">Filters</h2>

            <button
              className="catalog-filters__reset"
              type="button"
              onClick={resetFilters}
            >
              Reset all
              <img
                src={resetIcon}
                alt="Reset filters"
                className="catalog-filters__reset-icon"
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
              moodArrowIcon={moodArrowIcon}
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