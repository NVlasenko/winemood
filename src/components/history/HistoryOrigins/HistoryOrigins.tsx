import { SectionTitle } from "@/components/ui/SectionTitle";
import { useHistoryOrigins } from "@/hooks/assets/history/useHistoryOrigins";
import { ORIGIN_ICONS } from "./config/origins";
import "./HistoryOrigins.scss";

export const HistoryOrigins = () => {
  const {
    data: origins = [],
    isLoading,
    isError,
  } = useHistoryOrigins();

  return (
    <section className="history-origins">
      <div className="container">
        <SectionTitle title="More Than Wine" />

        {!isLoading && !isError && (
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
        )}
      </div>
    </section>
  );
};