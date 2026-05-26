import type { Wine } from "@/types/wine";

import { useMoodTheme } from "@/context/MoodThemeContext";

import { grapeIcons } from "./config/grapeIcons";
import { producerIcons } from "./config/producerIcons";
import { agingIcons } from "./config/agingIcons";
import { ecoIcons } from "./config/ecoIcons";
import { fermentationIcons } from "./config/fermentationIcons";
import { appellationIcons } from "./config/appellationIcons";

import "./WineDetailsInfo.scss";

type Props = {
  wine: Wine;
};

export const WineDetailsInfo = ({ wine }: Props) => {
  const { moodTheme } = useMoodTheme();

  const details = [
    {
      title: "Grape variety",
      value: `100% ${wine.grapeVariety}`,
      icon: grapeIcons[moodTheme],
    },
    {
      title: "Producer",
      value: wine.producer.name,
      icon: producerIcons[moodTheme],
    },
    {
      title: "Aging",
      value: `${wine.agingYears * 12} months total`,
      icon: agingIcons[moodTheme],
    },
    {
      title: "Ecological attributes",
      value: wine.ecoAttributes.join(" / "),
      icon: ecoIcons[moodTheme],
    },
    {
      title: "Fermentation",
      value: wine.fermentation,
      icon: fermentationIcons[moodTheme],
    },
    {
      title: "Appellation",
      value: wine.appellation,
      icon: appellationIcons[moodTheme],
    },
  ];

  return (
    <section className="wine-details-info">
      <div className="container">
        <div className="wine-details-info__grid">
          {details.map((item) => (
            <article className="wine-details-info__card" key={item.title}>
              <img
                className="wine-details-info__icon"
                src={item.icon}
                alt=""
              />

              <div className="wine-details-info__content">
                <h3 className="wine-details-info__title">{item.title}</h3>

                <p className="wine-details-info__value">{item.value}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};