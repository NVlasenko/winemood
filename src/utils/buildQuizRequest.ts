import type {
  QuizExperienceLevel,
  QuizQuestionConfig,
  QuizRequestDto,
} from "@/types/quiz";

const EXPERIENCE_LEVEL_MAP: Record<
  QuizExperienceLevel,
  QuizRequestDto["experienceLevel"]
> = {
  beginner: "BEGINNER",
  enthusiast: "ENTHUSIAST",
  connoisseur: "CONNOISSEUR",
};

export const buildQuizRequest = (
  experienceLevel: QuizExperienceLevel,
  questions: QuizQuestionConfig[],
  selectedAnswers: Record<number, string>,
): QuizRequestDto => {
  const mappedLevel = EXPERIENCE_LEVEL_MAP[experienceLevel];

  if (!mappedLevel) {
    throw new Error(`Unsupported experience level: ${experienceLevel}`);
  }

  const answers: QuizRequestDto["answers"] = {};

  for (const question of questions) {
    const selectedOptionId = selectedAnswers[question.step];

    if (!selectedOptionId) continue;

    const selectedOption = question.options.find(
      (option) => option.id === selectedOptionId,
    );

    if (!selectedOption) {
      continue;
    }

    if (!selectedOption.apiValue) {
      continue;
    }

    if (answers[question.apiField]) {
      console.warn(
        `Duplicate apiField detected: ${question.apiField}`,
      );
    }

    answers[question.apiField] = selectedOption.apiValue;
  }

  return {
    experienceLevel: mappedLevel,
    answers,
  };
};