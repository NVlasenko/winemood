import { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

import type { Wine } from "@/types/wine";
import type { WineCatalogCard as WineCatalogCardType } from "@/types/wineCatalogCard";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { FavoriteButton } from "@/components/ui/FavoriteButton";

import { useAuth } from "@/context/AuthContext";
import { useAuthRequired } from "@/context/AuthRequiredContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useQuizSession } from "@/context/QuizSessionContext";

import { formatLabel } from "@/utils/formatLabel";

import backArrowIcon from "@/assets/images/icons/arrow-right.svg";
import winePattern from "@/assets/images/wineCard/bg/wine-pattern.png";

import BottleIcon from "@/assets/images/wineCard/icons/bottle-default.svg?react";
import VintageIcon from "@/assets/images/wineCard/icons/vintage-default.svg?react";
import SweetnessIcon from "@/assets/images/wineCard/icons/sweet-default.svg?react";

import "./WineHero.scss";

type Props = {
  wine: Wine;
};

const STARS = [1, 2, 3, 4, 5] as const;

const mapWineToCard = (wine: Wine): WineCatalogCardType => ({
  id: wine.id,
  name: wine.name,
  type: wine.type,
  sweetnessLevel: {
    name: wine.sweetnessLevel.name,
  },
  volumeMl: wine.volumeMl,
  countryName: wine.countryName,
  imageUrl: wine.imageUrl,
  rating: wine.rating,
});

export const WineHero = ({ wine }: Props) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { backTarget, clearWineDetailsBackTarget } = useQuizSession();
  const { isAuthenticated } = useAuth();
  const { openAuthRequired } = useAuthRequired();

  const backTo = backTarget?.to ?? "/catalog";
  const backLabel = backTarget?.label ?? "Catalog";

  const isFav = isFavorite(wine.id);
  const isMateusRose = wine.name === "Mateus Rosé";

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

    toggleFavorite(mapWineToCard(wine));
  };

  const handleBackClick = useCallback(() => {
    clearWineDetailsBackTarget();
  }, [clearWineDetailsBackTarget]);

  const metaItems = useMemo(
    () => [
      {
        id: "sweetness",
        Icon: SweetnessIcon,
        value: formatLabel(wine.sweetnessLevel.name),
      },
      {
        id: "volume",
        Icon: BottleIcon,
        value: `${wine.volumeMl} ML`,
      },
      {
        id: "vintage",
        Icon: VintageIcon,
        value: wine.vintage,
      },
    ],
    [wine]
  );

  return (
    <div className="wine-hero">
      <img className="wine-hero__pattern" src={winePattern} alt="" />

      <div className="container">
        <div className="wine-hero__top">
          <Link
            to={backTo}
            className="wine-hero__back"
            onClick={handleBackClick}
          >
            <img src={backArrowIcon} alt="" />
            <span>{backLabel}</span>
          </Link>

          <FavoriteButton
            isFavorite={isFav}
            className="wine-hero__favorite"
            onClick={handleFavoriteClick}
          />
        </div>

        <div className="wine-hero__content">
          <div className="wine-hero__left">
            <SectionTitle title={wine.name} />

            <div
              className="wine-hero__rating"
              aria-label={`Rating ${wine.rating} out of 5`}
            >
              {STARS.map((star) => {
                const fillPercent =
                  Math.min(Math.max(wine.rating - (star - 1), 0), 1) * 100;

                return (
                  <span className="wine-hero__star" key={star}>
                    <span className="wine-hero__star-bg">★</span>
                    <span
                      className="wine-hero__star-fill"
                      style={{ width: `${fillPercent}%` }}
                    >
                      ★
                    </span>
                  </span>
                );
              })}
            </div>

            <div className="wine-hero__info">
              <div className="wine-hero__info-item">
                <p>Type</p>
                <span>{formatLabel(wine.type)}</span>
              </div>

              <div className="wine-hero__info-item">
                <p>Origin</p>
                <span>
                  {wine.region}, {wine.countryName}
                </span>
              </div>

              <div className="wine-hero__info-item">
                <p>Alcohol</p>
                <span>{wine.alcoholPercentage}%</span>
              </div>
            </div>

            <div className="wine-hero__meta">
              {metaItems.map((item) => {
                const Icon = item.Icon;

                return (
                  <div className="wine-hero__meta-item" key={item.id}>
                    <Icon className="wine-hero__meta-icon" />
                    <span>{item.value}</span>
                  </div>
                );
              })}
            </div>

            <p className="wine-hero__description">
              {wine.description}
            </p>
          </div>

          <div className="wine-hero__right">
            <div className="wine-hero__wine-glow" />

            <img
              className={`wine-hero__image ${
                isMateusRose ? "wine-hero__image--mateus-rose" : ""
              }`}
              src={wine.imageUrl}
              alt={wine.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};