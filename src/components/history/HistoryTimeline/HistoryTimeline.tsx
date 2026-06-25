import { SectionTitle } from "@/components/ui/SectionTitle";

import "./HistoryTimeline.scss";
import { TIMELINE_ITEMS } from "./config/timelineItems";

export const HistoryTimeline = () => {
  return (
    <section className="history-timeline">
      <div className="container">
        <SectionTitle title="A Journey Through Time" />

        <div className="history-timeline__grid">
          {TIMELINE_ITEMS.map((item) => {
            const Icon = item.Icon;

            return (
              <article className="history-timeline__card" key={item.id}>
                <div className="history-timeline__image-wrap">
                  <img
                    className="history-timeline__image"
                    src={item.image}
                    alt=""
                  />
                </div>

                <div className="history-timeline__dot" />

                <Icon
                  className="history-timeline__date"
                  aria-hidden="true"
                  focusable="false"
                />

                <p className="history-timeline__text">{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};