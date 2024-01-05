import React, { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export const Searchbar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleChange = evt => {
    const { value } = evt.currentTarget;
    setSearchName(value.trim().toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchName === '') {
      return;
    }
    onSubmit(searchName);
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchForm_button}>
          <span className={css.searchForm_button_label}>Search</span>
        </button>

        <input
          className={css.searchForm_input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchName"
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  searchName: PropTypes.string,
};
