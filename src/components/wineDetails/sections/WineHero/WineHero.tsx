import { useCallback } from "react";
import { Link } from "react-router-dom";

import type { Wine } from "@/types/wine";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { useFavorites } from "@/context/FavoritesContext";
import { useMoodTheme } from "@/context/MoodThemeContext";
import { formatLabel } from "@/utils/formatLabel";

import backArrowIcon from "@/assets/images/icons/arrow-right.svg";
import winePattern from "@/assets/images/wineCard/bg/wine-pattern.png";



import "./WineHero.scss";
import { wineBottleIcons } from "../../config/wineBottleIcons";
import { wineSweetnessIcons } from "../../config/wineSweetnessIcons";
import { wineVintageIcons } from "../../config/wineVintageIcons";

type Props = {
  wine: Wine;
};

const STARS = [1, 2, 3, 4, 5] as const;

export const WineHero = ({ wine }: Props) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { moodTheme } = useMoodTheme();

  const isFavorite = favorites.includes(wine.id);
  const isMateusRose = wine.name === "Mateus Rosé";

  const bottleIcon = wineBottleIcons[moodTheme] || wineBottleIcons.default;
  const sweetnessIcon =
    wineSweetnessIcons[moodTheme] || wineSweetnessIcons.default;
  const vintageIcon = wineVintageIcons[moodTheme] || wineVintageIcons.default;

  const handleFavoriteClick = useCallback(() => {
    toggleFavorite(wine.id);
  }, [toggleFavorite, wine.id]);

  const metaItems = [
    {
      id: "sweetness",
      icon: sweetnessIcon,
      value: formatLabel(wine.sweetnessLevel),
    },
    {
      id: "volume",
      icon: bottleIcon,
      value: `${wine.volumeMl} ML`,
    },
    {
      id: "vintage",
      icon: vintageIcon,
      value: wine.vintage,
    },
  ];

  return (
    <div className="wine-hero">
      <img className="wine-hero__pattern" src={winePattern} alt="" />

      <div className="container">
        <div className="wine-hero__top">
          <Link to="/catalog" className="wine-hero__back">
            <img src={backArrowIcon} alt="" />
            <span>Catalog</span>
          </Link>

          <button
            className={`wine-hero__favorite ${
              isFavorite ? "wine-hero__favorite--active" : ""
            }`}
            type="button"
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
            aria-pressed={isFavorite}
            onClick={handleFavoriteClick}
          >
            ♥
          </button>
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
                  <span
                    className="wine-hero__star"
                    key={star}
                    aria-hidden="true"
                  >
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
              {metaItems.map((item) => (
                <div className="wine-hero__meta-item" key={item.id}>
                  <img src={item.icon} alt="" />
                  <span>{item.value}</span>
                </div>
              ))}
            </div>

            <p className="wine-hero__description">{wine.description}</p>
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