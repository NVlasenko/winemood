import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router";

import { useAuth } from "@/context/AuthContext";

import { useWineReviews } from "@/hooks/reviews/useWineReviews";

import {
  useUpdateReview,
} from "@/hooks/reviews/useReviewMutations.ts";

import {
  ReviewStepLayout,
  type ReviewStep,
} from "@/components/wineDetails/sections/ReviewStepLayout";

export const EditReviewPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const wineId = Number(id);

  const {
    data: wineReviews = [],
  } = useWineReviews(wineId);

  const updateReview =
    useUpdateReview(wineId);

  const [step, setStep] =
    useState<ReviewStep>(1);

  const [rating, setRating] =
    useState(0);

  const [reviewText, setReviewText] =
    useState("");

  const [
    isConfirmOpen,
    setIsConfirmOpen,
  ] = useState(false);

  const myReview = useMemo(() => {
    if (!user) {
      return null;
    }

    return (
      wineReviews.find(
        (review) =>
          review.userId === user.id,
      ) ?? null
    );
  }, [
    wineReviews,
    user,
  ]);

  useEffect(() => {
    if (!myReview) {
      return;
    }

    setRating(myReview.rating);
    setReviewText(
      myReview.reviewText,
    );
  }, [myReview]);

  const handleSubmit =
    useCallback(() => {
      if (!myReview) {
        return;
      }

      updateReview.mutate(
        {
          reviewId: myReview.id,
          rating,
          reviewText,
        },
        {
          onSuccess: () => {
            setTimeout(() => {
              navigate("/profile");
            }, 1000);
          },
        },
      );
    }, [
      myReview,
      rating,
      reviewText,
      updateReview,
      navigate,
    ]);

  if (
    !id ||
    !Number.isInteger(wineId) ||
    wineId <= 0
  ) {
    return null;
  }

  return (
    <ReviewStepLayout
      wineId={wineId}
      step={step}
      canGoNext={true}
      onNext={() =>
        setIsConfirmOpen(true)
      }
      onPrevious={() =>
        setStep(1)
      }
      isEdit
    >
      <h2>
        Update your review
      </h2>

      {isConfirmOpen && (
        <div
          style={{
            marginTop: 20,
          }}
        >
          {updateReview.isSuccess ? (
            <h3>
              Review updated
            </h3>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                updateReview.isPending
              }
            >
              {updateReview.isPending
                ? "Saving..."
                : "Update review"}
            </button>
          )}
        </div>
      )}
    </ReviewStepLayout>
  );
};