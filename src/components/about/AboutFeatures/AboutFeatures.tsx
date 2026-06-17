import { useMoodTheme } from "@/context/MoodThemeContext";

import { SectionTitle } from "@/components/ui/SectionTitle";

import { FEATURES } from "./config/features";

import "./AboutFeatures.scss";

export const AboutFeatures = () => {
  const { moodTheme } = useMoodTheme();

  return (
    <section className="about-features">
      <div className="container">
        <SectionTitle title="WE FOCUS ON HELPING USERS" />

        <div className="about-features__grid">
          {FEATURES.map((feature) => (
            <article
              key={feature.id}
              className="about-features__card"
            >
              <img
                src={feature.icons[moodTheme] || feature.icons.default}
                alt=""
                className="about-features__icon"
                aria-hidden="true"
              />

              <p className="about-features__text">
                {feature.title}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};