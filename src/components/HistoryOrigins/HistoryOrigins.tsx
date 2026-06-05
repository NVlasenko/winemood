import { SectionTitle } from "@/components/SectionTitle";
import { useMoodTheme } from "@/context/MoodThemeContext";

import wineOriginsImage from "@/assets/images/history/historyOrigins/history-wine-origins.svg";
import ancientCivilizationsImage from "@/assets/images/history/historyOrigins/history-ancient-civilizations.svg";
import monasticTraditionsImage from "@/assets/images/history/historyOrigins/history-monastic-traditions.svg";
import wineCultureImage from "@/assets/images/history/historyOrigins/history-wine-culture.svg";

import { grapeIcons } from "./config/grapeIcons";
import { templeIcons } from "./config/templeIcons";
import { castleIcons } from "./config/castleIcons";
import { globeIcons } from "./config/globeIcons";

import "./HistoryOrigins.scss";

const origins = [
  {
    title: "Origins of Wine",
    text: "Wine is one of the oldest alcoholic beverages in human history. Archaeological evidence suggests that winemaking began more than 8,000 years ago in the region of present-day Georgia. Clay vessels containing traces of fermented grapes reveal humanity's long-standing relationship with wine.",
    image: wineOriginsImage,
    icons: grapeIcons,
  },
  {
    title: "Origins Wine in Ancient Civilizations Wine",
    text: "The Egyptians, Greeks, and Romans considered wine an essential part of daily life. It was used in religious ceremonies, celebrations, and trade. The Romans played a major role in spreading viticulture throughout Europe.",
    image: ancientCivilizationsImage,
    icons: templeIcons,
  },
  {
    title: "Monastic Traditions",
    text: "During the Middle Ages, monasteries became centers of winemaking knowledge. Monks carefully documented vineyard practices, improved cultivation techniques, and helped preserve wine culture across Europe.",
    image: monasticTraditionsImage,
    icons: castleIcons,
  },
  {
    title: "Origins of Wine",
    text: "Wine is one of the oldest alcoholic beverages in human history. Archaeological evidence suggests that winemaking began more than 8,000 years ago in the region of present-day Georgia. Clay vessels containing traces of fermented grapes reveal humanity's long-standing relationship with wine.",
    image: wineCultureImage,
    icons: globeIcons,
  },
];

export const HistoryOrigins = () => {
  const { moodTheme } = useMoodTheme();

  return (
    <section className="history-origins">
      <div className="container">
        <SectionTitle title="More Than Wine" />

        <div className="history-origins__list">
          {origins.map((item) => (
            <article className="history-origins__card" key={item.title + item.image}>
              <div className="history-origins__info">
                <img
                  className="history-origins__icon"
                  src={item.icons[moodTheme] || item.icons.default}
                  alt=""
                  aria-hidden="true"
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
                  aria-hidden="true"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};