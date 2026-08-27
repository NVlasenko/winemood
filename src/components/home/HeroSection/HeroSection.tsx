import { Link } from "react-router-dom";

import { useSiteAssets } from "@/hooks/assets/siteAssets/useSiteAssets";

import arrowRight from "@/assets/images/icons/arrow-right.svg";

import "./HeroSection.scss";

export const HeroSection = () => {
  const {
    data: siteAssets,
    isLoading,
    isError,
  } = useSiteAssets();

  const heroBackground =
    siteAssets?.home.heroBackgroundUrl;

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-section__content">
          <h1 className="hero-section__title">
            Your Personal Sommelier
          </h1>

          <div className="hero-section__subtitle">
            <span />
            <p>Curate your collection</p>
            <span />
          </div>

          <Link
            to="/catalog"
            className="button-primary hero-section__button"
          >
            <span>Explore Collection</span>

            <img
              src={arrowRight}
              alt=""
              className="hero-section__button-arrow"
            />
          </Link>
        </div>

        <div className="hero-section__image">
          {!isLoading && !isError && heroBackground && (
            <img
              src={heroBackground}
              alt="Elegant wine bottle composition"
            />
          )}
        </div>
      </div>
    </section>
  );
};