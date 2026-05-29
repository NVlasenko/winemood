import { useState } from "react";
import "./WriteReviewPage.scss";
import { ReviewStepLayout } from "@/components/WineCard/components/review";

const STARS = [1, 2, 3, 4, 5];

export const WriteReviewPage = () => {
  const [step, setStep] = useState(1);

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const currentRating = hoverRating || rating;

  const getRatingFromPointer = (
    event: React.MouseEvent<HTMLButtonElement>,
    star: number,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const pointerX = event.clientX - rect.left;

    const percent = Math.min(Math.max(pointerX / rect.width, 0), 1);

    const preciseRating = star - 1 + percent;

    return Number(preciseRating.toFixed(2));
  };

  const handleStarClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    star: number,
  ) => {
    setRating(getRatingFromPointer(event, star));
  };

  const handleStarMove = (
    event: React.MouseEvent<HTMLButtonElement>,
    star: number,
  ) => {
    setHoverRating(getRatingFromPointer(event, star));
  };

  const handlePreviousStep = () => {
    if (step === 1) {
      return;
    }

    setStep((prev) => prev - 1);
  };

  const handleNextStep = () => {
    if (step === 1 && !rating) {
      return;
    }

    setStep((prev) => prev + 1);

    console.log({
      rating,
    });
  };

  return (
    <ReviewStepLayout
      wineId="39"
      step={step}
      canGoNext={!!rating}
      onPrevious={handlePreviousStep}
      onNext={handleNextStep}
    >
      {step === 1 && (
        <div className="write-review-page__step">
          <h2 className="write-review-page__subtitle">
            How would you rate this wine?
          </h2>

          <div
            className="write-review-page__stars"
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`Rating ${currentRating} out of 5`}
          >
            {STARS.map((star) => {
              const fillPercent =
                Math.min(Math.max(currentRating - (star - 1), 0), 1) * 100;

              return (
                <button
                  key={star}
                  type="button"
                  className="write-review-page__star"
                  onClick={(event) => handleStarClick(event, star)}
                  onMouseMove={(event) => handleStarMove(event, star)}
                  aria-label={`Rate ${star} star`}
                >
                  <span className="write-review-page__star-bg">☆</span>

                  <span
                    className="write-review-page__star-fill"
                    style={{ width: `${fillPercent}%` }}
                  >
                    ★
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="write-review-page__step">
          <h2 className="write-review-page__subtitle">
            Tell us about your experience
          </h2>
        </div>
      )}

      {step === 3 && (
        <div className="write-review-page__step">
          <h2 className="write-review-page__subtitle">
            Final information
          </h2>
        </div>
      )}
    </ReviewStepLayout>
  );
};