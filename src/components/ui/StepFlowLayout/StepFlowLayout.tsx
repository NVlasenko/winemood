import type { ReactNode } from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

import arrowRight from "@/assets/images/icons/arrow-right.svg";
import backArrowIcon from "@/assets/images/icons/arrow-right.svg";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useMoodTheme } from "@/context/MoodThemeContext";

import {
  nextArrowByMood,
  previousArrowByMood,
} from "./config/stepFlowArrows";

import "./StepFlowLayout.scss";

type Props = {
  title: string;
  backTo: string;
  backLabel: string;
  currentStep: number;
  totalSteps: number;
  canGoNext: boolean;
  canGoPrevious?: boolean;
  previousLabel: string;
  nextLabel: string;
  completedNextLabel?: string;
  progressAriaLabel: string;
  className?: string;
  onPrevious: () => void;
  onNext: () => void;
  children: ReactNode;
};

const buildSteps = (totalSteps: number) => {
  return Array.from({ length: totalSteps }, (_, index) => index + 1);
};

export const StepFlowLayout = ({
  title,
  backTo,
  backLabel,
  currentStep,
  totalSteps,
  canGoNext,
  canGoPrevious = currentStep > 1,
  previousLabel,
  nextLabel,
  completedNextLabel,
  progressAriaLabel,
  className = "",
  onPrevious,
  onNext,
  children,
}: Props) => {
  const { moodTheme } = useMoodTheme();

  const nextArrow = nextArrowByMood[moodTheme] || nextArrowByMood.default;
  const previousArrow =
    previousArrowByMood[moodTheme] || previousArrowByMood.default;

  const steps = buildSteps(totalSteps);
  const isLastStep = currentStep === totalSteps;
  const finishLabel = completedNextLabel || nextLabel;

  return (
    <main className={`step-flow-layout ${className}`.trim()}>
      <div className="container">
        <Link to={backTo} className="step-flow-layout__back">
          <img
            className="step-flow-layout__back-icon"
            src={backArrowIcon}
            alt=""
            aria-hidden="true"
          />

          <span>{backLabel}</span>
        </Link>

        <section className="step-flow-layout__content">
          <SectionTitle title={title} />

          {children}

          <div className="step-flow-layout__navigation">
            <button
              className="step-flow-layout__nav-button step-flow-layout__nav-button--previous"
              type="button"
              disabled={!canGoPrevious}
              onClick={onPrevious}
            >
              <span>{previousLabel}</span>

              <img
                className="step-flow-layout__nav-arrow step-flow-layout__nav-arrow--previous"
                src={previousArrow}
                alt=""
                aria-hidden="true"
              />
            </button>

            <div
              className="step-flow-layout__pagination"
              aria-label={progressAriaLabel}
            >
              {steps.map((step, index) => (
                <Fragment key={step}>
                  <span
                    className={`step-flow-layout__page ${
                      currentStep >= step ? "step-flow-layout__page--active" : ""
                    }`}
                  >
                    {step}
                  </span>

                  {index < steps.length - 1 && (
                    <span
                      className={`step-flow-layout__pagination-line ${
                        currentStep > step
                          ? "step-flow-layout__pagination-line--active"
                          : ""
                      }`}
                    />
                  )}
                </Fragment>
              ))}
            </div>

            {isLastStep ? (
              <button
                className="button-primary step-flow-layout__finish-button"
                type="button"
                disabled={!canGoNext}
                onClick={onNext}
              >
                <span>{finishLabel}</span>

                <img
                  className="step-flow-layout__finish-arrow"
                  src={arrowRight}
                  alt=""
                  aria-hidden="true"
                />
              </button>
            ) : (
              <button
                className="step-flow-layout__nav-button step-flow-layout__nav-button--next"
                type="button"
                disabled={!canGoNext}
                onClick={onNext}
              >
                <img
                  className="step-flow-layout__nav-arrow"
                  src={nextArrow}
                  alt=""
                  aria-hidden="true"
                />

                <span>{nextLabel}</span>
              </button>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};