import { useEffect, useRef, useState } from "react";

export const CATALOG_SORT_OPTIONS = [
  "Popularity",
  "Top Rated",
  "Alphabetical",
] as const;

export type CatalogSortOption = (typeof CATALOG_SORT_OPTIONS)[number];

type Props = {
  activeSort: CatalogSortOption;
  onSortSelect: (option: CatalogSortOption) => void;
  onOpenFilters: () => void;
};

export const CatalogControls = ({
  activeSort,
  onSortSelect,
  onOpenFilters,
}: Props) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement | null>(null);

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

  const handleSortSelect = (option: CatalogSortOption) => {
    onSortSelect(option);
    setIsSortOpen(false);
  };

  return (
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
            {CATALOG_SORT_OPTIONS.map((option) => (
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
        onClick={onOpenFilters}
      >
        <span />
        <span />
        <span />
        <span />
      </button>
    </div>
  );
};