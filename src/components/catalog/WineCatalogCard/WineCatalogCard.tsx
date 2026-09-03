import type { CSSProperties } from "react";
import { Link } from "react-router";

import { WineRating } from "@/components/catalog/WineRating";
import { FavoriteButton } from "@/components/ui/FavoriteButton";

import { useAuth } from "@/context/AuthContext";
import { useAuthRequired } from "@/context/AuthRequiredContext";

import wineDropIcon from "@/assets/images/wine/sweet.svg";
import bottleIcon from "@/assets/images/wine/bottle.svg";

import type { WineCatalogCard as WineCatalogCardType } from "@/types/wineCatalogCard";
import "./WineCatalogCard.scss";
type Props = {
  wine: WineCatalogCardType;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (wine: WineCatalogCardType) => Promise<void>;
};

const formatWineValue = (value: string) => {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
};

export const WineCatalogCard = ({
  wine,
  index,
  isFavorite,
  onToggleFavorite,
}: Props) => {
  const { isAuthenticated } = useAuth();
  const { openAuthRequired } = useAuthRequired();

  const handleFavoriteClick = () => {
    if (!isAuthenticated) {
      openAuthRequired({
        title: "Add wine to favorites",
        text: "To add this wine to your favorites, please sign up or log in.",
        primaryLabel: "Sign up",
        primaryTo: "/auth?mode=register",
        secondaryLabel: "Log in",
        secondaryTo: "/auth?mode=login",
      });

      return;
    }

    onToggleFavorite(wine);
  };

  return (
    <article
      className="catalog-page__card"
      style={{ "--card-index": index } as CSSProperties}
    >
      <div className="catalog-page__card-inner">
      <Link
        to={`/catalog/${wine.id}`}
        className="catalog-page__card-link"
        aria-label={`View ${wine.name}`}
      />
        <FavoriteButton
          isFavorite={isFavorite}
          className="catalog-page__favorite"
          onClick={handleFavoriteClick}
        />

        <div className="catalog-page__image-link">
          <span className="catalog-page__wine-glow" />

          <img
            className="catalog-page__image"
            src={wine.imageUrl}
            alt={wine.name}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="catalog-page__info">
          <p className="catalog-page__country">
            {wine.countryName}
          </p>

          <h3 className="catalog-page__name">
            {wine.name}
          </h3>

          <WineRating rating={wine.rating} />

          <div className="catalog-page__meta">
            <div className="catalog-page__meta-item">
              <img src={wineDropIcon} alt="" />

              <span>
                {formatWineValue(wine.sweetnessLevel.name)}
              </span>
            </div>

            <div className="catalog-page__meta-item">
              <img src={bottleIcon} alt="" />

              <span>{wine.volumeMl} ml</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};