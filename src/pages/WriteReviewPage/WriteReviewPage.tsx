import { useState } from "react";

import { ReviewStepLayout } from "@/components/WineCard/components/review";
import { useNavigate, useParams } from "react-router-dom";
import messageIcon from "@/assets/images/icons/message.svg";
import personIcon from "@/assets/images/icons/person.svg";

import "./WriteReviewPage.scss";

const STARS = [1, 2, 3, 4, 5];

export const WriteReviewPage = () => {
  const [step, setStep] = useState(1);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const currentRating = hoverRating || rating;

  const canGoNext =
    step === 1
      ? !!rating
      : step === 2
        ? reviewText.trim().length >= 5
        : authorName.trim().length >= 2;

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
    if (!canGoNext) {
      return;
    }

    if (step === 3) {
      setIsConfirmOpen(true);
      return;
    }

    setStep((prev) => prev + 1);
  };

  const handleCloseModal = () => {
    setIsConfirmOpen(false);
    setIsSubmitted(false);
  };

  const handleSubmitReview = async () => {
    setIsSubmitted(true);
  
    setTimeout(() => {
      setRating(0);
      setHoverRating(0);
      setReviewText("");
      setAuthorName("");
      setStep(1);
  
      setIsConfirmOpen(false);
      setIsSubmitted(false);
  
      navigate(`/catalog/${id}`);
    }, 2000);
  };

  return (
    <ReviewStepLayout
      wineId={id || ""}
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

          
            <p className="write-review-page__rating-value">
              {currentRating ? currentRating.toFixed(2) : "0.00"}
            </p>
            

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
              onChange={(event) => setAuthorName(event.target.value)}
              maxLength={40}
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
              aria-label="Close modal"
            >
              ×
            </button>

            {isSubmitted ? (
             <>
              <div className="write-review-page__success-icon">
                ✓
              </div>

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
                    <span className="write-review-page__modal-label">Rating</span>
                    <strong className="write-review-page__modal-value">{rating}</strong>
                  </div>

                  <div className="write-review-page__modal-row">
                    <span className="write-review-page__modal-label">Review</span>
                    <p className="write-review-page__modal-review">{reviewText}</p>
                  </div>

                  <div className="write-review-page__modal-row">
                    <span className="write-review-page__modal-label">Name</span>
                    <strong className="write-review-page__modal-value">{authorName}</strong>
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