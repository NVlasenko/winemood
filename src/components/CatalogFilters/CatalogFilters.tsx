import { useState } from "react";
import { useMoodTheme } from "../../context/MoodThemeContext";
import { arrowByMood } from "./config/filterArrows";
import { filterIcons } from "./config/filterIcons";
import { resetByMood } from "./config/filterResetIcons";
import { filters } from "./config/filtersData";
import arrowDown from "../../assets/images/filters/arrows/arrow-down.svg";
import "./CatalogFilters.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CatalogFilters = ({ isOpen, onClose }: Props) => {
  const { moodTheme } = useMoodTheme();
  const [openedFilter, setOpenedFilter] = useState("");
  const [openedSubFilter, setOpenedSubFilter] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["Italy"]);

  const moodArrowIcon =
    arrowByMood[moodTheme as keyof typeof arrowByMood] || arrowByMood.default;

  const resetIcon =
    resetByMood[moodTheme as keyof typeof resetByMood] || resetByMood.default;

  const handleClose = () => {
    setOpenedFilter("");
    setOpenedSubFilter("");
    onClose();
  };

  const toggleFilter = (id: string) => {
    setOpenedFilter((prev) => {
      const nextFilter = prev === id ? "" : id;

      setOpenedSubFilter("");

      return nextFilter;
    });
  };

  const toggleSubFilter = (title: string) => {
    setOpenedSubFilter((prev) => (prev === title ? "" : title));
  };

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  const resetFilters = () => {
    setSelectedOptions([]);
    setOpenedFilter("");
    setOpenedSubFilter("");
  };

  return (
    <div
      className={
        isOpen
          ? "catalog-filters catalog-filters--open"
          : "catalog-filters"
      }
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
          {filters.map((filter) => {
            const isExpanded = openedFilter === filter.id;
            const filterIcon =
              filterIcons[filter.id as keyof typeof filterIcons];

            return (
              <div className="catalog-filters__group" key={filter.id}>
                <button
                  className="catalog-filters__group-header"
                  type="button"
                  onClick={() => toggleFilter(filter.id)}
                >
                  <span className="catalog-filters__group-left">
                    {filterIcon && (
                      <img
                        src={filterIcon}
                        alt={filter.title}
                        className="catalog-filters__icon"
                      />
                    )}

                    <span>{filter.title}</span>
                  </span>

                  <img
                    className={
                      isExpanded
                        ? "catalog-filters__arrow catalog-filters__arrow--open"
                        : "catalog-filters__arrow"
                    }
                    src={isExpanded ? moodArrowIcon : arrowDown}
                    alt=""
                  />
                </button>

                <div
                  className={
                    isExpanded
                      ? "catalog-filters__options catalog-filters__options--open"
                      : "catalog-filters__options"
                  }
                >
                  {"groups" in filter && filter.groups ? (
                    filter.groups.map((group) => {
                      const isSubExpanded = openedSubFilter === group.title;

                      return (
                        <div
                          className="catalog-filters__subgroup"
                          key={group.title}
                        >
                          <button
                            type="button"
                            className="catalog-filters__subgroup-header"
                            onClick={() => toggleSubFilter(group.title)}
                          >
                            <span>{group.title}</span>

                            <img
                              className={
                                isSubExpanded
                                  ? "catalog-filters__sub-arrow catalog-filters__sub-arrow--open"
                                  : "catalog-filters__sub-arrow"
                              }
                              src={isSubExpanded ? moodArrowIcon : arrowDown}
                              alt=""
                            />
                          </button>

                          <div
                            className={
                              isSubExpanded
                                ? "catalog-filters__sub-options catalog-filters__sub-options--open"
                                : "catalog-filters__sub-options"
                            }
                          >
                            {group.options.map((option) => {
                              const isSelected =
                                selectedOptions.includes(option);

                              return (
                                <button
                                  key={option}
                                  type="button"
                                  className={
                                    isSelected
                                      ? "catalog-filters__option catalog-filters__option--active"
                                      : "catalog-filters__option"
                                  }
                                  onClick={() => toggleOption(option)}
                                >
                                  <span className="catalog-filters__checkbox">
                                    {isSelected && "✓"}
                                  </span>

                                  <span className="catalog-filters__option-name">
                                    {option}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    filter.options?.map((option) => {
                      const isSelected = selectedOptions.includes(option);

                      return (
                        <button
                          key={option}
                          type="button"
                          className={
                            isSelected
                              ? "catalog-filters__option catalog-filters__option--active"
                              : "catalog-filters__option"
                          }
                          onClick={() => toggleOption(option)}
                        >
                          <span className="catalog-filters__checkbox">
                            {isSelected && "✓"}
                          </span>

                          <span className="catalog-filters__option-name">
                            {option}
                          </span>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          className="button-primary catalog-filters__show-button"
          type="button"
        >
          Show 42 wines →
        </button>
      </aside>
    </div>
  );
};