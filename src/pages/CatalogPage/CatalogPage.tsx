import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import wineDropIcon from "../../assets/images/wine/sweet.svg";
import bottleIcon from "../../assets/images/wine/bottle.svg";

import { SectionTitle } from "../../components/SectionTitle";
import { CatalogFilters } from "../../components/CatalogFilters/CatalogFilters";

import { useFavorites } from "../../context/FavoritesContext";

import { getWines } from "@/shared/api/wineApi";

import "./CatalogPage.scss";
import { filterWines } from "@/shared/api/wineFilterApi";
import type { WineCatalogCard } from "@/types/wineCatalogCard";
import { WineGlassLoader } from "@/components/WineCard/components/WineGlassLoader";

const SORT_OPTIONS = ["Popularity", "Top Rated", "Alphabetical"] as const;
const STARS = [1, 2, 3, 4, 5];

type SortOption = (typeof SORT_OPTIONS)[number];

export const CatalogPage = () => {
  const [activeSort, setActiveSort] = useState<SortOption>("Popularity");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [wines, setWines] = useState<WineCatalogCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { favorites, toggleFavorite } = useFavorites();

  const sortRef = useRef<HTMLDivElement | null>(null);
  const [searchParams] = useSearchParams();

  const wineTypesParam = searchParams.get("wineTypes") || "";
  const countriesParam = searchParams.get("countries") || "";

  const wineTypesFromUrl = wineTypesParam ? wineTypesParam.split(",") : [];

  const countriesFromUrl = countriesParam ? countriesParam.split(",") : [];
  const favoriteIds = useMemo(() => new Set(favorites), [favorites]);

  const visibleWines = useMemo(() => {
    switch (activeSort) {
      case "Top Rated":
        return [...wines].sort((a, b) => b.rating - a.rating);

      case "Alphabetical":
        return [...wines].sort((a, b) => a.name.localeCompare(b.name));

      case "Popularity":
      default:
        return wines;
    }
  }, [wines, activeSort]);

  const hasNoResults = !visibleWines.length;

  const handleOpenFilters = () => {
    setIsFiltersOpen(true);
  };

  const handleCloseFilters = () => {
    setIsFiltersOpen(false);
  };

  const handleSortSelect = (option: SortOption) => {
    setActiveSort(option);
    setIsSortOpen(false);
  };

  const renderRating = (rating: number) => (
    <div
      className="catalog-page__rating"
      aria-label={`Rating ${rating} out of 5`}
    >
      <div className="catalog-page__stars">
        {STARS.map((star) => {
          const fillPercent =
            Math.min(Math.max(rating - (star - 1), 0), 1) * 100;

          return (
            <span className="catalog-page__star" key={star} aria-hidden="true">
              <span className="catalog-page__star-bg">★</span>

              <span
                className="catalog-page__star-fill"
                style={{ width: `${fillPercent}%` }}
              >
                ★
              </span>
            </span>
          );
        })}
      </div>

      <span>{rating}</span>
    </div>
  );

  const renderLoader = () => (
    <div className="catalog-page__loader-wrapper">
      <div className="catalog-page__loader-glow" />
      <WineGlassLoader />
    </div>
  );

  const renderError = () => (
    <div className="catalog-page__empty">
      <div className="catalog-page__empty-glow" />

      <h3 className="catalog-page__empty-title">Failed to load wines</h3>

      <p className="catalog-page__empty-text">{error}</p>
    </div>
  );

  const renderEmptyState = () => (
    <div className="catalog-page__empty">
      <div className="catalog-page__empty-glow" />

      <h3 className="catalog-page__empty-title">No wines found</h3>

      <p className="catalog-page__empty-text">
        Try changing filters or reset your selection.
      </p>

      <button
        type="button"
        className="button-primary catalog-page__empty-button"
        onClick={handleOpenFilters}
      >
        Change filters
      </button>
    </div>
  );

  const renderPagination = () => (
    <div className="catalog-page__pagination">
      <button className="catalog-page__pagination-arrow" type="button">
        ‹
      </button>

      <button
        className="catalog-page__pagination-item catalog-page__pagination-item--active"
        type="button"
      >
        1
      </button>

      <button className="catalog-page__pagination-item" type="button">
        2
      </button>

      <button className="catalog-page__pagination-item" type="button">
        3
      </button>

      <span className="catalog-page__pagination-dots">...</span>

      <button className="catalog-page__pagination-item" type="button">
        12
      </button>

      <button className="catalog-page__pagination-arrow" type="button">
        ›
      </button>
    </div>
  );

  const renderWineCard = (wine: WineCatalogCard) => {
    const isFavorite = favoriteIds.has(wine.id);

    return (
      <article className="catalog-page__card" key={wine.id}>
        <button
          className={`catalog-page__favorite ${
            isFavorite ? "catalog-page__favorite--active" : ""
          }`}
          type="button"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          aria-pressed={isFavorite}
          onClick={() => toggleFavorite(wine.id)}
        >
          ♥
        </button>

        <Link to={`/catalog/${wine.id}`} className="catalog-page__image-link">
          <span className="catalog-page__wine-glow" aria-hidden="true" />

          <img
            className="catalog-page__image"
            src={wine.imageUrl}
            alt={wine.name}
          />
        </Link>

        <div className="catalog-page__info">
          <p className="catalog-page__country">{wine.countryName}</p>

          <h3 className="catalog-page__name">{wine.name}</h3>

          {renderRating(wine.rating)}

          <div className="catalog-page__meta">
            <div className="catalog-page__meta-item">
              <img src={wineDropIcon} alt="" aria-hidden="true" />
              <span>{wine.sweetnessLevel.replace("_", " ")}</span>
            </div>

            <div className="catalog-page__meta-item">
              <img src={bottleIcon} alt="" aria-hidden="true" />
              <span>{wine.volumeMl} ml</span>
            </div>
          </div>
        </div>
      </article>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return renderLoader();
    }

    if (error) {
      return renderError();
    }

    if (hasNoResults) {
      return renderEmptyState();
    }

    return (
      <>
        <div className="catalog-page__grid">
          {visibleWines.map(renderWineCard)}
        </div>

        {renderPagination()}
      </>
    );
  };

  useEffect(() => {
    let isMounted = true;

    const loadWines = async () => {
      try {
        setIsLoading(true);
        setError("");

        const hasFilters = wineTypesFromUrl.length || countriesFromUrl.length;

        const data = hasFilters
          ? await filterWines({
              wineTypes: wineTypesFromUrl,
              countries: countriesFromUrl,
            })
          : await getWines();

        if (!Array.isArray(data)) {
          throw new Error("Invalid wines data");
        }

        if (isMounted) {
          setWines(data);
        }
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error("Failed to load wines", error);

        if (error instanceof TypeError) {
          setError("Network error. Please check your internet connection.");
          return;
        }

        if (error instanceof Error) {
          setError(error.message);
          return;
        }

        setError("Something went wrong.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadWines();

    return () => {
      isMounted = false;
    };
  }, [wineTypesParam, countriesParam]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main className="catalog-page">
      <div className="container">
        <SectionTitle title="Catalog" />

        <div className="catalog-page__controls">
          <p className="catalog-page__sort-label">Sort by</p>

          <div className="catalog-page__sort" ref={sortRef}>
            <button
              className="button-primary catalog-page__sort-button"
              type="button"
              aria-expanded={isSortOpen}
              onClick={() => setIsSortOpen((prev) => !prev)}
            >
              {activeSort}
            </button>

            {isSortOpen && (
              <div className="catalog-page__sort-menu">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`catalog-page__sort-item ${
                      option === activeSort
                        ? "catalog-page__sort-item--active"
                        : ""
                    }`}
                    onClick={() => handleSortSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className="catalog-page__filter-button"
            type="button"
            aria-label="Open filters"
            onClick={handleOpenFilters}
          >
            <span />
            <span />
            <span />
            <span />
          </button>
        </div>

        {renderContent()}
      </div>

      <CatalogFilters isOpen={isFiltersOpen} onClose={handleCloseFilters} />
    </main>
  );
};
