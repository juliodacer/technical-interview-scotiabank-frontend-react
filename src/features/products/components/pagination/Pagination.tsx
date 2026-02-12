import { memo, useMemo } from "react";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination = memo(({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const pageNumbers = useMemo((): (number | string)[] => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const firstPage = 1;
    const lastPage = totalPages;

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", lastPage];
    }

    if (currentPage >= totalPages - 3) {
      return [
        firstPage,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      firstPage,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      lastPage,
    ];
  }, [currentPage, totalPages]);

  return (
    <nav className="pagination" aria-label="Navegación de páginas">
      <div className="pagination-info">
        Mostrando {startItem}-{endItem} de {totalItems} {totalItems === 1 ? "producto" : "productos"}
      </div>

      <div className="pagination-controls">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button pagination-button-prev"
          aria-label="Página anterior"
        >
          Anterior
        </button>

        <div className="pagination-numbers">
          {pageNumbers.map((page, index) => {
            if (page === "...") {
              return (
                <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`pagination-number ${
                  currentPage === page ? "pagination-number-active" : ""
                }`}
                aria-label={`Ir a página ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button pagination-button-next"
          aria-label="Página siguiente"
        >
          Siguiente
        </button>
      </div>
    </nav>
  );
});
