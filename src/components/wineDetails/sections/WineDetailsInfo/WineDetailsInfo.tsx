import type { Wine } from "@/types/wine";
import { useMoodTheme } from "@/context/MoodThemeContext";
import "./WineDetailsInfo.scss";
import { getWineDetails } from "./config/wineDetailsConfig";

type Props = {
  wine: Wine;
};

export const WineDetailsInfo = ({ wine }: Props) => {
  const { moodTheme } = useMoodTheme();

  const details = getWineDetails(wine, moodTheme);

  return (
    <section className="wine-details-info">
      <div className="container">
        <div className="wine-details-info__grid">
          {details.map((item) => (
            <article className="wine-details-info__card" key={item.id}>
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