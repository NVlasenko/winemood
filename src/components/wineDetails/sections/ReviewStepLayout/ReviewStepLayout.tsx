import type { ReactNode } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

import backArrowIcon from "@/assets/images/icons/arrow-right.svg";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useMoodTheme } from "@/context/MoodThemeContext";

import {
  nextArrowByMood,
  previousArrowByMood,
} from "@/pages/WriteReviewPage/config/reviewArrows";

import "./ReviewStepLayout.scss";

export type ReviewStep = 1 | 2 | 3;

type Props = {
  wineId: string;
  step: ReviewStep;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  children: ReactNode;
};

const REVIEW_STEPS: ReviewStep[] = [1, 2, 3];

export const ReviewStepLayout = ({
  wineId,
  step,
  canGoNext,
  onPrevious,
  onNext,
  children,
}: Props) => {
  const { moodTheme } = useMoodTheme();

  const nextArrow = nextArrowByMood[moodTheme] || nextArrowByMood.default;
  const previousArrow =
    previousArrowByMood[moodTheme] || previousArrowByMood.default;

  const backPath = wineId ? `/catalog/${wineId}` : "/catalog";

  return (
    <main className="review-step-layout">
      <div className="container">
        <Link to={backPath} className="review-step-layout__back">
          <img
            className="review-step-layout__back-icon"
            src={backArrowIcon}
            alt=""
            aria-hidden="true"
          />

          <span>Wine</span>
        </Link>

        <section className="review-step-layout__content">
          <SectionTitle title="Review" />

          {children}

          <div className="review-step-layout__navigation">
            <button
              className="review-step-layout__nav-button review-step-layout__nav-button--previous"
              type="button"
              disabled={step === 1}
              onClick={onPrevious}
            >
              <span>Previous step</span>

              <img
                className="review-step-layout__nav-arrow review-step-layout__nav-arrow--previous"
                src={previousArrow}
                alt=""
                aria-hidden="true"
              />
            </button>

            <div
              className="review-step-layout__pagination"
              aria-label="Review progress"
            >
              {REVIEW_STEPS.map((pageStep, index) => (
                <Fragment key={pageStep}>
                  <span
                    className={`review-step-layout__page ${
                      step >= pageStep
                        ? "review-step-layout__page--active"
                        : ""
                    }`}
                  >
                    {pageStep}
                  </span>

                  {index < REVIEW_STEPS.length - 1 && (
                    <span
                      className={`review-step-layout__pagination-line ${
                        step > pageStep
                          ? "review-step-layout__pagination-line--active"
                          : ""
                      }`}
                    />
                  )}
                </Fragment>
              ))}
            </div>

            <button
              className="review-step-layout__nav-button review-step-layout__nav-button--next"
              type="button"
              disabled={!canGoNext}
              onClick={onNext}
            >
              <img
                className="review-step-layout__nav-arrow"
                src={nextArrow}
                alt=""
                aria-hidden="true"
              />

              <span>{step === 3 ? "Confirm review" : "Next step"}</span>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};