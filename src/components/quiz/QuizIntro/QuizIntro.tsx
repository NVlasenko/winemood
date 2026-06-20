import { useMemo } from "react";

import { useMoodTheme } from "@/context/MoodThemeContext";

import {
  beginnerImages,
  connoisseurImages,
  enthusiastImages,
} from "./config";

import "./QuizIntro.scss";

export type QuizExperienceLevel = "beginner" | "enthusiast" | "connoisseur";

type QuizIntroOption = {
  id: QuizExperienceLevel;
  title: string;
  description: string;
  images: Record<string, string>;
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
    images: beginnerImages,
  },
  {
    id: "enthusiast",
    title: "Enthusiast",
    description: "I already know what I like. I want something in my style",
    images: enthusiastImages,
  },
  {
    id: "connoisseur",
    title: "Connoisseur",
    description: "I’m basically a sommelier here. I need details and precision",
    images: connoisseurImages,
  },
];

export const QuizIntro = ({ selectedLevel, onSelectLevel }: Props) => {
  const { moodTheme } = useMoodTheme();

  const options = useMemo(
    () =>
      QUIZ_INTRO_OPTIONS.map((option) => ({
        ...option,
        image: option.images[moodTheme] || option.images.default,
      })),
    [moodTheme],
  );

  return (
    <div className="quiz-intro">
      <p className="quiz-intro__step">Question 1 of 6</p>

      <h2 className="quiz-intro__question">
        How would you describe your relationship with wine?
      </h2>

      <div className="quiz-intro__options">
        {options.map((option) => {
          const isSelected = selectedLevel === option.id;

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

              <img
                className="quiz-intro__icon"
                src={option.image}
                alt=""
                aria-hidden="true"
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