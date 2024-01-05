import React, { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onLargeImage, onCloseModal }) => {
  useEffect(() => {
    const handlePressESC = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handlePressESC);
    return () => {
      window.removeEventListener('keydown', handlePressESC);
    };
  }, [onCloseModal]);

  return createPortal(
    <div className={css.overlay} onClick={onCloseModal}>
      <div className={css.modal}>
        <img
          src={onLargeImage.img}
          alt={onLargeImage.tags}
          key={onLargeImage.id}
        />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onCloseModal: PropTypes.func,
  onLargeImage: PropTypes.shape({
    id: PropTypes.number,
    tags: PropTypes.string,
    img: PropTypes.string,
  }),
};
