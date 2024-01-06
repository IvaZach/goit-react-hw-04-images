import React from 'react';
import css from './ButtonDown.module.css';
import PropTypes from 'prop-types';

export const ButtonDown = ({ onClick }) => {
  return (
    <button type="button" className={css.button} onClick={onClick}>
      DOWN
    </button>
  );
};

ButtonDown.propTypes = {
  onClick: PropTypes.func,
};