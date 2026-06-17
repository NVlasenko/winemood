import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getCategories } from "@/shared/api/categoryApi";
import { getCountries } from "@/shared/api/countryApi";
import { getWines } from "@/shared/api/wineApi";
import { filterWines } from "@/shared/api/wineFilterApi";
import { getFoods, type FoodPairing } from "@/shared/api/foodApi";

import { arrowByMood } from "./config/filterArrows";
import { resetByMood } from "./config/filterResetIcons";
import { buildFilterGroups } from "./config/buildFilterGroups";

import type { Category } from "@/types/categories";
import type { CountryWine } from "@/types/countryWine";

import { useMoodTheme } from "@/context/MoodThemeContext";

import { CatalogFilterGroup } from "./sections/CatalogFilterGroup";
import "./CatalogFilters.scss";


type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type SelectedFilters = Record<string, string[]>;

export const CatalogFilters = ({ isOpen, onClose }: Props) => {
  const { moodTheme } = useMoodTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const previewDebounceRef = useRef<number | null>(null);
  const wineTypesParam = searchParams.get("wineTypes") || "";
  const countriesParam = searchParams.get("countries") || "";
  const foodTypesParam = searchParams.get("foodTypes") || "";

  const [categories, setCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<CountryWine[]>([]);
  const [foods, setFoods] = useState<FoodPairing[]>([]);

  const [openedFilter, setOpenedFilter] = useState("");

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    wineTypes: [],
    countries: [],
    foodTypes: [],
  });

  const [previewCount, setPreviewCount] = useState(0);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const moodArrowIcon =
    arrowByMood[moodTheme as keyof typeof arrowByMood] || arrowByMood.default;

  const resetIcon =
    resetByMood[moodTheme as keyof typeof resetByMood] || resetByMood.default;

    const filterGroups = useMemo(
      () =>
        buildFilterGroups({
          categories,
          countries,
          foods,
        }),
      [categories, countries, foods]
    );

  useEffect(() => {
    let isMounted = true;
  
    const loadFiltersData = async () => {
      try {
        const [categoriesData, countriesData, foodsData] = await Promise.all([
          getCategories(),
          getCountries(),
          getFoods(),
        ]);
  
        if (isMounted) {
          setCategories(categoriesData);
          setCountries(countriesData);
          setFoods(foodsData);
        }
      } catch (error) {
        console.error("Failed to load filters data:", error);
      }
    };
  
    loadFiltersData();
  
    return () => {
      isMounted = false;
    };
  }, []);


  useEffect(() => {
    setSelectedFilters({
      wineTypes: wineTypesParam ? wineTypesParam.split(",") : [],
      countries: countriesParam ? countriesParam.split(",") : [],
      foodTypes: foodTypesParam ? foodTypesParam.split(",") : [],
    });
  }, [wineTypesParam, countriesParam, foodTypesParam]);

  useEffect(() => {
    let isMounted = true;
  
    if (previewDebounceRef.current) {
      clearTimeout(previewDebounceRef.current);
    }
  
    previewDebounceRef.current = window.setTimeout(async () => {
      try {
        setIsPreviewLoading(true);
  
        const { wineTypes, countries, foodTypes } = selectedFilters;
  
        const hasFilters =
          wineTypes.length ||
          countries.length ||
          foodTypes.length;
  
        const data = hasFilters
          ? await filterWines({
              wineTypes,
              countries,
              foodTypes,
            })
          : await getWines();
  
        if (isMounted) {
          setPreviewCount(Array.isArray(data) ? data.length : 0);
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
  }, [selectedFilters]);

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
    setSelectedFilters({
      wineTypes: [],
      countries: [],
      foodTypes: [],
    });
  
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
