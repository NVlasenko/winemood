import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import wineDropIcon from "../../assets/images/wine/sweet.svg";
import bottleIcon from "../../assets/images/wine/bottle.svg";
import { SectionTitle } from "../../components/SectionTitle";
import { wines } from "../../data/wines";

import "./CatalogPage.scss";

const sortOptions = ["Popularity", "Top Rated", "Alphabetical"];

export const CatalogPage = () => {
  const [activeSort, setActiveSort] = useState("Popularity");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

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
              className="catalog-page__sort-button"
              type="button"
              onClick={() => setIsSortOpen((prev) => !prev)}
            >
              {activeSort}
            </button>

            {isSortOpen && (
              <div className="catalog-page__sort-menu">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={
                      option === activeSort
                        ? "catalog-page__sort-item catalog-page__sort-item--active"
                        : "catalog-page__sort-item"
                    }
                    onClick={() => {
                      setActiveSort(option);
                      setIsSortOpen(false);
                    }}
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
          >
            <span />
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className="catalog-page__grid">
          {wines.map((wine) => (
            <article className="catalog-page__card" key={wine.id}>
              <button
                className={
                  favorites.includes(wine.id)
                    ? "catalog-page__favorite catalog-page__favorite--active"
                    : "catalog-page__favorite"
                }
                type="button"
                aria-label="Add to favorites"
                onClick={() => toggleFavorite(wine.id)}
              >
                ♥
              </button>

              <Link
                to={`/catalog/${wine.id}`}
                className="catalog-page__image-link"
              >
                <span className="catalog-page__wine-glow" />

                <img
                  className="catalog-page__image"
                  src={wine.image}
                  alt={wine.name}
                />
              </Link>

              <div className="catalog-page__info">
                <p className="catalog-page__country">{wine.country.name}</p>
                <h3 className="catalog-page__name">{wine.name}</h3>

                <div className="catalog-page__rating">
                  <span className="catalog-page__stars">★★★★★</span>
                  <span>{wine.rating} (154)</span>
                </div>

                <div className="catalog-page__meta">
                  <div className="catalog-page__meta-item">
                    <img src={wineDropIcon} alt="Sweetness" />

                    <span>{wine.sweetness}</span>
                  </div>

                  <div className="catalog-page__meta-item">
                    <img src={bottleIcon} alt="Bottle volume" />

                    <span>{wine.bottleVolume} ml</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
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
      </div>
    </main>
  );
};
