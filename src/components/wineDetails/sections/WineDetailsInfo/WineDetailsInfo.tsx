import type { Wine } from "@/types/wine";

import "./WineDetailsInfo.scss";
import { getWineDetails } from "./config/wineDetailsConfig";

type Props = {
  wine: Wine;
};

export const WineDetailsInfo = ({ wine }: Props) => {
  const details = getWineDetails(wine);

  return (
    <section className="wine-details-info">
      <div className="container">
        <div className="wine-details-info__grid">
          {details.map((item) => {
            const Icon = item.Icon;

            return (
              <article className="wine-details-info__card" key={item.id}>
                <Icon
                  className="wine-details-info__icon"
                  aria-hidden="true"
                  focusable="false"
                />

                <div className="wine-details-info__content">
                  <h3 className="wine-details-info__title">{item.title}</h3>
                  <p className="wine-details-info__value">{item.value}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};