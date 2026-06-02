import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { getCategories } from "@/shared/api/categoryApi";
import { getCountries } from "@/shared/api/countryApi";
import { getWines } from "@/shared/api/wineApi";
import { filterWines } from "@/shared/api/wineFilterApi";
import { getFoods, type FoodPairing } from "@/shared/api/foodApi";

import type { Category } from "@/types/categories";
import type { CountryWine } from "@/types/countryWine";
import type { FilterGroup, FilterOption } from "@/types/filters";

import { useMoodTheme } from "../../context/MoodThemeContext";
import { arrowByMood } from "./config/filterArrows";
import { filterIcons } from "./config/filterIcons";
import { resetByMood } from "./config/filterResetIcons";

import arrowDown from "../../assets/images/filters/arrows/arrow-down.svg";

import "./CatalogFilters.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type SelectedFilters = Record<string, Set<string>>;

export const CatalogFilters = ({ isOpen, onClose }: Props) => {
  const { moodTheme } = useMoodTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const wineTypesParam = searchParams.get("wineTypes") || "";
  const countriesParam = searchParams.get("countries") || "";
  const foodTypesParam = searchParams.get("foodTypes") || "";

  const [categories, setCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<CountryWine[]>([]);
  const [foods, setFoods] = useState<FoodPairing[]>([]);

  const [openedFilter, setOpenedFilter] = useState("");

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    wineTypes: new Set(),
    countries: new Set(),
    foodTypes: new Set(),
  });

  const [previewCount, setPreviewCount] = useState(0);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);

  const moodArrowIcon = useMemo(
    () =>
      arrowByMood[moodTheme as keyof typeof arrowByMood] || arrowByMood.default,
    [moodTheme]
  );

  const resetIcon = useMemo(
    () =>
      resetByMood[moodTheme as keyof typeof resetByMood] || resetByMood.default,
    [moodTheme]
  );

  const formatLabel = (value: string) =>
    value
      .toLowerCase()
      .split("_")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");

  const filterGroups: FilterGroup[] = useMemo(
    () => [
      {
        id: "wineTypes",
        title: "Wine Type",
        options: categories.map((category) => ({
          id: category.id,
          label: category.title,
          value: category.type,
        })),
      },
      {
        id: "countries",
        title: "Countries",
        options: countries.map((country) => ({
          id: country.id,
          label: country.name,
          value: country.name,
        })),
      },
      {
        id: "foodTypes",
        title: "Food Pairing",
        options: foods.map((food) => ({
          id: food.id,
          label: formatLabel(food.foodType),
          value: food.foodType,
        })),
      },
    ],
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
      wineTypes: new Set(wineTypesParam ? wineTypesParam.split(",") : []),
      countries: new Set(countriesParam ? countriesParam.split(",") : []),
      foodTypes: new Set(foodTypesParam ? foodTypesParam.split(",") : []),
    });
  }, [wineTypesParam, countriesParam, foodTypesParam]);

  useEffect(() => {
    let isMounted = true;

    const loadPreviewCount = async () => {
      try {
        setIsPreviewLoading(true);

        const wineTypes = Array.from(selectedFilters.wineTypes);
        const countries = Array.from(selectedFilters.countries);
        const foodTypes = Array.from(selectedFilters.foodTypes);

        const hasFilters =
          wineTypes.length || countries.length || foodTypes.length;

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
    };

    loadPreviewCount();

    return () => {
      isMounted = false;
    };
  }, [selectedFilters]);

  const handleClose = () => {
    setOpenedFilter("");
    onClose();
  };

  const toggleFilter = (id: string) => {
    setOpenedFilter((prev) => (prev === id ? "" : id));
  };

  const toggleOption = (filterId: string, value: string) => {
    setSelectedFilters((prev) => {
      const nextSet = new Set(prev[filterId] || []);

      if (nextSet.has(value)) {
        nextSet.delete(value);
      } else {
        nextSet.add(value);
      }

      return {
        ...prev,
        [filterId]: nextSet,
      };
    });
  };

  const resetFilters = () => {
    setSelectedFilters({
      wineTypes: new Set(),
      countries: new Set(),
      foodTypes: new Set(),
    });

    setOpenedFilter("");
    navigate("/catalog");
  };

  const handleShowWines = () => {
    const params = new URLSearchParams();

    Object.entries(selectedFilters).forEach(([filterId, values]) => {
      const selectedValues = Array.from(values);

      if (selectedValues.length) {
        params.set(filterId, selectedValues.join(","));
      }
    });

    const query = params.toString();

    navigate(query ? `/catalog?${query}` : "/catalog");
    onClose();
  };

  const renderOption = (filterId: string, option: FilterOption) => {
    const isSelected = selectedFilters[filterId]?.has(option.value);

    return (
      <button
        key={option.id}
        type="button"
        className={`catalog-filters__option ${
          isSelected ? "catalog-filters__option--active" : ""
        }`}
        onClick={() => toggleOption(filterId, option.value)}
      >
        <span className="catalog-filters__checkbox">{isSelected && "✓"}</span>

        <span className="catalog-filters__option-name">{option.label}</span>
      </button>
    );
  };

  const renderFilterGroup = (filter: FilterGroup) => {
    const isExpanded = openedFilter === filter.id;
    const filterIcon = filterIcons[filter.id as keyof typeof filterIcons];

    return (
      <div className="catalog-filters__group" key={filter.id}>
        <button
          className="catalog-filters__group-header"
          type="button"
          aria-expanded={isExpanded}
          onClick={() => toggleFilter(filter.id)}
        >
          <span className="catalog-filters__group-left">
            {filterIcon && (
              <img src={filterIcon} alt="" className="catalog-filters__icon" />
            )}

            <span>{filter.title}</span>
          </span>

          <img
            className={`catalog-filters__arrow ${
              isExpanded ? "catalog-filters__arrow--open" : ""
            }`}
            src={isExpanded ? moodArrowIcon : arrowDown}
            alt=""
          />
        </button>

        <div
          className={`catalog-filters__options ${
            isExpanded ? "catalog-filters__options--open" : ""
          }`}
        >
          {filter.options.map((option) => renderOption(filter.id, option))}
        </div>
      </div>
    );
  };

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
          {filterGroups.map(renderFilterGroup)}
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
