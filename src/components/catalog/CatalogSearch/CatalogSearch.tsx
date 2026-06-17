import { useCallback, useEffect, useRef, useState } from "react";

import recentSearchIcon from "@/assets/images/icons/recent-search.svg";
import searchIcon from "@/assets/images/icons/search.svg";
import { useSearchHistory } from "@/hooks/catalog";

import "./CatalogSearch.scss";

type Props = {
  isOpen: boolean;
  isSearching?: boolean;
  hasNoResults?: boolean;
  onClose: () => void;
};

export const CatalogSearch = ({
  isOpen,
  isSearching = false,
  hasNoResults = false,
  onClose,
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { history, addSearchQuery, removeSearchQuery } = useSearchHistory();

  const [searchQuery, setSearchQuery] = useState("");

  const normalizedQuery = searchQuery.trim();
  const shouldShowHistory = !normalizedQuery && history.length > 0;
  const shouldShowNoResults = normalizedQuery && !isSearching && hasNoResults;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 120);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const handleSubmit = useCallback(() => {
    if (!normalizedQuery) {
      return;
    }

    addSearchQuery(normalizedQuery);

    // Later:
    // call backend search with normalizedQuery
  }, [addSearchQuery, normalizedQuery]);

  const handleHistoryClick = useCallback(
    (query: string) => {
      setSearchQuery(query);
      addSearchQuery(query);

      // Later:
      // call backend search with query
    },
    [addSearchQuery],
  );

  const handleClearInput = useCallback(() => {
    setSearchQuery("");
    inputRef.current?.focus();
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="catalog-search">
      <button
        className="catalog-search__backdrop"
        type="button"
        aria-label="Close search"
        onClick={onClose}
      />

      <section className="catalog-search__panel" aria-label="Wine search">
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
            type="text"
            value={searchQuery}
            placeholder="SEARCH WINES...."
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
              }
            }}
          />

          {searchQuery ? (
            <button
              className="catalog-search__action"
              type="button"
              onClick={handleClearInput}
              aria-label="Clear search"
            >
              ×
            </button>
          ) : (
            <button
              className="catalog-search__action"
              type="button"
              onClick={onClose}
              aria-label="Close search"
            >
              ×
            </button>
          )}
        </div>

        {(shouldShowHistory || isSearching || shouldShowNoResults) && (
          <div className="catalog-search__dropdown">
            {shouldShowHistory && (
              <>
                <h3 className="catalog-search__title">Recent searches</h3>

                <ul className="catalog-search__history-list">
                  {history.map((query) => (
                    <li className="catalog-search__history-item" key={query}>
                      <button
                        className="catalog-search__history-button"
                        type="button"
                        onClick={() => handleHistoryClick(query)}
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
                        onClick={() => removeSearchQuery(query)}
                        aria-label={`Remove ${query} from search history`}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {isSearching && (
              <div className="catalog-search__state">
                <p className="catalog-search__state-title">Searching...</p>
                <p className="catalog-search__state-text">
                  Looking for wines that match your request.
                </p>
              </div>
            )}

            {shouldShowNoResults && (
              <div className="catalog-search__state">
                <p className="catalog-search__state-title">No wines found</p>
                <p className="catalog-search__state-text">
                  We couldn’t find wines matching “{normalizedQuery}”. Try
                  another name or check the spelling.
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};