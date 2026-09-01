import {
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router";

import {
  useDeleteReview,
  useUserReviews,
} from "@/hooks/reviews/useReviewMutations.ts";

import { useExpandableSection } from "@/hooks/ui/useExpandableSection";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionState } from "@/components/ui/SectionState";
import { MoodLinkButton } from "@/components/ui/MoodLinkButton";

import type { UserReviewDto } from "@/types/reviews";

import "./UserReviewsList.scss";

const INITIAL_VISIBLE_COUNT = 5;

const formatReviewDate = (
  value: string,
) => {
  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    },
  ).format(new Date(value));
};

type UserReviewsListProps = {
  initialReviews: UserReviewDto[];
};

export const UserReviewsList = ({
  initialReviews,
}: UserReviewsListProps) => {
  const {
    data: reviews = initialReviews,
    isLoading,
    isError,
  } = useUserReviews(
    initialReviews,
  );

  const deleteMutation =
    useDeleteReview();

  const navigate =
    useNavigate();

  const [
    reviewToDelete,
    setReviewToDelete,
  ] = useState<number | null>(
    null,
  );

  const {
    isOpen,
    isVisible,
    titleRef,
    toggleOpen,
  } = useExpandableSection();

  const visibleReviews = useMemo(
    () =>
      reviews.slice(
        0,
        INITIAL_VISIBLE_COUNT,
      ),
    [reviews],
  );

  const extraReviews = useMemo(
    () =>
      reviews.slice(
        INITIAL_VISIBLE_COUNT,
      ),
    [reviews],
  );

  const hasMore =
    extraReviews.length > 0;

  const renderReview = (
    review: UserReviewDto,
  ) => {
    return (
      <div
        className="user-reviews__card"
        key={review.reviewId}
      >
        <div
          className="user-reviews__wine"
          onClick={() =>
            navigate(
              `/catalog/${review.wineId}`,
            )
          }
        >
          <img
            src={review.wineImageUrl}
            alt={review.wineName}
          />

          <div className="user-reviews__wine-info">
            <h4>
              {review.wineName}
            </h4>

            <span>
              ⭐ {review.rating}
            </span>
          </div>
        </div>

        <p className="user-reviews__text">
          {review.reviewText}
        </p>

        <div className="user-reviews__date">
          {formatReviewDate(
            review.createdAt,
          )}
        </div>

        <div className="user-reviews__actions">
          <button
            className="user-reviews__btn"
            type="button"
            onClick={() =>
              navigate(
                `/catalog/${review.wineId}/review`,
              )
            }
          >
            Edit
          </button>

          <button
            className="user-reviews__btn user-reviews__btn--danger"
            type="button"
            onClick={() =>
              setReviewToDelete(
                review.reviewId,
              )
            }
          >
            Delete
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="user-reviews">
      <div
        ref={titleRef}
        className="user-reviews__top"
      >
        <SectionTitle
          title="My Reviews"
        />
      </div>

      {isLoading &&
        !reviews.length && (
          <SectionState
            variant="loading"
            text="Loading your reviews..."
          />
        )}

      {isError &&
        !reviews.length && (
          <SectionState
            variant="error"
            text="Failed to load reviews."
          />
        )}

      {!isLoading &&
        !isError &&
        !reviews.length && (
          <SectionState
            variant="empty"
            text="You haven't written any reviews yet."
          />
        )}

      {!!reviews.length && (
        <>
          <div className="user-reviews__list">
            {visibleReviews.map(
              renderReview,
            )}

            {hasMore &&
              isOpen && (
                <div
                  className={`user-reviews__extra ${
                    isVisible
                      ? "user-reviews__extra--visible"
                      : ""
                  }`}
                >
                  <div className="user-reviews__extra-inner">
                    {extraReviews.map(
                      renderReview,
                    )}
                  </div>
                </div>
              )}
          </div>

          {hasMore && (
            <div className="user-reviews__actions-bottom">
              <MoodLinkButton
                className="user-reviews__view-all"
                text={
                  isOpen
                    ? "Hide Reviews"
                    : "View All Reviews"
                }
                onClick={
                  toggleOpen
                }
              />
            </div>
          )}
        </>
      )}

      {reviewToDelete !== null && (
        <div className="user-reviews__modal-overlay">
          <div className="user-reviews__modal">
            <h3>
              Delete review?
            </h3>

            <p>
              This action cannot
              be undone.
            </p>

            <div className="user-reviews__modal-actions">
              <button
                className="user-reviews__btn"
                type="button"
                onClick={() =>
                  setReviewToDelete(
                    null,
                  )
                }
              >
                Cancel
              </button>

              <button
                className="user-reviews__btn user-reviews__btn--danger"
                type="button"
                disabled={
                  deleteMutation.isPending
                }
                onClick={() => {
                  deleteMutation.mutate(
                    reviewToDelete,
                    {
                      onSuccess:
                        () =>
                          setReviewToDelete(
                            null,
                          ),
                    },
                  );
                }}
              >
                {deleteMutation.isPending
                  ? "Deleting..."
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};