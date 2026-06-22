type Props = {
  message: string;
};

export const CatalogErrorState = ({ message }: Props) => {
  return (
    <div className="catalog-page__empty">
      <div className="catalog-page__empty-glow" />

      <h3 className="catalog-page__empty-title">Failed to load wines</h3>

      <p className="catalog-page__empty-text">{message}</p>
    </div>
  );
};