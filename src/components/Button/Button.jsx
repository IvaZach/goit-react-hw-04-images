import React from 'react';
import css from './Button.module.css';

import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <button type="button" className={css.button} onClick={onClick}>
      LOAD MORE
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
