import React, { useState, useEffect } from 'react';
import './Filter.css';
import { Link } from 'react-router-dom';

const Filter = ({ onChange }) => {
  const [style, setStyle] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    onChange({ category, style, sortBy });
  };

  const clearFilter = () => {
    setStyle('');
    setCategory('');
    setSortBy('');
  };

  return (
    <form className='filter' onSubmit={submitHandler}>
      <div className='filter-left'>
        <label>Style</label>
        <select
          className='filter-option'
          name='style'
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        >
          <option value=''>Select a Style</option>
          <option value='Oil on Canvas'>Oil on Canvas</option>
          <option value='Oil on Board'>Oil on Board</option>
          <option value='Oil on Linen'>Oil on Linen</option>
          <option value='Oil'>Oil</option>
          <option value='Acrylic'>Acrylic</option>
          <option value='Cards'>Cards</option>
        </select>

        <label>Category</label>
        <select
          className='filter-option'
          name='category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=''>Select a Category</option>
          <option value='Landscape'>Landscape</option>
          <option value='Horses'>Horses</option>
          <option value='Wildlife'>Wildlife</option>
        </select>

        <label>SortBy</label>
        <select
          className='filter-option'
          name='sortBy'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value=''>Sort By</option>
          <option value='nameAZ'>A to Z</option>
          <option value='nameZA'>Z to A</option>
        </select>

        <button className='apply-filter-btn'>Apply Filter</button>

        <button className='clear-filter-btn' onClick={clearFilter}>
          Clear Filter
        </button>
      </div>

    </form>
  );
};

export default Filter;
