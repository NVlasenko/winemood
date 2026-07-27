import { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import "./UserReviewsList.scss";
import {
  useDeleteReview,
  useUserReviews,
} from "@/hooks/reviews/useReviewMutations.ts";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { MoodLinkButton } from "@/components/ui/MoodLinkButton";

const INITIAL_VISIBLE_COUNT = 5; // 🔥 как ты хотел

export const UserReviewsList = () => {
  const { data: reviews = [], isLoading } = useUserReviews();
  const deleteMutation = useDeleteReview();
  const navigate = useNavigate();

  const [reviewToDelete, setReviewToDelete] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // 👇 показываем часть или все
  const visibleReviews = useMemo(
    () =>
      isOpen ? reviews : reviews.slice(0, INITIAL_VISIBLE_COUNT),
    [reviews, isOpen]
  );

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const hasMore = reviews.length > INITIAL_VISIBLE_COUNT;

  if (!isLoading && !reviews.length) return null;

  return (
    <section className="user-reviews">
      <SectionTitle title="Your reviews" />

      {isLoading && (
        <div className="user-reviews__loading">
          <p className="user-reviews__loading-title">
            Loading your reviews
          </p>
          <p className="user-reviews__loading-text">
            Please wait while we prepare your content
          </p>
        </div>
      )}

      <div className="user-reviews__list">
        {visibleReviews.map((review) => (
          <div className="user-reviews__card" key={review.reviewId}>
            <div
              className="user-reviews__wine"
              onClick={() => navigate(`/catalog/${review.wineId}`)}
            >
              <img src={review.wineImageUrl} alt={review.wineName} />

              <div className="user-reviews__wine-info">
                <h4>{review.wineName}</h4>
                <span>⭐ {review.rating}</span>
              </div>
            </div>

            <p className="user-reviews__text">{review.reviewText}</p>

            <div className="user-reviews__date">
              {new Date(review.createdAt).toLocaleDateString()}
            </div>

            <div className="user-reviews__actions">
              <button
                className="user-reviews__btn"
                onClick={() =>
                  navigate(`/catalog/${review.wineId}/review`)
                }
              >
                Edit
              </button>

              <button
                className="user-reviews__btn user-reviews__btn--danger"
                onClick={() => setReviewToDelete(review.reviewId)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 КНОПКА КАК В FAVORITES */}
      {hasMore && (
        <div className="user-reviews__actions-bottom">
          <MoodLinkButton
            className="user-reviews__view-all"
            text={isOpen ? "Hide reviews" : "View all reviews"}
            onClick={toggleOpen}
          />
        </div>
      )}

      {/* POPUP */}
      {reviewToDelete && (
        <div className="user-reviews__modal-overlay">
          <div className="user-reviews__modal">
            <h3>Delete review?</h3>
            <p>This action cannot be undone.</p>

            <div className="user-reviews__modal-actions">
              <button
                className="user-reviews__btn"
                onClick={() => setReviewToDelete(null)}
              >
                Cancel
              </button>

              <button
                className="user-reviews__btn user-reviews__btn--danger"
                onClick={() => {
                  deleteMutation.mutate(reviewToDelete, {
                    onSuccess: () => setReviewToDelete(null),
                  });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};