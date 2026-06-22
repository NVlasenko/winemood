export type QuizExperienceLevel = "beginner" | "enthusiast" | "connoisseur";

export type QuizIntroOption = {
  id: QuizExperienceLevel;
  title: string;
  description: string;
};