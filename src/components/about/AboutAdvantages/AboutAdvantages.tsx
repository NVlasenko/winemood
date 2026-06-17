import { SectionTitle } from "@/components/ui/SectionTitle";
import { useMoodTheme } from "@/context/MoodThemeContext";

import "./AboutAdvantages.scss";
import { ADVANTAGES } from "./config/advantages";


export const AboutAdvantages = () => {
  const { moodTheme } = useMoodTheme();

  return (
    <section className="about-advantages">
      <div className="container">
        <SectionTitle title="What Makes Us Different" />

        <div className="about-advantages__grid">
        {ADVANTAGES.map((item) => (
  <article
    className="about-advantages__card"
    key={item.id}
  >
    <img
      src={item.icons[moodTheme] || item.icons.default}
      alt=""
      className="about-advantages__number"
      aria-hidden="true"
    />

    <div className="about-advantages__content">
      <h3 className="about-advantages__title">
        {item.title}
      </h3>

      <p className="about-advantages__text">
        {item.text}
      </p>
    </div>
  </article>
))}
        </div>
      </div>
    </section>
  );
};