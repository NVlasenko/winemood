import { memo } from "react";
import arrowDown from "@/assets/images/filters/arrows/arrow-down.svg";
import type { FilterGroup } from "@/types/filters";
import { filterIcons } from "../config/filterIcons";

type Props = {
  filter: FilterGroup;
  openedFilter: string;
  selectedFilters: Record<string, string[]>;
  moodArrowIcon: string;
  onToggleFilter: (id: string) => void;
  onToggleOption: (filterId: string, value: string) => void;
};

export const CatalogFilterGroup = memo(
  ({
    filter,
    openedFilter,
    selectedFilters,
    moodArrowIcon,
    onToggleFilter,
    onToggleOption,
  }: Props) => {
    const isExpanded = openedFilter === filter.id;
    const filterIcon = filterIcons[filter.id as keyof typeof filterIcons];

    return (
      <div className="catalog-filters__group">
        <button
          className="catalog-filters__group-header"
          type="button"
          aria-expanded={isExpanded}
          onClick={() => onToggleFilter(filter.id)}
        >
          <span className="catalog-filters__group-left">
            {filterIcon && (
              <img
                src={filterIcon}
                alt=""
                className="catalog-filters__icon"
              />
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
          {filter.options.map((option) => {
            const isSelected = selectedFilters[filter.id]?.includes(
              option.value
            );

            return (
              <button
                key={option.id}
                type="button"
                className={`catalog-filters__option ${
                  isSelected ? "catalog-filters__option--active" : ""
                }`}
                onClick={() => onToggleOption(filter.id, option.value)}
              >
                <span className="catalog-filters__checkbox">
                  {isSelected && "✓"}
                </span>

                <span className="catalog-filters__option-name">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

CatalogFilterGroup.displayName = "CatalogFilterGroup";