// import { Link } from "react-router-dom";

// import type { Wine } from "../../../../types/wine";
// import { useFavorites } from "../../../../context/FavoritesContext";
// import { useMoodTheme } from "../../../../context/MoodThemeContext";
// import { SectionTitle } from "../../../SectionTitle";

// import backArrowIcon from "../../../../assets/images/icons/arrow-right.svg";
// import winePattern from "../../../../assets/images/wineCard/bg/wine-pattern.png";

// import { wineBottleIcons } from "../../config/wineBottleIcons";
// import { wineSweetnessIcons } from "../../config/wineSweetnessIcons";

// import "./WineHero.scss";

// type Props = {
//   wine: Wine;
// };

// export const WineHero = ({ wine }: Props) => {
//   const { favorites, toggleFavorite } = useFavorites();
//   const { moodTheme } = useMoodTheme();

//   const isFavorite = favorites.includes(wine.id);
//   const currentBottleIcon = wineBottleIcons[moodTheme];
//   const currentSweetnessIcon = wineSweetnessIcons[moodTheme];

//   return (
//     <div className="wine-hero">
//       <img className="wine-hero__pattern" src={winePattern} alt="" />

//       <div className="container">
//         <div className="wine-hero__top">
//           <Link to="/catalog" className="wine-hero__back">
//             <img src={backArrowIcon} alt="Back" />
//             <span>Catalog</span>
//           </Link>

//           <button
//             className={
//               isFavorite
//                 ? "wine-hero__favorite wine-hero__favorite--active"
//                 : "wine-hero__favorite"
//             }
//             type="button"
//             aria-label="Toggle favorite"
//             onClick={() => toggleFavorite(wine.id)}
//           >
//             ♥
//           </button>
//         </div>

//         <div className="wine-hero__content">
//           <div className="wine-hero__left">
//             <SectionTitle title={wine.name} />

//             <div className="wine-hero__rating">
//               {[1, 2, 3, 4, 5].map((star) => {
//                 const fillPercent =
//                   Math.min(Math.max(wine.rating - (star - 1), 0), 1) * 100;

//                 return (
//                   <span className="wine-hero__star" key={star}>
//                     <span className="wine-hero__star-bg">★</span>

//                     <span
//                       className="wine-hero__star-fill"
//                       style={{ width: `${fillPercent}%` }}
//                     >
//                       ★
//                     </span>
//                   </span>
//                 );
//               })}
//             </div>

//             <div className="wine-hero__info">
//               <div className="wine-hero__info-item">
//                 <p>Type</p>
//                 <span>{wine.category.type}</span>
//               </div>

//               <div className="wine-hero__info-item">
//                 <p>Origin</p>
//                 <span>
//                   {wine.region.name}, {wine.country.name}
//                 </span>
//               </div>

//               <div className="wine-hero__info-item">
//                 <p>Alcohol</p>
//                 <span>{wine.alcoholByVolume}%</span>
//               </div>
//             </div>

//             <div className="wine-hero__meta">
//               <div className="wine-hero__meta-item">
//                 <img src={currentSweetnessIcon} alt="" />
//                 <span>{wine.sweetness.replace("_", " ")}</span>
//               </div>

//               <div className="wine-hero__meta-item">
//                 <img src={currentBottleIcon} alt="" />
//                 <span>{wine.bottleVolume} ML</span>
//               </div>
//             </div>

//             <p className="wine-hero__description">{wine.description}</p>
//           </div>

//           <div className="wine-hero__right">
//             <img
//               className="wine-hero__image"
//               src={wine.image}
//               alt={wine.name}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { Link } from "react-router-dom";

import type { Wine } from "@/types/wine";

import { useFavorites } from "@/context/FavoritesContext";
import { useMoodTheme } from "@/context/MoodThemeContext";

import { SectionTitle } from "@/components/SectionTitle";

import backArrowIcon from "@/assets/images/icons/arrow-right.svg";
import winePattern from "@/assets/images/wineCard/bg/wine-pattern.png";

import { wineBottleIcons } from "../../config/wineBottleIcons";
import { wineSweetnessIcons } from "../../config/wineSweetnessIcons";

import "./WineHero.scss";

type Props = {
  wine: Wine;
};

export const WineHero = ({ wine }: Props) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { moodTheme } = useMoodTheme();

  const isFavorite = favorites.includes(wine.id);
  const currentBottleIcon = wineBottleIcons[moodTheme];
  const currentSweetnessIcon = wineSweetnessIcons[moodTheme];

  return (
    <div className="wine-hero">
      <img className="wine-hero__pattern" src={winePattern} alt="" />

      <div className="container">
        <div className="wine-hero__top">
          <Link to="/catalog" className="wine-hero__back">
            <img src={backArrowIcon} alt="Back" />
            <span>Catalog</span>
          </Link>

          <button
            className={
              isFavorite
                ? "wine-hero__favorite wine-hero__favorite--active"
                : "wine-hero__favorite"
            }
            type="button"
            aria-label="Toggle favorite"
            onClick={() => toggleFavorite(wine.id)}
          >
            ♥
          </button>
        </div>

        <div className="wine-hero__content">
          <div className="wine-hero__left">
            <SectionTitle title={wine.name} />

            <div className="wine-hero__rating">
              {[1, 2, 3, 4, 5].map((star) => {
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
                <span>{wine.category.type}</span>
              </div>

              <div className="wine-hero__info-item">
                <p>Origin</p>
                <span>
                  {wine.region.name}, {wine.country.name}
                </span>
              </div>

              <div className="wine-hero__info-item">
                <p>Alcohol</p>
                <span>{wine.alcoholByVolume}%</span>
              </div>
            </div>

            <div className="wine-hero__meta">
              <div className="wine-hero__meta-item">
                <img src={currentSweetnessIcon} alt="" />
                <span>{wine.sweetness.replace("_", " ")}</span>
              </div>

              <div className="wine-hero__meta-item">
                <img src={currentBottleIcon} alt="" />
                <span>{wine.bottleVolume} ML</span>
              </div>
            </div>

            <p className="wine-hero__description">{wine.description}</p>
          </div>

          <div className="wine-hero__right">
            <div className="wine-hero__wine-glow" />

            <img
              className="wine-hero__image"
              src={wine.image}
              alt={wine.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};