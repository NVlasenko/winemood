import winePattern from "@/assets/images/history/historyHeroBg.png";
import historyWoman from "@/assets/images/history/history-woman.svg";

import "./HistoryHero.scss";

export const HistoryHero = () => {
  return (
    <section className="history-hero">
      <img className="history-hero__pattern history-hero__pattern--left" src={winePattern} alt="" aria-hidden="true" />

      <img className="history-hero__pattern history-hero__pattern--right" src={winePattern} alt="" aria-hidden="true" />

      <div className="container">
        <div className="history-hero__content">
          <h1 className="history-hero__title">Where Wine Began</h1>

          <div className="history-hero__image-wrapper">
            <img
              className="history-hero__image"
              src={historyWoman}
              alt=""
            />
          </div>

          <p className="history-hero__text">
            Wine is more than a drink. It is thousands of years of culture,
            traditions, discoveries and passion
          </p>
        </div>
      </div>
    </section>
  );
};