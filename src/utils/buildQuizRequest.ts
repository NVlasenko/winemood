import type {
  QuizExperienceLevel,
  QuizQuestionConfig,
  QuizRequestDto,
} from "@/types/quiz";

const experienceLevelByLevel: Record<
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
  const answers = questions.reduce<QuizRequestDto["answers"]>(
    (acc, question) => {
      const selectedOptionId = selectedAnswers[question.step];

      if (!selectedOptionId) {
        return acc;
      }

      const selectedOption = question.options.find(
        (option) => option.id === selectedOptionId,
      );

      if (!selectedOption || !selectedOption.apiValue) {
        return acc;
      }

      acc[question.apiField] = selectedOption.apiValue;

      return acc;
    },
    {},
  );

  return {
    experienceLevel: experienceLevelByLevel[experienceLevel],
    answers,
  };
};