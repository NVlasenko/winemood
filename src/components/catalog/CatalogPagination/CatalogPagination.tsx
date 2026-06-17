export const CatalogPagination = () => {
  return (
    <div className="catalog-page__pagination" aria-label="Catalog pagination">
      <button
        className="catalog-page__pagination-arrow"
        type="button"
        disabled
        aria-label="Previous page"
      >
        ‹
      </button>

      <button
        className="catalog-page__pagination-item catalog-page__pagination-item--active"
        type="button"
        aria-current="page"
      >
        1
      </button>

      <button className="catalog-page__pagination-item" type="button" disabled>
        2
      </button>

      <button className="catalog-page__pagination-item" type="button" disabled>
        3
      </button>

      <span className="catalog-page__pagination-dots">...</span>

      <button className="catalog-page__pagination-item" type="button" disabled>
        12
      </button>

      <button
        className="catalog-page__pagination-arrow"
        type="button"
        disabled
        aria-label="Next page"
      >
        ›
      </button>
    </div>
  );
};