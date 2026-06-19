type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const getVisiblePages = (currentPage: number, totalPages: number) => {
  const pages: number[] = [];

  const startPage = Math.max(0, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  for (let page = startPage; page <= endPage; page += 1) {
    pages.push(page);
  }

  return pages;
};

export const CatalogPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: Props) => {
  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === totalPages - 1;

  return (
    <nav className="catalog-page__pagination" aria-label="Catalog pagination">
      <button
        className="catalog-page__pagination-arrow"
        type="button"
        disabled={isFirstPage}
        aria-label="Previous page"
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹
      </button>

      {!visiblePages.includes(0) && (
        <>
          <button
            className="catalog-page__pagination-item"
            type="button"
            onClick={() => onPageChange(0)}
          >
            1
          </button>

          {visiblePages[0] > 1 && (
            <span className="catalog-page__pagination-dots">...</span>
          )}
        </>
      )}

      {visiblePages.map((page) => {
        const isActive = page === currentPage;

        return (
          <button
            className={`catalog-page__pagination-item ${
              isActive ? "catalog-page__pagination-item--active" : ""
            }`}
            type="button"
            key={page}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onPageChange(page)}
          >
            {page + 1}
          </button>
        );
      })}

      {!visiblePages.includes(totalPages - 1) && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 2 && (
            <span className="catalog-page__pagination-dots">...</span>
          )}

          <button
            className="catalog-page__pagination-item"
            type="button"
            onClick={() => onPageChange(totalPages - 1)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        className="catalog-page__pagination-arrow"
        type="button"
        disabled={isLastPage}
        aria-label="Next page"
        onClick={() => onPageChange(currentPage + 1)}
      >
        ›
      </button>
    </nav>
  );
};