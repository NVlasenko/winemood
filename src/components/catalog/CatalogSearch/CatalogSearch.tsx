import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

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

export const CatalogSearch = ({
  isOpen,
  hasNoResults = false,
  onClose,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

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
  
    document.addEventListener("keydown", handleEscapeKey);
  
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const currentSearchParam =
        searchParams.get("search") ?? "";

      if (currentSearchParam === normalizedQuery) {
        return;
      }

      const nextParams = new URLSearchParams(searchParams);

      if (normalizedQuery) {
        nextParams.set("search", normalizedQuery);
      } else {
        nextParams.delete("search");
      }

      nextParams.delete("page");

      setSearchParams(nextParams);
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    isOpen,
    normalizedQuery,
    searchParams,
    setSearchParams,
  ]);

  const handleSubmit = useCallback(() => {
    if (!normalizedQuery) {
      return;
    }

    addSearchQuery(normalizedQuery);

    const nextParams = new URLSearchParams(searchParams);

    nextParams.set("search", normalizedQuery);
    nextParams.delete("page");

    setSearchParams(nextParams);
  }, [
    addSearchQuery,
    normalizedQuery,
    searchParams,
    setSearchParams,
  ]);

  const handleHistoryClick = useCallback(
    (query: string) => {
      setSearchQuery(query);
      addSearchQuery(query);

      const nextParams = new URLSearchParams(searchParams);

      nextParams.set("search", query);
      nextParams.delete("page");

      setSearchParams(nextParams);
    },
    [
      addSearchQuery,
      searchParams,
      setSearchParams,
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
    >

      <div className="container">
         <section
        className="catalog-search__panel"
        aria-label="Wine search"
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
              setSearchQuery(event.target.value)
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
                      handleHistoryClick(query)
                    }
                  >
                    <img
                      className="catalog-search__history-icon"
                      src={recentSearchIcon}
                      alt=""
                      aria-hidden="true"
                    />

                    <span>{query}</span>
                  </button>

                  <button
                    className="catalog-search__history-remove"
                    type="button"
                    onClick={() =>
                      removeSearchQuery(query)
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
              We couldn’t find wines matching
              {" "}
              <strong>“{normalizedQuery}”</strong>.
              Try another name or change your filters.
            </p>
          </div>
        )}
      </section> 
      </div>
    
    </div>
   
  );
};