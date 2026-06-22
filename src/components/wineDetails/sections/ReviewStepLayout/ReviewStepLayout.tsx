import type { ReactNode } from "react";

import { StepFlowLayout } from "@/components/ui/StepFlowLayout";

export type ReviewStep = 1 | 2 | 3;

type Props = {
  wineId: string;
  step: ReviewStep;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  children: ReactNode;
};

const REVIEW_TOTAL_STEPS = 3;

export const ReviewStepLayout = ({
  wineId,
  step,
  canGoNext,
  onPrevious,
  onNext,
  children,
}: Props) => {
  const backPath = wineId ? `/catalog/${wineId}` : "/catalog";

  return (
    <StepFlowLayout
      title="Review"
      backTo={backPath}
      backLabel="Wine"
      currentStep={step}
      totalSteps={REVIEW_TOTAL_STEPS}
      canGoNext={canGoNext}
      previousLabel="Previous step"
      nextLabel="Next step"
      completedNextLabel="Confirm review"
      progressAriaLabel="Review progress"
      className="review-step-layout"
      onPrevious={onPrevious}
      onNext={onNext}
    >
      {children}
    </StepFlowLayout>
  );
};