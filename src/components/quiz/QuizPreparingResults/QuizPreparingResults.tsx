import { WineGlassLoader } from "@/components/ui/WineGlassLoader";

import "./QuizPreparingResults.scss";

type Props = {
  isOpen: boolean;
};

export const QuizPreparingResults = ({ isOpen }: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="quiz-preparing-results" aria-live="polite">
      <div className="quiz-preparing-results__content">
        <div className="quiz-preparing-results__loader">
          <WineGlassLoader />
        </div>

        <h2 className="quiz-preparing-results__title">
          Preparing your results
        </h2>

        <p className="quiz-preparing-results__text">
          Analyzing your answers....
        </p>
      </div>
    </div>
  );
};