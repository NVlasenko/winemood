import arrowRight from "../../assets/images/icons/arrow-right.svg";
import "./QuizCTA.scss";

export const QuizCTA = () => {
  return (
    <section className="quiz-cta">
      <div className="container">
        <div className="quiz-cta__box">
          <h2 className="quiz-cta__title">Find Your Perfect Match</h2>

          <p className="quiz-cta__text">
            Take a 1-minute quiz to discover the wine that suits your palate.
          </p>

          <button className="button-primary quiz-cta__button" type="button">
            Explore Collection
            <img
              className="quiz-cta__button-arrow"
              src={arrowRight}
              alt="arrow"
            />
          </button>
        </div>
      </div>
    </section>
  );
};
