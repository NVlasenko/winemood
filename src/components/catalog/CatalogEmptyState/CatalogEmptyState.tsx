type Props = {
  onOpenFilters: () => void;
};

export const CatalogEmptyState = ({ onOpenFilters }: Props) => {
  return (
    <div className="catalog-page__empty">
      <div className="catalog-page__empty-glow" />

      <h3 className="catalog-page__empty-title">No wines found</h3>

      <p className="catalog-page__empty-text">
        Try changing filters or reset your selection.
      </p>

      <button
        type="button"
        className="button-primary catalog-page__empty-button"
        onClick={onOpenFilters}
      >
        Change filters
      </button>
    </div>
  );
};