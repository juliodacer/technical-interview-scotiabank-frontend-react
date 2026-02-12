import { useEffect, useState, type KeyboardEvent } from "react";

interface SearchBarProps {
  placeholder: string;
  value?: string;
  onQuery: (query: string) => void;
}

export const SearchBar = ({
  placeholder = "Buscar",
  value: externalValue,
  onQuery,
}: SearchBarProps) => {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    if (externalValue !== undefined) {
      setQuery(externalValue);
    }
  }, [externalValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onQuery(query);
    }, 700);

    return () => {
      clearTimeout(timeout);
    };
  }, [query, onQuery]);

  const handleSearch = () => {
    onQuery(query);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery("");
    onQuery("");
  };

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
        {query.length > 0 && (
          <button
            onClick={handleClear}
            className="search-clear-button"
            type="button"
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
