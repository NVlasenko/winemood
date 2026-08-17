import type { WineReviewDto} from "@/types/reviews";
import { ReviewStars } from "./ReviewStars";

import quoteIcon from "@/assets/images/wineDetailsInfo/wineReviews/quote.svg";

type Props = {
  review: WineReviewDto;
  isMine?: boolean;
};

export const ReviewCard = ({ review, isMine }: Props) => {
  return (
    <article
      className={`wine-reviews__card ${
        isMine ? "wine-reviews__card--mine" : ""
      }`}
    >
      <img className="wine-reviews__quote" src={quoteIcon} alt="" />

      <p className="wine-reviews__text">{review.reviewText}</p>

      <ReviewStars rating={review.rating} />

      <div className="wine-reviews__author">
        {review.avatarUrl ? (
          <img
            className="wine-reviews__avatar"
            src={review.avatarUrl}
            alt={review.userName}
          />
        ) : (
          <div className="wine-reviews__avatar" aria-hidden="true">
            {review.userName?.charAt(0)}
          </div>
        )}

        <span>{review.userName}</span>
      </div>
    </article>
  );
};