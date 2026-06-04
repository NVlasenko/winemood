import { SectionTitle } from "@/components/SectionTitle";

import "./AboutHowItWorks.scss";

const steps = [
  {
    number: "1",
    title: "Tell Us Your Preferences",
    text: "Select flavors, wine styles, and moods you enjoy.",
  },
  {
    number: "2",
    title: "Discover New Wines",
    text: "Receive tailored recommendations from our intelligent recommendation system.",
  },
  {
    number: "3",
    title: "Build Your Collection",
    text: "Save favorites, create lists, and refine your taste profile.",
  },
];

export const AboutHowItWorks = () => {
  return (
    <section className="about-how-it-works">
      <div className="container">
        <SectionTitle title="How It Works" />

        <div className="about-how-it-works__grid">
          {steps.map((step) => (
            <article className="about-how-it-works__card" key={step.number}>
              <span className="about-how-it-works__number">
                {step.number}
              </span>

              <div className="about-how-it-works__content">
                <h3 className="about-how-it-works__title">
                  {step.title}
                </h3>

                <p className="about-how-it-works__text">
                  {step.text}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};