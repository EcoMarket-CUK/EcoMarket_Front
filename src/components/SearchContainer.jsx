import React from 'react';
import "../css/components/SearchContainer.css";
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const navigate = useNavigate();
  const goToSearch=()=>{
    navigate("/search");
  }
  return (
    <div className="search-container" onClick={goToSearch}>
      <input
        type="text"
        className="search-input"
        placeholder="원하는 물품을 검색해보세요!"
      />
      <img src="/assets/Search.svg" alt="search" className="search-icon" />
    </div>
  );
};

export default SearchBar;
