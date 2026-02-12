import { useState, useCallback } from "react";
import { CustomHeader } from "../../../../components/CustomHeader";
import { FilterBar } from "../../components/filter-bar/FilterBar";
import { ProductTable } from "../../components/product-table/ProductTable";
import { Pagination } from "../../components/pagination/Pagination";
import { LoadingState, ErrorState, EmptyState } from "../../components/ui-states";
import { useProducts } from "../../hooks/useProducts";
import { useCategories } from "../../hooks/useCategories";
import "./HomePage.css";

export const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedState, setSelectedState] = useState<boolean | undefined>(
    undefined,
  );

  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const { data, isLoading, isError, error, refetch } = useProducts({
    page: currentPage,
    size: 6,
    q: searchQuery,
    category: selectedCategory,
    state: selectedState,
  });

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query.trim());
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  }, []);

  const handleStateChange = useCallback((state: boolean | undefined) => {
    setSelectedState(state);
    setCurrentPage(1);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedState(undefined);
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
          title="Productos Bancarios"
          subtitle="Encuentra los productos financieros que necesitas"
        />
        <FilterBar
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedState={selectedState}
          categories={categories || []}
          isLoadingCategories={isLoadingCategories}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onStateChange={handleStateChange}
          onClearFilters={handleClearFilters}
        />
        <LoadingState message="Cargando productos..." />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <CustomHeader
          title="Productos Bancarios"
          subtitle="Encuentra los productos financieros que necesitas"
        />
        <FilterBar
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedState={selectedState}
          categories={categories || []}
          isLoadingCategories={isLoadingCategories}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onStateChange={handleStateChange}
          onClearFilters={handleClearFilters}
        />
        <ErrorState
          message={
            error instanceof Error
              ? error.message
              : "Error al cargar los productos"
          }
          onRetry={refetch}
        />
      </>
    );
  }

  const products = data?.products || [];
  const totalItems = data?.total || 0;

  return (
    <>
      <CustomHeader
        title="Productos Bancarios"
        subtitle="Encuentra los productos financieros que necesitas"
      />

      <FilterBar
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedState={selectedState}
        categories={categories || []}
        isLoadingCategories={isLoadingCategories}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onStateChange={handleStateChange}
        onClearFilters={handleClearFilters}
      />

      {products.length === 0 ? (
        <EmptyState
          message="No se encontraron productos"
          description={
            searchQuery || selectedCategory || selectedState !== undefined
              ? "Intenta ajustar los filtros de búsqueda para encontrar lo que buscas"
              : undefined
          }
          actionLabel={
            searchQuery || selectedCategory || selectedState !== undefined
              ? "Limpiar filtros"
              : undefined
          }
          onAction={
            searchQuery || selectedCategory || selectedState !== undefined
              ? handleClearFilters
              : undefined
          }
        />
      ) : (
        <>
          <ProductTable products={products} />
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={6}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};
