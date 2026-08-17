import "./FavoriteButton.scss";

type Props = {
  isFavorite: boolean;
  className?: string;
  ariaLabel?: string;
  onClick: () => void;
};

export const FavoriteButton = ({
  isFavorite,
  className = "",
  ariaLabel,
  onClick,
}: Props) => {
  return (
    <button
      className={`favorite-button ${
        isFavorite ? "favorite-button--active" : ""
      } ${className}`}
      type="button"
      aria-label={
        ariaLabel ??
        (isFavorite ? "Remove from favorites" : "Add to favorites")
      }
      aria-pressed={isFavorite}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();

        onClick();
      }}
    >
      <span className="favorite-button__icon" aria-hidden="true">
        ♥
      </span>
    </button>
  );
};