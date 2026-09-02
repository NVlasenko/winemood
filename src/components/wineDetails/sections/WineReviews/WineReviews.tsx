import {
  useCallback,
  useMemo,
  useState,
} from "react";

import type { Wine } from "@/types/wine";
import type { WineReviewDto } from "@/types/reviews";

import { SectionTitle } from "@/components/ui/SectionTitle";


import { useAuth } from "@/context/AuthContext";

import "./WineReviews.scss";
import { ReviewCard } from "./ReviewCard";
import { WineReviewsActions } from "./WineReviewsActions";

type Props = {
  wine: Wine;
  reviews: WineReviewDto[];
  reviewsBackdropUrl?: string;
};

export const WineReviews = ({
  wine,
  reviews,
  reviewsBackdropUrl,
}: Props) => {
  const [isExpanded, setIsExpanded] =
    useState(false);

  const { user } = useAuth();

  const myReview = useMemo(() => {
    if (!user) {
      return null;
    }

    return (
      reviews.find(
        (review) =>
          review.userId ===
          Number(user.id),
      ) ?? null
    );
  }, [reviews, user]);

  const sortedReviews = useMemo(() => {
    if (!user) {
      return reviews;
    }

    const userId = Number(user.id);

    return [
      ...reviews.filter(
        (review) =>
          review.userId === userId,
      ),
      ...reviews.filter(
        (review) =>
          review.userId !== userId,
      ),
    ];
  }, [reviews, user]);

  const visibleReviews = useMemo(
    () =>
      isExpanded
        ? sortedReviews
        : sortedReviews.slice(0, 2),
    [isExpanded, sortedReviews],
  );

  const hasMoreReviews =
    reviews.length > 2;

  const hasAnyReviews =
    reviews.length > 0;

  const isMateusRose =
    wine.name === "Mateus Rosé";

  const toggleExpanded =
    useCallback(() => {
      setIsExpanded(
        (prev) => !prev,
      );
    }, []);

  return (
    <section className="wine-reviews">
      <div className="container">
        <SectionTitle title="What our customers are saying" />

        <div
          className={`wine-reviews__content ${
            isExpanded
              ? "wine-reviews__content--expanded"
              : ""
          }`}
        >
          <div
            className={`wine-reviews__list ${
              isExpanded
                ? "wine-reviews__list--expanded"
                : ""
            }`}
          >
            {!hasAnyReviews && (
              <div className="wine-reviews__empty">
                <p>
                  This wine is waiting for its
                  first story. Be the one to
                  write it.
                </p>
              </div>
            )}

            {visibleReviews.map(
              (review) => (
                <ReviewCard
                  review={review}
                  key={review.id}
                  isMine={
                    review.userId ===
                    Number(user?.id)
                  }
                />
              ),
            )}
          </div>

          {!isExpanded && (
            <div className="wine-reviews__right">
              <div className="wine-reviews__visual">
                {reviewsBackdropUrl && (
                  <img
                    className="wine-reviews__bg"
                    src={
                      reviewsBackdropUrl
                    }
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                )}

                <img
                  className={`wine-reviews__bottle ${
                    isMateusRose
                      ? "wine-reviews__bottle--mateus-rose"
                      : ""
                  }`}
                  src={wine.imageUrl}
                  alt={wine.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <WineReviewsActions
                wineId={wine.id}
                isExpanded={
                  isExpanded
                }
                hasMoreReviews={
                  hasMoreReviews
                }
                hasAnyReviews={
                  hasAnyReviews
                }
                hasMyReview={
                  !!myReview
                }
                onToggleExpanded={
                  toggleExpanded
                }
                showReviewIcon
              />
            </div>
          )}
        </div>

        {isExpanded &&
          hasAnyReviews && (
            <WineReviewsActions
              wineId={wine.id}
              isExpanded={
                isExpanded
              }
              hasMoreReviews={
                hasMoreReviews
              }
              hasAnyReviews={
                hasAnyReviews
              }
              hasMyReview={
                !!myReview
              }
              onToggleExpanded={
                toggleExpanded
              }
            />
          )}
      </div>
    </section>
  );
};