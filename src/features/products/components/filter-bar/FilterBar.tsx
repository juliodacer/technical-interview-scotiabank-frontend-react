import type { Category } from "../../interfaces/category.response";
import { SearchBar } from "../SearchBar";
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
}

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
}: FilterBarProps) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onCategoryChange(e.target.value);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "") {
      onStateChange(undefined);
    } else {
      onStateChange(value === "true");
    }
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "" ||
    selectedState !== undefined;

  return (
    <div className="filter-bar-container">
      <div className="filter-bar">
        <div className="filter-search-wrapper">
          <SearchBar
            placeholder="Buscar producto..."
            value={searchQuery}
            onQuery={onSearchChange}
          />
        </div>

        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className={`filter-select ${isLoadingCategories ? "filter-select-loading" : ""}`}
          aria-label="Filtrar por categoría"
          disabled={isLoadingCategories}
          aria-busy={isLoadingCategories}
        >
          <option value="">
            {isLoadingCategories ? "Cargando categorías..." : "Todas las categorías"}
          </option>
          {!isLoadingCategories &&
            categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
        </select>

        <select
          id="state-select"
          value={
            selectedState === undefined
              ? ""
              : selectedState
                ? "true"
                : "false"
          }
          onChange={handleStateChange}
          className="filter-select"
          aria-label="Filtrar por estado"
        >
          <option value="">Todos los estados</option>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="filter-clear-button"
            type="button"
            aria-label="Limpiar todos los filtros"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
};
