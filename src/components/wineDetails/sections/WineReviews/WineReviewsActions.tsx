import { useNavigate } from "react-router";

import { useAuth } from "@/context/AuthContext";
import { useAuthRequired } from "@/context/AuthRequiredContext";

import arrowIcon from "@/assets/images/icons/arrow-right.svg";
import reviewIcon from "@/assets/images/icons/review.svg";

type Props = {
  wineId: number;
  isExpanded: boolean;
  hasMoreReviews: boolean;
  hasAnyReviews: boolean;
  hasMyReview: boolean;
  onToggleExpanded: () => void;
  showReviewIcon?: boolean;
};

export const WineReviewsActions = ({
  wineId,
  isExpanded,
  hasMoreReviews,
  hasAnyReviews,
  hasMyReview,
  onToggleExpanded,
  showReviewIcon = false,
}: Props) => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();
  const { openAuthRequired } =
    useAuthRequired();

  const handleAction = () => {
    if (!isAuthenticated) {
      openAuthRequired({
        title: "Write a wine review",
        text: "To write a review, please sign up or log in to your account.",
        primaryLabel: "Sign up",
        primaryTo:
          "/auth?mode=register",
        secondaryLabel: "Log in",
        secondaryTo:
          "/auth?mode=login",
      });

      return;
    }

    if (hasMyReview) {
      navigate(
        `/profile?section=reviews&wineId=${wineId}`,
      );

      return;
    }

    navigate(
      `/catalog/${wineId}/review`,
    );
  };

  return (
    <div
      className={`wine-reviews__actions ${
        isExpanded
          ? "wine-reviews__actions--expanded"
          : ""
      }`}
    >
      <button
        className="button-primary wine-reviews__write-button"
        type="button"
        onClick={handleAction}
      >
        <span>
          {hasMyReview
            ? "Go to profile to edit"
            : "Write a review"}
        </span>

        {showReviewIcon && (
          <img
            className="wine-reviews__write-icon"
            src={reviewIcon}
            alt=""
          />
        )}
      </button>

      {hasAnyReviews &&
        hasMoreReviews && (
          <button
            className="wine-reviews__button"
            type="button"
            onClick={
              onToggleExpanded
            }
          >
            <span>
              {isExpanded
                ? "Show less"
                : "See more"}
            </span>

            <img
              src={arrowIcon}
              alt=""
            />
          </button>
        )}
    </div>
  );
};