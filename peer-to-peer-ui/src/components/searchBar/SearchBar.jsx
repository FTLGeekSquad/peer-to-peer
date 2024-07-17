import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ handleSubmit }) => {
  const [searchInput, setSearchInput] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(searchInput);
  };

  return (
    <div className="search-bar">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;


