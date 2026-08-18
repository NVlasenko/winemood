const STARS = [1, 2, 3, 4, 5];

type Props = {
  rating: number;
};

export const WineRating = ({ rating }: Props) => {
  return (
    <div
      className="catalog-page__rating"
      aria-label={`Rating ${rating} out of 5`}
    >
      <div className="catalog-page__stars">
        {STARS.map((star) => {
          const fillPercent =
            Math.min(Math.max(rating - (star - 1), 0), 1) * 100;

          return (
            <span className="catalog-page__star" key={star} aria-hidden="true">
              <span className="catalog-page__star-bg">★</span>

              <span
                className="catalog-page__star-fill"
                style={{ width: `${fillPercent}%` }}
              >
                ★
              </span>
            </span>
          );
        })}
      </div>

      <span>{rating.toFixed(2)}</span>
    </div>
  );
};
