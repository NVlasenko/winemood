import { useNavigate } from "react-router-dom";

import "./HeroSection.scss";

import bgHero from "../../assets/images/bg-pictures/bgHero.svg";
import arrowRight from "../../assets/images/icons/arrow-right.svg";

export const HeroSection = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/catalog");
  };

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

          <button
            className="button-primary hero-section__button"
            type="button"
            onClick={handleExploreClick}
          >
            <span>Explore Collection</span>

            <img
              src={arrowRight}
              alt=""
              className="hero-section__button-arrow"
            />
          </button>
        </div>

        <div className="hero-section__image">
          <img src={bgHero} alt="Elegant wine bottle composition" />
        </div>
      </div>
    </section>
  );
};