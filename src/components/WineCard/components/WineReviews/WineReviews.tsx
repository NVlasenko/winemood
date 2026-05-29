import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Wine } from "@/types/wine";

import { reviews } from "@/data/reviews";
import { SectionTitle } from "@/components/SectionTitle";

import reviewsBg from "@/assets/images/wineDetailsInfo/wineReviews/reviews-bg.png";
import quoteIcon from "@/assets/images/wineDetailsInfo/wineReviews/quote.svg";
import arrowIcon from "@/assets/images/icons/arrow-right.svg";

import reviewIcon from "@/assets/images/icons/review.svg";
import "./WineReviews.scss";

type Props = {
  wine: Wine;
};

const STARS = [1, 2, 3, 4, 5];

export const WineReviews = ({ wine }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

const handleWriteReviewClick = () => {
  navigate(`/catalog/${wine.id}/review`);
};

  const wineReviews = useMemo(
    () => reviews.filter((review) => review.wineId === wine.id),
    [wine.id],
  );

  const visibleReviews = isExpanded ? wineReviews : wineReviews.slice(0, 2);
  const hasMoreReviews = wineReviews.length > 2;
  const isLargeBottle = wine.name === "Mateus Rosé";

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
              <article className="wine-reviews__card" key={review.id}>
                <img
                  className="wine-reviews__quote"
                  src={quoteIcon}
                  alt=""
                  aria-hidden="true"
                />

                <p className="wine-reviews__text">{review.text}</p>

                <div
                  className="wine-reviews__stars"
                  aria-label={`Rating ${review.rating} out of 5`}
                >
                  {STARS.map((star) => {
                    const fillPercent =
                      Math.min(Math.max(review.rating - (star - 1), 0), 1) *
                      100;

                    return (
                      <span
                        className="wine-reviews__star"
                        key={star}
                        aria-hidden="true"
                      >
                        <span className="wine-reviews__star-bg">★</span>

                        <span
                          className="wine-reviews__star-fill"
                          style={{ width: `${fillPercent}%` }}
                        >
                          ★
                        </span>
                      </span>
                    );
                  })}
                </div>

                <div className="wine-reviews__author">
                  <div className="wine-reviews__avatar" aria-hidden="true" />
                  <span>{review.author}</span>
                </div>
              </article>
            ))}
          </div>

          {!isExpanded && (
            <div className="wine-reviews__right">
              <div className="wine-reviews__visual">
                <img
                  className="wine-reviews__bg"
                  src={reviewsBg}
                  alt=""
                  aria-hidden="true"
                />

                <img
                  className={`wine-reviews__bottle ${
                    isLargeBottle ? "wine-reviews__bottle--large" : ""
                  }`}
                  src={wine.imageUrl}
                  alt={wine.name}
                />
              </div>

              <div className="wine-reviews__actions">
              <button
                className="button-primary wine-reviews__write-button"
                type="button"
                onClick={handleWriteReviewClick}
              >
                <span>Write a review</span>

                <img
                  className="wine-reviews__write-icon"
                  src={reviewIcon}
                  alt=""
                  aria-hidden="true"
                />
              </button>

                {hasMoreReviews && (
                  <button
                    className="wine-reviews__button"
                    type="button"
                    onClick={() => setIsExpanded((prev) => !prev)}
                    aria-expanded={isExpanded}
                  >
                    <span>{isExpanded ? "Show less" : "See more"}</span>
                    <img src={arrowIcon} alt="" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="wine-reviews__actions wine-reviews__actions--expanded">
            <button
              className="button-primary wine-reviews__write-button"
              type="button"
            >
              <span>Write a review</span>
            </button>

            {hasMoreReviews && (
              <button
                className="wine-reviews__button"
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-expanded={isExpanded}
              >
                <span>Show less</span>
                <img src={arrowIcon} alt="" aria-hidden="true" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};