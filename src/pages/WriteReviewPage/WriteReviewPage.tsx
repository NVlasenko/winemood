import { useCallback, useEffect, useMemo, useState } from "react";
import type { MouseEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWineReviews } from "@/hooks/reviews/useWineReviews";
import messageIcon from "@/assets/images/icons/message.svg";
import personIcon from "@/assets/images/icons/person.svg";
import {
  ReviewStepLayout,
  type ReviewStep,
} from "@/components/wineDetails/sections/ReviewStepLayout";
import { useAuth } from "@/context/AuthContext";

import "./WriteReviewPage.scss";
import {
  useCreateReview,
  useUpdateReview,
} from "@/hooks/reviews/useReviewMutations.ts";
import { invalidateUserData } from "@/shared/lib/invalidateUserData";
import { useQueryClient } from "@tanstack/react-query";
import { refetchAchievementsSafe } from "@/shared/lib/refetchAchievementsSafe";

const STARS = [1, 2, 3, 4, 5] as const;

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
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [submittedMode, setSubmittedMode] = useState<"create" | "edit" | null>(
    null
  );
  const { user } = useAuth();
  const authorName = user?.name || "";
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const currentRating = hoverRating || rating;
  const wineId = Number(id);

  const { data: wineReviews = [] } = useWineReviews(wineId);
  const createReview = useCreateReview(wineId);
  const updateReview = useUpdateReview(wineId);

  const myReview = useMemo(() => {
    if (!user) return null;
    return wineReviews.find((r) => r.userId === Number(user.id));
  }, [wineReviews, user]);

  if (!id || Number.isNaN(wineId)) return null;

  useEffect(() => {
    if (!myReview || isSubmitted || submittedMode) return;

    setMode("edit");
    setRating(myReview.rating);
    setReviewText(myReview.reviewText);
  }, [myReview, isSubmitted, submittedMode]);

  const canGoNext = useMemo(() => {
    switch (step) {
      case 1:
        return rating > 0;

      case 2:
        return reviewText.trim().length >= 5;

      case 3:
        return true;

      default:
        return false;
    }
  }, [step, rating, reviewText]);

  const getRatingFromPointer = (
    event: MouseEvent<HTMLButtonElement>,
    star: number
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const percent = Math.min(Math.max(pointerX / rect.width, 0), 1);
    const preciseRating = star - 1 + percent;

    return Number(preciseRating.toFixed(2));
  };

  const handleStarClick = (
    event: MouseEvent<HTMLButtonElement>,
    star: number
  ) => {
    setRating(getRatingFromPointer(event, star));
  };

  const handleStarMove = (
    event: MouseEvent<HTMLButtonElement>,
    star: number
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
    if (mode === "edit" && myReview) {
      setSubmittedMode("edit");

      updateReview.mutate(
        {
          reviewId: myReview.id,
          rating,
          reviewText,
        },
        {
          onSuccess: async () => {
            setIsSubmitted(true);

            invalidateUserData(user?.id);

            await refetchAchievementsSafe(queryClient, user?.id);

            setTimeout(() => {
              queryClient.refetchQueries({
                queryKey: ["achievements", user?.id],
              });
            }, 500);

            setTimeout(() => {
              navigate("/profile");
            }, 1800);
          },
        }
      );
    } else {
      setSubmittedMode("create");

      createReview.mutate(
        {
          rating,
          reviewText,
        },
        {
          onSuccess: async () => {
            setIsSubmitted(true);

            invalidateUserData(user?.id);

            await refetchAchievementsSafe(queryClient, user?.id);

            setTimeout(() => {
              queryClient.refetchQueries({
                queryKey: ["achievements", user?.id],
              });
            }, 500);

            setTimeout(() => {
              navigate(`/catalog/${wineId}`);
            }, 1500);
          },
        }
      );
    }
  }, [
    myReview,
    rating,
    reviewText,
    updateReview,
    createReview,
    navigate,
    wineId,
    user,
  ]);

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
            "How would you rate this wine?"
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
                    style={{
                      clipPath: `inset(0 ${100 - fillPercent}% 0 0)`,
                    }}
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

            <div className="write-review-page__input">{authorName}</div>
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
              <div className="write-review-page__success">
                <div className="write-review-page__success-icon">✓</div>

                <h3 className="write-review-page__modal-title">
                  {submittedMode === "edit"
                    ? "Review updated"
                    : "Review submitted"}
                </h3>

                <p className="write-review-page__modal-success-text">
                  Thank you for sharing your experience with the community.
                </p>
              </div>
            ) : (
              <>
                <h3 className="write-review-page__modal-title">
                  {mode === "edit"
                    ? "Update your review"
                    : "Confirm your review"}
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
                  disabled={
                    mode === "edit"
                      ? updateReview.isPending
                      : createReview.isPending
                  }
                >
                  {mode === "edit"
                    ? updateReview.isPending
                      ? "Updating..."
                      : "Update review"
                    : createReview.isPending
                    ? "Sending..."
                    : "Submit review"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </ReviewStepLayout>
  );
};
