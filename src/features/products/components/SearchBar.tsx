import { useEffect, useState, type KeyboardEvent } from "react";

interface SearchBarProps {
  placeholder: string;
  onQuery: (query: string) => void;
}

export const SearchBar = ({
  placeholder = "Buscar",
  onQuery,
}: SearchBarProps) => {
  const [query, setQuery] = useState<string>("");

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

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};
