import React, { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlePressESC);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressESC);
  }

  handlePressESC = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  render() {
    const { onLargeImage, onCloseModal } = this.props;
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
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func,
  onLargeImage: PropTypes.shape({
    id: PropTypes.number,
    tags: PropTypes.string,
    img: PropTypes.string,
  }),
};
