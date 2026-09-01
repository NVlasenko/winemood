import { SectionTitle } from "@/components/ui/SectionTitle";
import { ORIGIN_ICONS } from "./config/origins";

import type { HistoryOrigin } from "@/types/historyOrigin";

import "./HistoryOrigins.scss";

type HistoryOriginsProps = {
  origins: HistoryOrigin[];
};

export const HistoryOrigins = ({
  origins,
}: HistoryOriginsProps) => {
  return (
    <section className="history-origins">
      <div className="container">
        <SectionTitle title="More Than Wine" />

        <div className="history-origins__list">
          {origins.map((item) => {
            const Icon =
              ORIGIN_ICONS[
                item.id as keyof typeof ORIGIN_ICONS
              ];

            return (
              <article
                className="history-origins__card"
                key={item.id}
              >
                <div className="history-origins__info">
                  {Icon && (
                    <Icon
                      className="history-origins__icon"
                      aria-hidden="true"
                      focusable="false"
                    />
                  )}

                  <div className="history-origins__content">
                    <h3 className="history-origins__title">
                      {item.title}
                    </h3>

                    <p className="history-origins__text">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="history-origins__image-wrap">
                  <img
                    className="history-origins__image"
                    src={item.imageUrl}
                    alt=""
                  />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};