import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import "./SearchBox.css";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();

  const [keyword, setKeyword] = useState(urlKeyword || "");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword(" ");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className="search-form">
      <div className="search-wrapper">
        <FiSearch className="search-icon" />
        <input
          className="search-input"
          type="text"
          name="q"
          value={keyword}
          placeholder="Search..."
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchBox;
