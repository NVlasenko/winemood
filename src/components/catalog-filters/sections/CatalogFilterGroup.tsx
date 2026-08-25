import { memo } from "react";

import ArrowDownIcon from "@/assets/images/filters/arrows/arrow-default.svg?react";

import type { FilterGroup, FilterOption, WineArrayFilterKey } from "@/types/filters";


type Props = {
  filter: FilterGroup;
  openedFilter: string;
  selectedFilters: Record<string, string[]>;
  onToggleFilter: (id: string) => void;
  onToggleOption: (
    filterId: WineArrayFilterKey,
    value: string,
  ) => void;
};

type FilterOptionButtonProps = {
  filterId: WineArrayFilterKey;
  option: FilterOption;
  isSelected: boolean;
  onToggleOption: (
    filterId: WineArrayFilterKey,
    value: string,
  ) => void;
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
      <span className="catalog-filters__checkbox">
        {isSelected && "✓"}
      </span>

      <span className="catalog-filters__option-name">
        {option.label}
      </span>
    </button>
  );
};

export const CatalogFilterGroup = memo(
  ({
    filter,
    openedFilter,
    selectedFilters,
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

          <ArrowDownIcon
            className={`catalog-filters__arrow ${
              isExpanded ? "catalog-filters__arrow--open" : ""
            }`}
            aria-hidden="true"
            focusable="false"
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
                filterId={filter.id as WineArrayFilterKey}
                option={option}
                isSelected={isSelected}
                onToggleOption={onToggleOption}
              />
            );
          })}

          {filter.subgroups?.map((subgroup) => (
            <div
              className="catalog-filters__subgroup"
              key={subgroup.id}
            >
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