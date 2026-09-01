import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { useSearchParams } from "react-router";

import { analytics } from "@/shared/lib/analytics";

import recentSearchIcon from "@/assets/images/icons/recent-search.svg";
import searchIcon from "@/assets/images/icons/search.svg";

import { useSearchHistory } from "@/hooks/catalog";

import "./CatalogSearch.scss";

type Props = {
  isOpen: boolean;
  hasNoResults?: boolean;
  onClose: () => void;
};

const SEARCH_DEBOUNCE_MS = 400;
const SEARCH_ANALYTICS_DEBOUNCE_MS = 1200;

export const CatalogSearch = ({
  isOpen,
  hasNoResults = false,
  onClose,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const lastTrackedQueryRef = useRef("");

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    history,
    addSearchQuery,
    removeSearchQuery,
  } = useSearchHistory();

  const searchParam = searchParams.get("search") ?? "";

  const [searchQuery, setSearchQuery] = useState(searchParam);

  const normalizedQuery = searchQuery.trim();

  const shouldShowHistory =
    !normalizedQuery && history.length > 0;

  const shouldShowNoResults =
    Boolean(normalizedQuery && hasNoResults);

  useEffect(() => {
    setSearchQuery(searchParam);
  }, [searchParam]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener(
      "keydown",
      handleEscapeKey,
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscapeKey,
      );
    };
  }, [
    isOpen,
    handleClose,
  ]);

  const applySearch = useCallback(
    (query: string) => {
      const normalized = query.trim();

      const currentSearchParam =
        searchParams.get("search") ?? "";

      if (currentSearchParam === normalized) {
        return;
      }

      const nextParams =
        new URLSearchParams(searchParams);

      if (normalized) {
        nextParams.set("search", normalized);
      } else {
        nextParams.delete("search");
      }

      nextParams.delete("page");

      setSearchParams(nextParams);
    },
    [
      searchParams,
      setSearchParams,
    ],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      applySearch(normalizedQuery);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    isOpen,
    normalizedQuery,
    applySearch,
  ]);

  useEffect(() => {
    if (!isOpen || !normalizedQuery) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      if (
        lastTrackedQueryRef.current ===
        normalizedQuery
      ) {
        return;
      }

      lastTrackedQueryRef.current =
        normalizedQuery;

      analytics
        .searchStarted(normalizedQuery)
        .catch((error) => {
          console.error(
            "Failed to send SEARCH_STARTED analytics event:",
            error,
          );
        });
    }, SEARCH_ANALYTICS_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    isOpen,
    normalizedQuery,
  ]);

  const handleSubmit = useCallback(() => {
    if (!normalizedQuery) {
      return;
    }

    addSearchQuery(normalizedQuery);

    applySearch(normalizedQuery);
  }, [
    addSearchQuery,
    normalizedQuery,
    applySearch,
  ]);

  const handleHistoryClick = useCallback(
    (query: string) => {
      setSearchQuery(query);

      addSearchQuery(query);

      applySearch(query);
    },
    [
      addSearchQuery,
      applySearch,
    ],
  );

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={[
        "catalog-search",
        normalizedQuery
          ? "catalog-search--has-query"
          : "",
        shouldShowNoResults
          ? "catalog-search--no-results"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={handleClose}
    >
      <div className="container">
        <section
          className="catalog-search__panel"
          aria-label="Wine search"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="catalog-search__bar">
            <img
              className="catalog-search__search-icon"
              src={searchIcon}
              alt=""
              aria-hidden="true"
            />

            <input
              ref={inputRef}
              className="catalog-search__input"
              type="search"
              value={searchQuery}
              placeholder="Search wines..."
              autoComplete="off"
              onChange={(event) =>
                setSearchQuery(
                  event.target.value,
                )
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmit();
                }
              }}
            />

            <button
              className="catalog-search__action"
              type="button"
              onClick={handleClose}
              aria-label="Close search"
            >
              ×
            </button>
          </div>

          {shouldShowHistory && (
            <div className="catalog-search__dropdown">
              <h3 className="catalog-search__title">
                Recent searches
              </h3>

              <ul className="catalog-search__history-list">
                {history.map((query) => (
                  <li
                    className="catalog-search__history-item"
                    key={query}
                  >
                    <button
                      className="catalog-search__history-button"
                      type="button"
                      onClick={() =>
                        handleHistoryClick(
                          query,
                        )
                      }
                    >
                      <img
                        className="catalog-search__history-icon"
                        src={
                          recentSearchIcon
                        }
                        alt=""
                        aria-hidden="true"
                      />

                      <span>{query}</span>
                    </button>

                    <button
                      className="catalog-search__history-remove"
                      type="button"
                      onClick={() =>
                        removeSearchQuery(
                          query,
                        )
                      }
                      aria-label={`Remove ${query} from search history`}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {shouldShowNoResults && (
            <div className="catalog-search__dropdown catalog-search__dropdown--state">
              <p className="catalog-search__state-text">
                We couldn’t find wines
                matching{" "}
                <strong>
                  “{normalizedQuery}”
                </strong>
                . Try another name or change
                your filters.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};