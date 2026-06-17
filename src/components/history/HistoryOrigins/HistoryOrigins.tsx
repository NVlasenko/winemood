import { SectionTitle } from "@/components/ui/SectionTitle";
import { useMoodTheme } from "@/context/MoodThemeContext";

import "./HistoryOrigins.scss";
import { ORIGINS } from "./config/origins";

export const HistoryOrigins = () => {
  const { moodTheme } = useMoodTheme();

  return (
    <section className="history-origins">
      <div className="container">
        <SectionTitle title="More Than Wine" />

        <div className="history-origins__list">
          {ORIGINS.map((item) => (
            <article className="history-origins__card" key={item.id}>
              <div className="history-origins__info">
                <img
                  className="history-origins__icon"
                  src={item.icons[moodTheme] || item.icons.default}
                  alt=""
                />

                <div className="history-origins__content">
                  <h3 className="history-origins__title">{item.title}</h3>
                  <p className="history-origins__text">{item.text}</p>
                </div>
              </div>

              <div className="history-origins__image-wrap">
                <img
                  className="history-origins__image"
                  src={item.image}
                  alt=""
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};