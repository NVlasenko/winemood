import type { QuizQuestionOption } from "@/types/quiz";
import "./QuizQuestion.scss";

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
  const isCompact = options.length >= 5;

  return (
    <div className={`quiz-question ${isCompact ? "quiz-question--compact" : ""}`}>
      <p className="quiz-question__step">
        Question {step} of {totalSteps}
      </p>

      <h2 className="quiz-question__question">{question}</h2>

      <div
        className={`quiz-question__options ${
          options.length <= 3 ? "quiz-question__options--stretch" : ""
        }`}
      >
        {options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const Icon = option.Icon;

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

              <Icon
                className="quiz-question__icon"
                aria-hidden="true"
                focusable="false"
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