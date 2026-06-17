import { Link } from "react-router-dom";

import arrowRight from "@/assets/images/icons/arrow-right.svg";

import "./QuizCTA.scss";

export const QuizCTA = () => {
  return (
    <section className="quiz-cta">
      <div className="container">
        <div className="quiz-cta__box">
          <h2 className="quiz-cta__title">
            Find Your Perfect Match
          </h2>

          <p className="quiz-cta__text">
            Take a 1-minute quiz to discover the wine that suits your palate.
          </p>

          <Link
            to="/catalog"
            className="button-primary quiz-cta__button"
          >
            <span>Explore Collection</span>

            <img
              className="quiz-cta__button-arrow"
              src={arrowRight}
              alt=""
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};