import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
  useSearchParams,
} from "react-router";

import { useExpandableSection } from "@/hooks/ui/useExpandableSection";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionState } from "@/components/ui/SectionState";
import { MoodLinkButton } from "@/components/ui/MoodLinkButton";

import {
  useDeleteReview,
  useUserReviews,
} from "@/hooks/reviews/useReviewMutations";

import type { UserReviewDto } from "@/types/reviews";

import "./UserReviewsList.scss";

const INITIAL_VISIBLE_COUNT = 5;
const TARGET_URL_CLEANUP_DELAY = 3_000;

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
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

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

  const targetReviewRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const [
    reviewToDelete,
    setReviewToDelete,
  ] = useState<number | null>(
    null,
  );

  const [
    hasScrolledToTarget,
    setHasScrolledToTarget,
  ] = useState(false);

  const [
    targetWineId,
  ] = useState<number | null>(
    () => {
      if (
        searchParams.get(
          "section",
        ) !== "reviews"
      ) {
        return null;
      }

      const value =
        searchParams.get(
          "wineId",
        );

      if (!value) {
        return null;
      }

      const wineId =
        Number(value);

      return Number.isFinite(
        wineId,
      )
        ? wineId
        : null;
    },
  );

  const {
    isOpen,
    isVisible,
    titleRef,
    toggleOpen,
    open,
  } = useExpandableSection();

  const targetReviewIndex =
    useMemo(() => {
      if (
        targetWineId === null
      ) {
        return -1;
      }

      return reviews.findIndex(
        (review) =>
          review.wineId ===
          targetWineId,
      );
    }, [
      reviews,
      targetWineId,
    ]);

  const targetIsExtra =
    targetReviewIndex >=
    INITIAL_VISIBLE_COUNT;

  useEffect(() => {
    if (
      targetReviewIndex === -1 ||
      hasScrolledToTarget
    ) {
      return;
    }

    if (
      targetIsExtra &&
      !isOpen
    ) {
      open();

      return;
    }

    if (
      targetIsExtra &&
      !isVisible
    ) {
      return;
    }

    const element =
      targetReviewRef.current;

    if (!element) {
      return;
    }

    element.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setHasScrolledToTarget(
      true,
    );
  }, [
    targetReviewIndex,
    targetIsExtra,
    isOpen,
    isVisible,
    open,
    hasScrolledToTarget,
  ]);

  useEffect(() => {
    if (
      !hasScrolledToTarget ||
      targetWineId === null
    ) {
      return;
    }

    const cleanupTimeout =
      window.setTimeout(() => {
        setSearchParams(
          (currentParams) => {
            const nextParams =
              new URLSearchParams(
                currentParams,
              );

            nextParams.delete(
              "section",
            );

            nextParams.delete(
              "wineId",
            );

            return nextParams;
          },
          {
            replace: true,
            preventScrollReset: true,
          },
        );
      }, TARGET_URL_CLEANUP_DELAY);

    return () => {
      window.clearTimeout(
        cleanupTimeout,
      );
    };
  }, [
    hasScrolledToTarget,
    targetWineId,
    setSearchParams,
  ]);

  const visibleReviews =
    useMemo(
      () =>
        reviews.slice(
          0,
          INITIAL_VISIBLE_COUNT,
        ),
      [reviews],
    );

  const extraReviews =
    useMemo(
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
    const isTarget =
      review.wineId ===
      targetWineId;

    const navigateToWine = () => {
      navigate(
        `/catalog/${review.wineId}`,
      );
    };

    return (
      <div
        ref={
          isTarget
            ? targetReviewRef
            : undefined
        }
        className={`user-reviews__card ${
          isTarget
            ? "user-reviews__card--highlighted"
            : ""
        }`}
        key={review.reviewId}
        role="link"
        tabIndex={0}
        onClick={navigateToWine}
        onKeyDown={(event) => {
          if (
            event.key === "Enter" ||
            event.key === " "
          ) {
            event.preventDefault();

            navigateToWine();
          }
        }}
      >
        <div className="user-reviews__wine">
          <img
            src={
              review.wineImageUrl
            }
            alt={review.wineName}
            loading="lazy"
            decoding="async"
          />

          <div className="user-reviews__wine-info">
            <h3>
              {review.wineName}
            </h3>

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
            onClick={(event) => {
              event.stopPropagation();

              navigate(
                `/catalog/${review.wineId}/review`,
              );
            }}
          >
            Edit
          </button>

          <button
            className="user-reviews__btn user-reviews__btn--danger"
            type="button"
            onClick={(event) => {
              event.stopPropagation();

              setReviewToDelete(
                review.reviewId,
              );
            }}
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

      {reviewToDelete !==
        null && (
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