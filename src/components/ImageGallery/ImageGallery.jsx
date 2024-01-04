import React from 'react';
import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ searchCards, onShowModal, onLargeImage }) => {
  return (
    <ul className={css.imageGallery}>
      {searchCards.map(({ id, webformatURL, tags, largeImageURL }) => {
        const modalImage = () => onLargeImage(id, largeImageURL, tags);
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            onShowModal={onShowModal}
            onLargeImage={modalImage}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  searchCards: PropTypes.array,
  onShowModal: PropTypes.func,
  onLargeImage: PropTypes.func,
};
