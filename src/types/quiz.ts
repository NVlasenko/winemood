import type { ComponentType, SVGProps } from "react";
import type { WineCatalogCard } from "./wineCatalogCard";

export type QuizExperienceLevel = "beginner" | "enthusiast" | "connoisseur";

export type QuizApiExperienceLevel = "BEGINNER" | "ENTHUSIAST" | "CONNOISSEUR";

export type QuizApiAnswerField =
  | "WINE_TYPE"
  | "SWEETNESS"
  | "COUNTRY"
  | "REGION"
  | "GRAPE_VARIETY"
  | "FOOD_CATEGORY"
  | "AROMA_NOTES"
  | "PRICE_LEVEL"
  | "AGING_POTENTIAL"
  | "WINE_STYLE"
  | "ENVIRONMENTAL_ATTRIBUTES"
  | "EVENT";

export type QuizQuestionOption = {
  id: string;
  title: string;
  description: string;
  apiValue: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type QuizQuestionConfig = {
  step: number;
  question: string;
  apiField: QuizApiAnswerField;
  options: QuizQuestionOption[];
};

export type QuizRequestDto = {
  experienceLevel: QuizApiExperienceLevel;
  answers: Partial<Record<QuizApiAnswerField, string>>;
};

export type QuizHistoryResponse = {
  id: number;
  createdAt: string;
  wines: WineCatalogCard[];
};