import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { useWineReviews } from "@/hooks/reviews/useWineReviews";

import {
  ReviewStepLayout,
  type ReviewStep,
} from "@/components/wineDetails/sections/ReviewStepLayout";
import { useUpdateReview } from "@/hooks/reviews/useReviewMutations.ts";

export const EditReviewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!id) return null;

  const wineId = Number(id);

  const { data: wineReviews = [] } = useWineReviews(wineId);

  const myReview = useMemo(() => {
    if (!user) return null;

    return wineReviews.find(
      (review) => review.userId === user.id
    );
  }, [wineReviews, user]);

  const updateReview = useUpdateReview(wineId);

  const [step, setStep] = useState<ReviewStep>(1);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    if (!myReview) return;

    setRating(myReview.rating);
    setReviewText(myReview.reviewText);
  }, [myReview]);

  const handleSubmit = useCallback(() => {
    if (!myReview) return;

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
      }
    );
  }, [myReview, rating, reviewText, updateReview, navigate]);

  return (
    <ReviewStepLayout
      wineId={wineId}
      step={step}
      canGoNext={true}
      onNext={() => setIsConfirmOpen(true)}
      onPrevious={() => setStep(1)}
    >
      <h2>Update your review</h2>

      {isConfirmOpen && (
        <div style={{ marginTop: 20 }}>
          {updateReview.isSuccess ? (
            <h3>Review updated</h3>
          ) : (
            <button onClick={handleSubmit}>
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