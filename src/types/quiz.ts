import type { ComponentType, SVGProps } from "react";

export type QuizQuestionOption = {
  id: string;
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export type QuizQuestionConfig = {
  step: number;
  question: string;
  options: QuizQuestionOption[];
};