import { Link } from "react-router-dom";

import arrowIcon from "@/assets/images/icons/arrow-right.svg";
import reviewIcon from "@/assets/images/icons/review.svg";

type Props = {
  wineId: number;
  isExpanded: boolean;
  hasMoreReviews: boolean;
  onToggleExpanded: () => void;
  showReviewIcon?: boolean;
};

export const WineReviewsActions = ({
  wineId,
  isExpanded,
  hasMoreReviews,
  onToggleExpanded,
  showReviewIcon = false,
}: Props) => {
  return (
    <div
      className={`wine-reviews__actions ${
        isExpanded ? "wine-reviews__actions--expanded" : ""
      }`}
    >
      <Link
        to={`/catalog/${wineId}/review`}
        className="button-primary wine-reviews__write-button"
      >
        <span>Write a review</span>

        {showReviewIcon && (
          <img className="wine-reviews__write-icon" src={reviewIcon} alt="" />
        )}
      </Link>

      {hasMoreReviews && (
        <button
          className="wine-reviews__button"
          type="button"
          onClick={onToggleExpanded}
          aria-expanded={isExpanded}
        >
          <span>{isExpanded ? "Show less" : "See more"}</span>
          <img src={arrowIcon} alt="" />
        </button>
      )}
    </div>
  );
};