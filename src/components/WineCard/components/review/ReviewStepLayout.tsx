import { Link } from "react-router-dom";

import { SectionTitle } from "@/components/SectionTitle";

import backArrowIcon from "@/assets/images/icons/arrow-right.svg";

import { useMoodTheme } from "@/context/MoodThemeContext";
import "./ReviewStepLayout.scss";
import {
  nextArrowByMood,
  previousArrowByMood,
} from "@/pages/WriteReviewPage/config/reviewArrows";

type Props = {
  wineId: string;
  step: number;
  canGoNext: boolean;

  onPrevious: () => void;
  onNext: () => void;

  children: React.ReactNode;
};

export const ReviewStepLayout = ({
  wineId,
  step,
  canGoNext,
  onPrevious,
  onNext,
  children,
}: Props) => {
  const { moodTheme } = useMoodTheme();

  const nextArrow =
    nextArrowByMood[moodTheme] || nextArrowByMood.default;

  const previousArrow =
    previousArrowByMood[moodTheme] || previousArrowByMood.default;

  return (
    <main className="write-review-page">
      <div className="container">
          <Link
      to={`/catalog/${wineId}`}
      className="write-review-page__back"
    >
      <img
        className="write-review-page__back-icon"
        src={backArrowIcon}
        alt=""
        aria-hidden="true"
      />

      <span>Wine</span>
    </Link>

        <section className="write-review-page__content">
          <SectionTitle title="Review" />

          {children}

          <div className="write-review-page__navigation">
            <button
              className="write-review-page__nav-button write-review-page__nav-button--previous"
              type="button"
              disabled={step === 1}
              onClick={onPrevious}
            >
              <span>Previous step</span>

              <img
                className="write-review-page__nav-arrow write-review-page__nav-arrow--previous"
                src={previousArrow}
                alt=""
                aria-hidden="true"
              />
            </button>

            <div className="write-review-page__pagination">
  <button
    className={`write-review-page__page ${
      step >= 1 ? "write-review-page__page--active" : ""
    }`}
    type="button"
  >
    1
  </button>

  <span
    className={`write-review-page__pagination-line ${
      step >= 1 ? "write-review-page__pagination-line--active" : ""
    }`}
  />

  <button
    className={`write-review-page__page ${
      step >= 2 ? "write-review-page__page--active" : ""
    }`}
    type="button"
  >
    2
  </button>

  <span
    className={`write-review-page__pagination-line ${
      step >= 2 ? "write-review-page__pagination-line--active" : ""
    }`}
  />

  <button
    className={`write-review-page__page ${
      step >= 3 ? "write-review-page__page--active" : ""
    }`}
    type="button"
  >
    3
  </button>
</div>

            <button
              className="write-review-page__nav-button write-review-page__nav-button--next"
              type="button"
              disabled={!canGoNext}
              onClick={onNext}
            >
              <img
                className="write-review-page__nav-arrow"
                src={nextArrow}
                alt=""
                aria-hidden="true"
              />

              <span>Next step</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};