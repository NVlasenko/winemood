import type { ReactNode } from "react";
import { StepFlowLayout } from "@/components/ui/StepFlowLayout";

export type ReviewStep = 1 | 2 | 3;

type Props = {
  wineId: number;
  step: ReviewStep;
  canGoNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  children: ReactNode;
  isEdit?: boolean;
};

const REVIEW_TOTAL_STEPS = 3;

export const ReviewStepLayout = ({
  wineId,
  step,
  canGoNext,
  onPrevious,
  onNext,
  children,
  isEdit = false,
}: Props) => {
  const backPath = isEdit
    ? "/profile"
    : `/catalog/${wineId}`;

  return (
    <StepFlowLayout
      title="Review"
      backTo={backPath}
      backLabel="Back"
      currentStep={step}
      totalSteps={REVIEW_TOTAL_STEPS}
      canGoNext={canGoNext}
      previousLabel="Previous step"
      nextLabel="Next step"
      completedNextLabel={isEdit ? "Update review" : "Submit review"}
      progressAriaLabel="Review progress"
      className="review-step-layout"
      onPrevious={onPrevious}
      onNext={onNext}
    >
      {children}
    </StepFlowLayout>
  );
};