import { SectionTitle } from "@/components/ui/SectionTitle";
import { TIMELINE_ICONS } from "./config/timelineItems";

import type { HistoryTimelineItem } from "@/types/historyTimelineItem";

import "./HistoryTimeline.scss";

type HistoryTimelineProps = {
  timelineItems: HistoryTimelineItem[];
};

export const HistoryTimeline = ({
  timelineItems,
}: HistoryTimelineProps) => {
  return (
    <section className="history-timeline">
      <div className="container">
        <SectionTitle title="A Journey Through Time" />

        <div className="history-timeline__grid">
          {timelineItems.map((item) => {
            const Icon =
              TIMELINE_ICONS[
                item.id as keyof typeof TIMELINE_ICONS
              ];

            return (
              <article
                className="history-timeline__card"
                key={item.id}
              >
                <div className="history-timeline__image-wrap">
                  <img
                    className="history-timeline__image"
                    src={item.imageUrl}
                    alt=""
                  />
                </div>

                <div className="history-timeline__dot" />

                {Icon && (
                  <Icon
                    className="history-timeline__date"
                    aria-hidden="true"
                    focusable="false"
                  />
                )}

                <p className="history-timeline__text">
                  {item.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};