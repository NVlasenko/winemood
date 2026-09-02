type Props = {
  rating: number;
};

const STARS = [1, 2, 3, 4, 5] as const;

export const ReviewStars = ({ rating }: Props) => {
  return (
    <div
      className="wine-reviews__stars"
      role="img"
      aria-label={`Rating ${rating} out of 5`}
    >
      {STARS.map((star) => {
        const fillPercent =
          Math.min(Math.max(rating - (star - 1), 0), 1) * 100;

        return (
          <span className="wine-reviews__star" key={star} aria-hidden="true">
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
  );
};