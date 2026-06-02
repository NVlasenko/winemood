import { useMemo } from "react";

import { SectionTitle } from "@/components/SectionTitle";

import { useMoodTheme } from "@/context/MoodThemeContext";

import { number01Icons } from "./config/number01Icons";
import { number02Icons } from "./config/number02Icons";
import { number03Icons } from "./config/number03Icons";

import "./AboutAdvantages.scss";

export const AboutAdvantages = () => {
  const { moodTheme } = useMoodTheme();

  const advantages = useMemo(
    () => [
      {
        id: "01",
        title: "Smart Recommendations",
        text: "Personalized wine suggestions based on your taste profile and preferences.",
        icon: number01Icons[moodTheme] || number01Icons.default,
      },
      {
        id: "02",
        title: "Wine Knowledge",
        text: "Learn about grape varieties, regions, tasting notes, and food pairings in a simple visual way.",
        icon: number02Icons[moodTheme] || number02Icons.default,
      },
      {
        id: "03",
        title: "Curated Collections",
        text: "Explore handpicked selections organized by mood, season, flavor, and occasion.",
        icon: number03Icons[moodTheme] || number03Icons.default,
      },
    ],
    [moodTheme]
  );

  return (
    <section className="about-advantages">
      <div className="container">
        <SectionTitle title="What Makes Us Different" />

        <div className="about-advantages__grid">
          {advantages.map((item) => (
            <article
              className="about-advantages__card"
              key={item.id}
            >
              <img
                src={item.icon}
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