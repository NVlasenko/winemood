import { useMemo } from "react";

import { useMoodTheme } from "@/context/MoodThemeContext";

import { SectionTitle } from "@/components/SectionTitle";

import { barrelIcons } from "./config/barrelIcons";
import { personIcons } from "./config/personIcons";
import { likeIcons } from "./config/likeIcons";
import { locationIcons } from "./config/locationIcons";

import "./AboutFeatures.scss";

export const AboutFeatures = () => {
  const { moodTheme } = useMoodTheme();

  const features = useMemo(
    () => [
      {
        id: 1,
        title: "UNDERSTAND WINE STYLES",
        icon: barrelIcons[moodTheme] || barrelIcons.default,
      },
      {
        id: 2,
        title: "BUILD PERSONAL TASTE PROFILES",
        icon: personIcons[moodTheme] || personIcons.default,
      },
      {
        id: 3,
        title: "DISCOVER NEW REGIONS",
        icon: locationIcons[moodTheme] || locationIcons.default,
      },
      {
        id: 4,
        title: "RECEIVE INTELLIGENT RECOMMENDATIONS",
        icon: likeIcons[moodTheme] || likeIcons.default,
      },
    ],
    [moodTheme]
  );

  return (
    <section className="about-features">
      <div className="container">
        <SectionTitle title="WE FOCUS ON HELPING USERS" />

        <div className="about-features__grid">
          {features.map((feature) => (
            <article
              key={feature.id}
              className="about-features__card"
            >
              <img
                src={feature.icon}
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