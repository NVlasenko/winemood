import "./HeroSection.scss";
import bgHero from "../../assets/images/bg-pictures/bgHero.png";
import arrowRight from "../../assets/images/icons/arrow-right.svg";

export const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="container">
          <div className="hero-section__content">
        <h1 className="hero-section__title">Your Personal Sommelier</h1>

        <div className="hero-section__subtitle">
          <span />
          <p>Curate your collection</p>
          <span />
        </div>

       <button className="hero-section__button" type="button">
  Explore Collection

  <img
    src={arrowRight}
    alt="Arrow right"
    className="hero-section__button-arrow"
  />
</button>
      </div>

      <div className="hero-section__image">
  <img
    src={bgHero}
    alt="Wine"
  />
</div> 
      </div>
   
    </section>
  );
};
