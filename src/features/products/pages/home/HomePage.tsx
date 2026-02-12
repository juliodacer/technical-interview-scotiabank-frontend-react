import { useState, useCallback } from "react";
import { CustomHeader } from "../../../../components/CustomHeader";
import { SearchBar } from "../../components/SearchBar";
import { ProductTable } from "../../components/product-table/ProductTable";
import { Pagination } from "../../components/pagination/Pagination";
import { useProducts } from "../../hooks/useProducts";
import "./HomePage.css";

export const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, error, refetch } = useProducts({
    page: currentPage,
    size: 5,
    q: searchQuery,
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query.trim());
    setCurrentPage(1);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <>
        <CustomHeader
          title="Gestión de Productos Bancarios"
          subtitle="Encuentra los productos financieros que necesitas"
        />
        <SearchBar placeholder="Buscar producto" onQuery={handleSearch} />
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Cargando productos...</p>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <CustomHeader
          title="Gestión de Productos Bancarios"
          subtitle="Encuentra los productos financieros que necesitas"
        />
        <SearchBar placeholder="Buscar producto" onQuery={handleSearch} />
        <div className="error-state">
          <p className="error-message">
            {error instanceof Error
              ? error.message
              : "Error al cargar los productos"}
          </p>
          <button onClick={() => refetch()} className="retry-button">
            Intentar nuevamente
          </button>
        </div>
      </>
    );
  }

  const products = data?.products || [];
  const totalItems = data?.total || 0;

  return (
    <>
      <CustomHeader
        title="Gestión de Productos Bancarios"
        subtitle="Encuentra los productos financieros que necesitas"
      />

      <SearchBar placeholder="Buscar producto" onQuery={handleSearch} />

      {products.length === 0 ? (
        <div className="empty-state">
          <p>No se encontraron productos</p>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
              className="clear-search-button"
            >
              Limpiar búsqueda
            </button>
          )}
        </div>
      ) : (
        <>
          <ProductTable products={products} />
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={5}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};
