import { memo } from "react";

import arrowDown from "@/assets/images/filters/arrows/arrow-down.svg";

import type { FilterGroup, FilterOption } from "@/types/filters";

type Props = {
  filter: FilterGroup;
  openedFilter: string;
  selectedFilters: Record<string, string[]>;
  moodArrowIcon: string;
  onToggleFilter: (id: string) => void;
  onToggleOption: (filterId: string, value: string) => void;
};

type FilterOptionButtonProps = {
  filterId: string;
  option: FilterOption;
  isSelected: boolean;
  onToggleOption: (filterId: string, value: string) => void;
};

const FilterOptionButton = ({
  filterId,
  option,
  isSelected,
  onToggleOption,
}: FilterOptionButtonProps) => {
  return (
    <button
      type="button"
      className={`catalog-filters__option ${
        isSelected ? "catalog-filters__option--active" : ""
      }`}
      onClick={() => onToggleOption(filterId, option.value)}
    >
      <span className="catalog-filters__checkbox">{isSelected && "✓"}</span>

      <span className="catalog-filters__option-name">{option.label}</span>
    </button>
  );
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

    return (
      <div className="catalog-filters__group">
        <button
          className="catalog-filters__group-header"
          type="button"
          aria-expanded={isExpanded}
          onClick={() => onToggleFilter(filter.id)}
        >
          <span className="catalog-filters__group-left">
            {filter.iconUrl && (
              <img
                src={filter.iconUrl}
                alt=""
                className="catalog-filters__icon"
                aria-hidden="true"
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
            aria-hidden="true"
          />
        </button>

        <div
          className={`catalog-filters__options ${
            isExpanded ? "catalog-filters__options--open" : ""
          }`}
        >
          {filter.options?.map((option) => {
            const isSelected =
              selectedFilters[filter.id]?.includes(option.value) ?? false;

            return (
              <FilterOptionButton
                key={option.id}
                filterId={filter.id}
                option={option}
                isSelected={isSelected}
                onToggleOption={onToggleOption}
              />
            );
          })}

          {filter.subgroups?.map((subgroup) => (
            <div className="catalog-filters__subgroup" key={subgroup.id}>
              <h4 className="catalog-filters__subgroup-title">
                {subgroup.title}
              </h4>

              <div className="catalog-filters__subgroup-options">
                {subgroup.options.map((option) => {
                  const isSelected =
                    selectedFilters[subgroup.filterId]?.includes(
                      option.value,
                    ) ?? false;

                  return (
                    <FilterOptionButton
                      key={option.id}
                      filterId={subgroup.filterId}
                      option={option}
                      isSelected={isSelected}
                      onToggleOption={onToggleOption}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);

CatalogFilterGroup.displayName = "CatalogFilterGroup";