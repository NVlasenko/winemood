import { useMemo } from "react";

import { useMoodTheme } from "@/context/MoodThemeContext";

import "./QuizQuestion.scss";

export type QuizQuestionOption = {
  id: string;
  title: string;
  description: string;
  images: Record<string, string>;
};

type Props = {
  step: number;
  totalSteps: number;
  question: string;
  options: QuizQuestionOption[];
  selectedOptionId: string | null;
  onSelectOption: (optionId: string) => void;
};

export const QuizQuestion = ({
  step,
  totalSteps,
  question,
  options,
  selectedOptionId,
  onSelectOption,
}: Props) => {
  const { moodTheme } = useMoodTheme();

  const preparedOptions = useMemo(
    () =>
      options.map((option) => ({
        ...option,
        image: option.images[moodTheme] || option.images.default,
      })),
    [moodTheme, options],
  );

  const isCompact = preparedOptions.length > 5;

  return (
    <div
      className={`quiz-question ${
        isCompact ? "quiz-question--compact" : ""
      }`}
    >
      <p className="quiz-question__step">
        Question {step} of {totalSteps}
      </p>

      <h2 className="quiz-question__question">{question}</h2>

      <div
        className={`quiz-question__options ${
          preparedOptions.length <= 3 ? "quiz-question__options--stretch" : ""
        }`}
      >
        {preparedOptions.map((option) => {
          const isSelected = selectedOptionId === option.id;

          return (
            <button
              key={option.id}
              className={`quiz-question__card ${
                isSelected ? "quiz-question__card--selected" : ""
              }`}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelectOption(option.id)}
            >
              {isSelected && (
                <span className="quiz-question__check" aria-hidden="true">
                  ✓
                </span>
              )}

              <img
                className="quiz-question__icon"
                src={option.image}
                alt=""
                aria-hidden="true"
              />

              <span className="quiz-question__title">{option.title}</span>

              {option.description && (
                <span className="quiz-question__description">
                  {option.description}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};