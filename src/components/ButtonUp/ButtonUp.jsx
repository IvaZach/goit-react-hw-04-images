import React from 'react';
import css from './ButtonUp.module.css';
import PropTypes from 'prop-types';

export const ButtonUp = ({ onClick }) => {
  return (
    <button type="button" className={css.button} onClick={onClick}>
      UP
    </button>
  );
};

ButtonUp.propTypes = {
  onClick: PropTypes.func,
};
