import type { CSSProperties } from "react";
import { Link } from "react-router-dom";

import { WineRating } from "@/components/catalog/WineRating";

import wineDropIcon from "@/assets/images/wine/sweet.svg";
import bottleIcon from "@/assets/images/wine/bottle.svg";

import type { WineCatalogCard as WineCatalogCardType } from "@/types/wineCatalogCard";

type Props = {
  wine: WineCatalogCardType;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
};

export const WineCatalogCard = ({
  wine,
  index,
  isFavorite,
  onToggleFavorite,
}: Props) => {
  return (
    <article
      className="catalog-page__card"
      style={{ "--card-index": index } as CSSProperties}
    >
      <button
        className={`catalog-page__favorite ${
          isFavorite ? "catalog-page__favorite--active" : ""
        }`}
        type="button"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={isFavorite}
        onClick={() => onToggleFavorite(wine.id)}
      >
        ♥
      </button>

      <Link to={`/catalog/${wine.id}`} className="catalog-page__image-link">
        <span className="catalog-page__wine-glow" aria-hidden="true" />

        <img
          className="catalog-page__image"
          src={wine.imageUrl}
          alt={wine.name}
        />
      </Link>

      <div className="catalog-page__info">
        <p className="catalog-page__country">{wine.countryName}</p>

        <h3 className="catalog-page__name">{wine.name}</h3>

        <WineRating rating={wine.rating} />

        <div className="catalog-page__meta">
          <div className="catalog-page__meta-item">
            <img src={wineDropIcon} alt="" aria-hidden="true" />
            <span>{wine.sweetnessLevel.replace("_", " ")}</span>
          </div>

          <div className="catalog-page__meta-item">
            <img src={bottleIcon} alt="" aria-hidden="true" />
            <span>{wine.volumeMl} ml</span>
          </div>
        </div>
      </div>
    </article>
  );
};