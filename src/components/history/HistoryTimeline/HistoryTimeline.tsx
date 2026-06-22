import { SectionTitle } from "@/components/ui/SectionTitle";
import { useMoodTheme } from "@/context/MoodThemeContext";
import "./HistoryTimeline.scss";
import { TIMELINE_ITEMS } from "./config/timelineItems";


export const HistoryTimeline = () => {
  const { moodTheme } = useMoodTheme();

  return (
    <section className="history-timeline">
      <div className="container">
        <SectionTitle title="A Journey Through Time" />

        <div className="history-timeline__grid">
          {TIMELINE_ITEMS.map((item) => (
            <article className="history-timeline__card" key={item.id}>
              <div className="history-timeline__image-wrap">
                <img
                  className="history-timeline__image"
                  src={item.image}
                  alt=""
                />
              </div>

              <div className="history-timeline__dot" />

              <img
                className="history-timeline__date"
                src={item.icons[moodTheme] || item.icons.default}
                alt=""
              />

              <p className="history-timeline__text">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};