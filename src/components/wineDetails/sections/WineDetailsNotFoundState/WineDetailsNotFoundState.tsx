export const WineDetailsNotFoundState = () => {
  return (
    <div className="wine-details-page__empty">
      <h1 className="wine-details-page__title">Wine not found</h1>

      <p className="wine-details-page__text">
        This wine does not exist or has been removed.
      </p>
    </div>
  );
};