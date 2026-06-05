import { useMemo } from "react";

import { SectionTitle } from "@/components/SectionTitle";
import { useMoodTheme } from "@/context/MoodThemeContext";

import timeline1920s from "@/assets/images/history/timeline/img/timeline-1920s.png";
import timeline1950s from "@/assets/images/history/timeline/img/timeline-1950s.png";
import timeline1980s from "@/assets/images/history/timeline/img/timeline-1980s.png";
import timelineToday from "@/assets/images/history/timeline/img/timeline-today.png";

import { year1920sIcons } from "./config/year1920sIcons";
import { year1950sIcons } from "./config/year1950sIcons";
import { year1980sIcons } from "./config/year1980sIcons";
import { todayIcons } from "./config/todayIcons";

import "./HistoryTimeline.scss";

export const HistoryTimeline = () => {
  const { moodTheme } = useMoodTheme();

  const timelineItems = useMemo(
    () => [
      {
        id: "1920s",
        image: timeline1920s,
        dateIcon: year1920sIcons[moodTheme] || year1920sIcons.default,
        text: "The first family winery and the beginning of a tradition.",
      },
      {
        id: "1950s",
        image: timeline1950s,
        dateIcon: year1950sIcons[moodTheme] || year1950sIcons.default,
        text: "Expansion of vineyards and refinement of winemaking techniques.",
      },
      {
        id: "1980s",
        image: timeline1980s,
        dateIcon: year1980sIcons[moodTheme] || year1980sIcons.default,
        text: "New technologies introduced while preserving classic methods.",
      },
      {
        id: "today",
        image: timelineToday,
        dateIcon: todayIcons[moodTheme] || todayIcons.default,
        text: "Expansion of vineyards and refinement of winemaking techniques.",
      },
    ],
    [moodTheme]
  );

  return (
    <section className="history-timeline">
      <div className="container">
        <SectionTitle title="A Journey Through Time" />

        <div className="history-timeline__grid">
          {timelineItems.map((item) => (
            <article className="history-timeline__card" key={item.id}>
              <div className="history-timeline__image-wrap">
                <img
                  className="history-timeline__image"
                  src={item.image}
                  alt=""
                  aria-hidden="true"
                />
              </div>

              <div className="history-timeline__dot" />

              <img
                className="history-timeline__date"
                src={item.dateIcon}
                alt=""
                aria-hidden="true"
              />

              <p className="history-timeline__text">
                {item.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};