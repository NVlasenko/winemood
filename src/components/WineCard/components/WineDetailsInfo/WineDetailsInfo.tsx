import { useMemo } from "react";
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

  const details = useMemo(
    () => [
      {
        title: "Grape variety",
        value: wine.grapeVariety ? `100% ${wine.grapeVariety}` : "Unknown",
        icon: grapeIcons[moodTheme] || grapeIcons.default,
      },
      {
        title: "Producer",
        value: wine.producerName || "Unknown",
        icon: producerIcons[moodTheme] || producerIcons.default,
      },
      {
        title: "Aging",
        value: wine.agingMonths
          ? `${wine.agingMonths} months total`
          : "Not specified",
        icon: agingIcons[moodTheme] || agingIcons.default,
      },
      {
        title: "Ecological attributes",
        value: wine.environmentalAttributes?.length
          ? wine.environmentalAttributes.join(" / ")
          : "Not specified",
        icon: ecoIcons[moodTheme] || ecoIcons.default,
      },
      {
        title: "Fermentation",
        value: wine.fermentationType || "Not specified",
        icon: fermentationIcons[moodTheme] || fermentationIcons.default,
      },
      {
        title: "Appellation",
        value: wine.appellation || "Not specified",
        icon: appellationIcons[moodTheme] || appellationIcons.default,
      },
    ],
    [wine, moodTheme],
  );

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
                aria-hidden="true"
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