import React, { useState } from "react";
import toast from "react-hot-toast";
import s from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}
const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error("Please enter a search term!");
      return;
    }
    onSubmit(query.trim());
    setQuery("");
  };

  return (
    <header className={s.header}>
      <div className={s.headerContainer}>
        <form className={s.searchForm} onSubmit={handleSubmit}>
          <FaSearch className={s.searchIcon} />
          <input
            className={s.searchInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Type something to search..."
            value={query}
            onChange={handleInputChange}
          />
          <button className={s.searchBtn} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default SearchBar;
