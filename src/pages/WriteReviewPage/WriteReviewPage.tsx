import { useCallback, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";

import messageIcon from "@/assets/images/icons/message.svg";
import personIcon from "@/assets/images/icons/person.svg";
import {
  ReviewStepLayout,
  type ReviewStep,
} from "@/components/wineDetails/sections/ReviewStepLayout";

import "./WriteReviewPage.scss";

const STARS = [1, 2, 3, 4, 5] as const;
const SUBMIT_DELAY_MS = 2000;

const getPreviousStep = (step: ReviewStep): ReviewStep => {
  switch (step) {
    case 1:
      return 1;

    case 2:
      return 1;

    case 3:
      return 2;

    default:
      return 1;
  }
};

const getNextStep = (step: ReviewStep): ReviewStep => {
  switch (step) {
    case 1:
      return 2;

    case 2:
      return 3;

    case 3:
      return 3;

    default:
      return 1;
  }
};

export const WriteReviewPage = () => {
  const [step, setStep] = useState<ReviewStep>(1);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [authorName, setAuthorName] = useState("");

  const submitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();

  const currentRating = hoverRating || rating;
  const wineId = id || "";

  const canGoNext = useMemo(() => {
    switch (step) {
      case 1:
        return rating > 0;

      case 2:
        return reviewText.trim().length >= 5;

      case 3:
        return authorName.trim().length >= 2;

      default:
        return false;
    }
  }, [step, rating, reviewText, authorName]);

  const getRatingFromPointer = (
    event: MouseEvent<HTMLButtonElement>,
    star: number,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const percent = Math.min(Math.max(pointerX / rect.width, 0), 1);
    const preciseRating = star - 1 + percent;

    return Number(preciseRating.toFixed(2));
  };

  const handleStarClick = (
    event: MouseEvent<HTMLButtonElement>,
    star: number,
  ) => {
    setRating(getRatingFromPointer(event, star));
  };

  const handleStarMove = (
    event: MouseEvent<HTMLButtonElement>,
    star: number,
  ) => {
    setHoverRating(getRatingFromPointer(event, star));
  };

  const handlePreviousStep = useCallback(() => {
    setStep((prev) => getPreviousStep(prev));
  }, []);

  const handleNextStep = useCallback(() => {
    if (!canGoNext) {
      return;
    }

    if (step === 3) {
      setIsConfirmOpen(true);
      return;
    }

    setStep((prev) => getNextStep(prev));
  }, [canGoNext, step]);

  const handleCloseModal = useCallback(() => {
    if (isSubmitted) {
      return;
    }

    setIsConfirmOpen(false);
  }, [isSubmitted]);

  const handleSubmitReview = useCallback(async () => {
    setIsSubmitted(true);

    submitTimeoutRef.current = setTimeout(() => {
      setRating(0);
      setHoverRating(0);
      setReviewText("");
      setAuthorName("");
      setStep(1);
      setIsConfirmOpen(false);
      setIsSubmitted(false);

      navigate(wineId ? `/catalog/${wineId}` : "/catalog");
    }, SUBMIT_DELAY_MS);
  }, [navigate, wineId]);

  return (
    <ReviewStepLayout
      wineId={wineId}
      step={step}
      canGoNext={canGoNext}
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
            aria-label={`Rating ${currentRating.toFixed(2)} out of 5`}
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

          <p className="write-review-page__rating-value">
            {currentRating ? currentRating.toFixed(2) : "0.00"}
          </p>
        </div>
      )}

      {step === 2 && (
        <div className="write-review-page__step">
          <h2 className="write-review-page__subtitle">
            Share your experience with wine
          </h2>

          <div className="write-review-page__textarea-wrapper">
            <img
              className="write-review-page__textarea-icon"
              src={messageIcon}
              alt=""
              aria-hidden="true"
            />

            <textarea
              className="write-review-page__textarea"
              value={reviewText}
              maxLength={200}
              placeholder="Share your experience..."
              onChange={(event) => setReviewText(event.target.value)}
            />

            <span className="write-review-page__counter">
              {reviewText.length}/200
            </span>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="write-review-page__step">
          <h2 className="write-review-page__subtitle">About you</h2>

          <div className="write-review-page__input-wrapper">
            <img
              className="write-review-page__input-icon"
              src={personIcon}
              alt=""
              aria-hidden="true"
            />

            <input
              className="write-review-page__input"
              type="text"
              placeholder="Your name"
              value={authorName}
              maxLength={40}
              onChange={(event) => setAuthorName(event.target.value)}
            />
          </div>
        </div>
      )}

      {isConfirmOpen && (
        <div className="write-review-page__modal-overlay">
          <div className="write-review-page__modal">
            <button
              className="write-review-page__modal-close"
              type="button"
              onClick={handleCloseModal}
              disabled={isSubmitted}
              aria-label="Close modal"
            >
              ×
            </button>

            {isSubmitted ? (
              <>
                <div className="write-review-page__success-icon">✓</div>

                <h3 className="write-review-page__modal-title">
                  Review submitted
                </h3>

                <p className="write-review-page__modal-success-text">
                  Thank you for sharing your experience with the community.
                </p>
              </>
            ) : (
              <>
                <h3 className="write-review-page__modal-title">
                  Confirm your review
                </h3>

                <div className="write-review-page__modal-summary">
                  <div className="write-review-page__modal-row">
                    <span className="write-review-page__modal-label">
                      Rating
                    </span>

                    <strong className="write-review-page__modal-value">
                      {rating.toFixed(2)}
                    </strong>
                  </div>

                  <div className="write-review-page__modal-row">
                    <span className="write-review-page__modal-label">
                      Review
                    </span>

                    <p className="write-review-page__modal-review">
                      {reviewText}
                    </p>
                  </div>

                  <div className="write-review-page__modal-row">
                    <span className="write-review-page__modal-label">Name</span>

                    <strong className="write-review-page__modal-value">
                      {authorName}
                    </strong>
                  </div>
                </div>

                <button
                  className="button-primary write-review-page__modal-button"
                  type="button"
                  onClick={handleSubmitReview}
                >
                  Submit review
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </ReviewStepLayout>
  );
};