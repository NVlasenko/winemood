import { ReviewStars } from "./ReviewStars";

import quoteIcon from "@/assets/images/wineDetailsInfo/wineReviews/quote.svg";

type Review = {
  id: number;
  wineId: number;
  text: string;
  rating: number;
  author: string;
};

type Props = {
  review: Review;
};

export const ReviewCard = ({ review }: Props) => {
  return (
    <article className="wine-reviews__card">
      <img className="wine-reviews__quote" src={quoteIcon} alt="" />

      <p className="wine-reviews__text">{review.text}</p>

      <ReviewStars rating={review.rating} />

      <div className="wine-reviews__author">
        <div className="wine-reviews__avatar" aria-hidden="true" />
        <span>{review.author}</span>
      </div>
    </article>
  );
};