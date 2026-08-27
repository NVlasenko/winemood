import { useCallback, useMemo, useState } from "react";
import type { Wine } from "@/types/wine";

import { SectionTitle } from "@/components/ui/SectionTitle";
import { ReviewCard } from "./config/ReviewCard";
import { WineReviewsActions } from "./config/WineReviewsActions";

import { useWineReviews } from "@/hooks/reviews/useWineReviews";
import { useAuth } from "@/context/AuthContext";
import { useSiteAssets } from "@/hooks/assets/siteAssets/useSiteAssets";

import "./WineReviews.scss";

type Props = {
  wine: Wine;
};

export const WineReviews = ({ wine }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: wineReviews = [], isLoading } = useWineReviews(wine.id);
  const { user } = useAuth();
  const {
    data: siteAssets,
  } = useSiteAssets();
  
  const reviewsBackdrop =
    siteAssets?.reviews.wineBackdropUrl;

  const myReview = useMemo(() => {
    if (!user) return null;
  
    return wineReviews.find(
      (review) => review.userId === Number(user.id)
    );
  }, [wineReviews, user]);

const sortedReviews = useMemo(() => {
  if (!user) return wineReviews;

  return [
    ...wineReviews.filter(r => r.userId === user.id),
    ...wineReviews.filter(r => r.userId !== user.id),
  ];
}, [wineReviews, user]);

const visibleReviews = useMemo(
  () => (isExpanded ? sortedReviews : sortedReviews.slice(0, 2)),
  [isExpanded, sortedReviews]
);

  const hasMoreReviews = wineReviews.length > 2;
  const hasAnyReviews = wineReviews.length > 0;

  const isMateusRose = wine.name === "Mateus Rosé";

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <section className="wine-reviews">
      <div className="container">
        <SectionTitle title="What our customers are saying" />

        <div
          className={`wine-reviews__content ${
            isExpanded ? "wine-reviews__content--expanded" : ""
          }`}
        >

          <div
            className={`wine-reviews__list ${
              isExpanded ? "wine-reviews__list--expanded" : ""
            }`}
          >
            {isLoading && <p>Loading...</p>}

            {!isLoading && wineReviews.length === 0 && (
              <div className="wine-reviews__empty">
                <p>
                This wine is waiting for its first story.
                Be the one to write it.
                </p>
              </div>
            )}

            {!isLoading &&
              visibleReviews.map((review) => (
                <ReviewCard
                  review={review}
                  key={review.id}
                  isMine={review.userId === user?.id}
                />
              ))}
          </div>

          {!isExpanded && (
            <div className="wine-reviews__right">
              <div className="wine-reviews__visual">
              {reviewsBackdrop && (
                <img
                  className="wine-reviews__bg"
                  src={reviewsBackdrop}
                  alt=""
                  aria-hidden="true"
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
                />
              </div>

              <WineReviewsActions
                wineId={wine.id}
                isExpanded={isExpanded}
                hasMoreReviews={hasMoreReviews}
                hasAnyReviews={hasAnyReviews}
                hasMyReview={!!myReview}
                onToggleExpanded={toggleExpanded}
                showReviewIcon
              />
            </div>
          )}
        </div>

        {isExpanded && hasAnyReviews && (
          <WineReviewsActions
            wineId={wine.id}
            isExpanded={isExpanded}
            hasMoreReviews={hasMoreReviews}
            hasAnyReviews={hasAnyReviews}
            hasMyReview={!!myReview}
            onToggleExpanded={toggleExpanded}
          />
        )}
      </div>
    </section>
  );
};