import { useMemo, useState } from "react";
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
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(
    () => new Set(["Italy"]),
  );

  const moodArrowIcon = useMemo(
    () =>
      arrowByMood[moodTheme as keyof typeof arrowByMood] ||
      arrowByMood.default,
    [moodTheme],
  );

  const resetIcon = useMemo(
    () =>
      resetByMood[moodTheme as keyof typeof resetByMood] ||
      resetByMood.default,
    [moodTheme],
  );

  const handleClose = () => {
    setOpenedFilter("");
    setOpenedSubFilter("");
    onClose();
  };

  const toggleFilter = (id: string) => {
    setOpenedSubFilter("");
    setOpenedFilter((prev) => (prev === id ? "" : id));
  };

  const toggleSubFilter = (title: string) => {
    setOpenedSubFilter((prev) => (prev === title ? "" : title));
  };

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) => {
      const next = new Set(prev);

      if (next.has(option)) {
        next.delete(option);
      } else {
        next.add(option);
      }

      return next;
    });
  };

  const resetFilters = () => {
    setSelectedOptions(new Set());
    setOpenedFilter("");
    setOpenedSubFilter("");
  };

  const renderOption = (option: string) => {
    const isSelected = selectedOptions.has(option);

    return (
      <button
        key={option}
        type="button"
        className={`catalog-filters__option ${
          isSelected ? "catalog-filters__option--active" : ""
        }`}
        onClick={() => toggleOption(option)}
      >
        <span className="catalog-filters__checkbox">
          {isSelected && "✓"}
        </span>

        <span className="catalog-filters__option-name">{option}</span>
      </button>
    );
  };

  return (
    <div
      className={`catalog-filters ${
        isOpen ? "catalog-filters--open" : ""
      }`}
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
                  aria-expanded={isExpanded}
                  onClick={() => toggleFilter(filter.id)}
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
                  {"groups" in filter && filter.groups
                    ? filter.groups.map((group) => {
                        const isSubExpanded =
                          openedSubFilter === group.title;

                        return (
                          <div
                            className="catalog-filters__subgroup"
                            key={group.title}
                          >
                            <button
                              type="button"
                              className="catalog-filters__subgroup-header"
                              aria-expanded={isSubExpanded}
                              onClick={() => toggleSubFilter(group.title)}
                            >
                              <span>{group.title}</span>

                              <img
                                className={`catalog-filters__sub-arrow ${
                                  isSubExpanded
                                    ? "catalog-filters__sub-arrow--open"
                                    : ""
                                }`}
                                src={
                                  isSubExpanded ? moodArrowIcon : arrowDown
                                }
                                alt=""
                              />
                            </button>

                            <div
                              className={`catalog-filters__sub-options ${
                                isSubExpanded
                                  ? "catalog-filters__sub-options--open"
                                  : ""
                              }`}
                            >
                              {group.options.map(renderOption)}
                            </div>
                          </div>
                        );
                      })
                    : filter.options?.map(renderOption)}
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