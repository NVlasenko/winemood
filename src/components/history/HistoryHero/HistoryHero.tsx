import winePattern from "@/assets/images/history/historyHero/historyHeroBg.png";

import { useMoodTheme } from "@/context/MoodThemeContext";
import "./HistoryHero.scss";
import { womanIcons } from "./config/history-woman";


export const HistoryHero = () => {
  const { moodTheme } = useMoodTheme();

  return (
    <section className="history-hero">
      <img
        className="history-hero__pattern history-hero__pattern--left"
        src={winePattern}
        alt=""
      />

      <img
        className="history-hero__pattern history-hero__pattern--right"
        src={winePattern}
        alt=""
      />

      <div className="container">
        <div className="history-hero__content">
          <h1 className="history-hero__title">
            Where Wine Began
          </h1>

          <div className="history-hero__image-wrapper">
            <img
              className="history-hero__image"
              src={womanIcons[moodTheme] || womanIcons.default}
              alt=""
              aria-hidden="true"
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