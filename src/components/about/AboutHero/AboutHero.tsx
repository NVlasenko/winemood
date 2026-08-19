import aboutUsBottle from "@/assets/images/aboutUs/aboutUsBottle.svg";
import winePattern from "@/assets/images/aboutUs/aboutUs-pattern.png";

import "./AboutHero.scss";

export const AboutHero = () => {
  return (
    <section className="about-hero">
      <img
        className="about-hero__pattern about-hero__pattern--left"
        src={winePattern}
        alt=""
        loading="lazy"
      />

      <img
        className="about-hero__pattern about-hero__pattern--right"
        src={winePattern}
        alt=""
        loading="lazy"
      />

      <div className="container">
        <div className="about-hero__content">
          <h1 className="about-hero__brand" aria-hidden="true">
            Winemood
          </h1>

          <img
            className="about-hero__bottle"
            src={aboutUsBottle}
            alt=""
            aria-hidden="true"
          />

          <p className="about-hero__text">
            Smart wine discovery platform that helps you explore, compare, and
            understand wines through personalized recommendations and curated
            collections.
          </p>
        </div>
      </div>
    </section>
  );
};