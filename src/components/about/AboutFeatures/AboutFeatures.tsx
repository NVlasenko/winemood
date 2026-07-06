import { SectionTitle } from "@/components/ui/SectionTitle";

import { FEATURES } from "./config/features";

import "./AboutFeatures.scss";

export const AboutFeatures = () => {
  return (
    <section className="about-features">
      <div className="container">
        <SectionTitle title="WE FOCUS ON HELPING USERS" />

        <div className="about-features__grid">
          {FEATURES.map((feature) => {
            const Icon = feature.Icon;

            return (
              <article key={feature.id} className="about-features__card">
                <Icon
                  className="about-features__icon"
                  aria-hidden="true"
                  focusable="false"
                />

                <p className="about-features__text">{feature.title}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};