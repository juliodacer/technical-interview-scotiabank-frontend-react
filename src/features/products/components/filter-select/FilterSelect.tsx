import { memo, useCallback } from "react";
import "./FilterSelect.css";

interface FilterSelectOption {
  value: string;
  label: string;
}

interface FilterSelectProps {
  id: string;
  value: string;
  options: FilterSelectOption[];
  placeholder: string;
  onChange: (value: string) => void;
  ariaLabel: string;
  isLoading?: boolean;
  loadingText?: string;
  disabled?: boolean;
}

export const FilterSelect = memo(({
  id,
  value,
  options,
  placeholder,
  onChange,
  ariaLabel,
  isLoading = false,
  loadingText = "Cargando...",
  disabled = false,
}: FilterSelectProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <select
      id={id}
      value={value}
      onChange={handleChange}
      className={`filter-select ${isLoading ? "filter-select-loading" : ""}`}
      aria-label={ariaLabel}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
    >
      <option value="">
        {isLoading ? loadingText : placeholder}
      </option>
      {!isLoading &&
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
});
