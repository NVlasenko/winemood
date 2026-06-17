import { useCallback, useMemo, useState } from "react";

import type { Wine } from "@/types/wine";

import { reviews } from "@/data/reviews";
import { SectionTitle } from "@/components/ui/SectionTitle";

import reviewsBg from "@/assets/images/wineDetailsInfo/wineReviews/reviews-bg.png";


import "./WineReviews.scss";
import { ReviewCard } from "./config/ReviewCard";
import { WineReviewsActions } from "./config/WineReviewsActions";


type Props = {
  wine: Wine;
};

export const WineReviews = ({ wine }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const wineReviews = useMemo(
    () => reviews.filter((review) => review.wineId === wine.id),
    [wine.id]
  );

  const visibleReviews = useMemo(
    () => (isExpanded ? wineReviews : wineReviews.slice(0, 2)),
    [isExpanded, wineReviews]
  );

  const hasMoreReviews = wineReviews.length > 2;
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
            {visibleReviews.map((review) => (
              <ReviewCard review={review} key={review.id} />
            ))}
          </div>

          {!isExpanded && (
            <div className="wine-reviews__right">
              <div className="wine-reviews__visual">
                <img className="wine-reviews__bg" src={reviewsBg} alt="" />

                <img
                  className={`wine-reviews__bottle ${
                    isMateusRose ? "wine-reviews__bottle--mateus-rose" : ""
                  }`}
                  src={wine.imageUrl}
                  alt={wine.name}
                />
              </div>

              <WineReviewsActions
                wineId={wine.id}
                isExpanded={isExpanded}
                hasMoreReviews={hasMoreReviews}
                onToggleExpanded={toggleExpanded}
                showReviewIcon
              />
            </div>
          )}
        </div>

        {isExpanded && (
          <WineReviewsActions
            wineId={wine.id}
            isExpanded={isExpanded}
            hasMoreReviews={hasMoreReviews}
            onToggleExpanded={toggleExpanded}
          />
        )}
      </div>
    </section>
  );
};