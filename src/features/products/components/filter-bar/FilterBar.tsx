import { useMemo, useCallback } from "react";
import type { Category } from "../../interfaces/category.response";
import { SearchBar } from "../SearchBar";
import { FilterSelect } from "../filter-select/FilterSelect";
import "./FilterBar.css";

interface FilterBarProps {
  searchQuery: string;
  selectedCategory: string;
  selectedState: boolean | undefined;
  categories: Category[];
  isLoadingCategories?: boolean;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onStateChange: (state: boolean | undefined) => void;
  onClearFilters: () => void;
  onCreateProduct?: () => void;
}

const STATE_OPTIONS = [
  { value: "true", label: "Activo" },
  { value: "false", label: "Inactivo" },
];

export const FilterBar = ({
  searchQuery,
  selectedCategory,
  selectedState,
  categories,
  isLoadingCategories = false,
  onSearchChange,
  onCategoryChange,
  onStateChange,
  onClearFilters,
  onCreateProduct,
}: FilterBarProps) => {
  const categoryOptions = useMemo(
    () =>
      categories.map((category) => ({
        value: category.name,
        label: category.name,
      })),
    [categories],
  );

  const handleStateChange = useCallback(
    (value: string) => {
      if (value === "") {
        onStateChange(undefined);
      } else {
        onStateChange(value === "true");
      }
    },
    [onStateChange],
  );

  const stateValue = useMemo(
    () => (selectedState === undefined ? "" : selectedState ? "true" : "false"),
    [selectedState],
  );

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "" ||
    selectedState !== undefined;

  return (
    <div className="filter-bar-container">
      <div className="filter-bar">
        {onCreateProduct && (
          <button
            onClick={onCreateProduct}
            className="filter-create-button"
            aria-label="Crear nuevo producto"
          >
            + Crear Producto
          </button>
        )}

        <SearchBar
          placeholder="Buscar producto..."
          value={searchQuery}
          onQuery={onSearchChange}
        />

        <FilterSelect
          id="category-select"
          value={selectedCategory}
          options={categoryOptions}
          placeholder="Todas las categorías"
          onChange={onCategoryChange}
          ariaLabel="Filtrar por categoría"
          isLoading={isLoadingCategories}
          loadingText="Cargando categorías..."
        />

        <FilterSelect
          id="state-select"
          value={stateValue}
          options={STATE_OPTIONS}
          placeholder="Todos los estados"
          onChange={handleStateChange}
          ariaLabel="Filtrar por estado"
        />

        <button
          onClick={onClearFilters}
          className={`filter-clear-button ${!hasActiveFilters ? "filter-clear-button-hidden" : ""}`}
          type="button"
          aria-label="Limpiar todos los filtros"
          disabled={!hasActiveFilters}
          tabIndex={hasActiveFilters ? 0 : -1}
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};
