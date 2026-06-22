import { SectionTitle } from "@/components/ui/SectionTitle";
import "./AboutHowItWorks.scss";
import { STEPS } from "./config/steps";

export const AboutHowItWorks = () => {
  return (
    <section className="about-how-it-works">
      <div className="container">
        <SectionTitle title="How It Works" />

        <div className="about-how-it-works__grid">
          {STEPS.map((step) => (
            <article className="about-how-it-works__card" key={step.id}>
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