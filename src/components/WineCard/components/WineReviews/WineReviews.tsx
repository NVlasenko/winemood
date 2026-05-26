import { useState } from "react";

import type { Wine } from "@/types/wine";
import { reviews } from "@/data/reviews";
import { SectionTitle } from "@/components/SectionTitle";

import reviewsBg from "@/assets/images/wineDetailsInfo/wineReviews/reviews-bg.svg";
import quoteIcon from "@/assets/images/wineDetailsInfo/wineReviews/quote.svg";
import arrowIcon from "@/assets/images/icons/arrow-right.svg";

import "./WineReviews.scss";

type Props = {
  wine: Wine;
};

export const WineReviews = ({ wine }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const wineReviews = reviews.filter((review) => review.wineId === wine.id);
  const visibleReviews = isExpanded ? wineReviews : wineReviews.slice(0, 2);

  return (
    <section className="wine-reviews">
      <div className="container">
        <SectionTitle title="What our customers are saying" />

        <div
          className={
            isExpanded
              ? "wine-reviews__content wine-reviews__content--expanded"
              : "wine-reviews__content"
          }
        >
          <div
            className={
              isExpanded
                ? "wine-reviews__list wine-reviews__list--expanded"
                : "wine-reviews__list"
            }
          >
            {visibleReviews.map((review) => (
              <article className="wine-reviews__card" key={review.id}>
                <img className="wine-reviews__quote" src={quoteIcon} alt="" />

                <p className="wine-reviews__text">{review.text}</p>

                <div className="wine-reviews__stars">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const fillPercent =
                      Math.min(Math.max(review.rating - (star - 1), 0), 1) *
                      100;

                    return (
                      <span className="wine-reviews__star" key={star}>
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
                  <div className="wine-reviews__avatar" />
                  <span>{review.author}</span>
                </div>
              </article>
            ))}
          </div>

          {!isExpanded && (
            <div className="wine-reviews__visual">
              <img className="wine-reviews__bg" src={reviewsBg} alt="" />

              <img
                className="wine-reviews__bottle"
                src={wine.image}
                alt={wine.name}
              />
            </div>
          )}
        </div>

        {wineReviews.length > 2 && (
          <button
            className="wine-reviews__button"
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <span>{isExpanded ? "Show less" : "See more"}</span>
            <img src={arrowIcon} alt="" />
          </button>
        )}
      </div>
    </section>
  );
};