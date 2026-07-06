import type { ComponentType, SVGProps } from "react";

import {
  BeginnerIcon,
  ConnoisseurIcon,
  EnthusiastIcon,
} from "./config";

import "./QuizIntro.scss";

export type QuizExperienceLevel = "beginner" | "enthusiast" | "connoisseur";

type QuizIntroOption = {
  id: QuizExperienceLevel;
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

type Props = {
  selectedLevel: QuizExperienceLevel | null;
  onSelectLevel: (level: QuizExperienceLevel) => void;
};

const QUIZ_INTRO_OPTIONS: QuizIntroOption[] = [
  {
    id: "beginner",
    title: "Beginner",
    description:
      "Just stepping into the bar. Recommend something simple and tasty",
    Icon: BeginnerIcon,
  },
  {
    id: "enthusiast",
    title: "Enthusiast",
    description: "I already know what I like. I want something in my style",
    Icon: EnthusiastIcon,
  },
  {
    id: "connoisseur",
    title: "Connoisseur",
    description: "I’m basically a sommelier here. I need details and precision",
    Icon: ConnoisseurIcon,
  },
];

export const QuizIntro = ({ selectedLevel, onSelectLevel }: Props) => {
  return (
    <div className="quiz-intro">
      <p className="quiz-intro__step">Question 1 of 6</p>

      <h2 className="quiz-intro__question">
        How would you describe your relationship with wine?
      </h2>

      <div className="quiz-intro__options">
        {QUIZ_INTRO_OPTIONS.map((option) => {
          const isSelected = selectedLevel === option.id;
          const Icon = option.Icon;

          return (
            <button
              key={option.id}
              className={`quiz-intro__card ${
                isSelected ? "quiz-intro__card--selected" : ""
              }`}
              type="button"
              onClick={() => onSelectLevel(option.id)}
              aria-pressed={isSelected}
            >
              {isSelected && (
                <span className="quiz-intro__check" aria-hidden="true">
                  ✓
                </span>
              )}

              <Icon
                className="quiz-intro__icon"
                aria-hidden="true"
                focusable="false"
              />

              <span className="quiz-intro__title">{option.title}</span>

              <span className="quiz-intro__description">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};