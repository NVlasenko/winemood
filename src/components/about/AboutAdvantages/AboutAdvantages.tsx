import { SectionTitle } from "@/components/ui/SectionTitle";

import "./AboutAdvantages.scss";
import { ADVANTAGES } from "./config/advantages";

export const AboutAdvantages = () => {
  return (
    <section className="about-advantages">
      <div className="container">
        <SectionTitle title="What Makes Us Different" />

        <div className="about-advantages__grid">
          {ADVANTAGES.map((item) => {
            const Icon = item.Icon;

            return (
              <article className="about-advantages__card" key={item.id}>
                <Icon
                  className="about-advantages__number"
                  aria-hidden="true"
                  focusable="false"
                />

                <div className="about-advantages__content">
                  <h3 className="about-advantages__title">{item.title}</h3>

                  <p className="about-advantages__text">{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};