import React, { useEffect, useState } from 'react';
import css from './App.module.css';
import Notiflix from 'notiflix';
import { Section } from 'components/Section/Section';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { pixabayCard } from 'services/api';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';

export const App = () => {
  const [searchCards, setSearchCards] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchWord === '') {
      return;
    }
    async function getCard() {
      try {
        setIsLoading(true);
        setError(null);
        const searchCards = await pixabayCard(searchWord, page);
        setSearchCards(prev => [...prev, ...searchCards]);
      } catch (error) {
        Notiflix.Notify.failure('Something wrong. Try later');
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getCard();
  }, [error, page, searchWord]);

  const handleFormSubmit = newSearchWord => {
    console.log(newSearchWord);

    setSearchWord(newSearchWord);
    setSearchCards([]);
    setPage(1);
  };

  const handleClickMore = () => {
    console.log(page);
    setPage(prevState => prevState + 1);
  };

  const showModal = () => {
    setIsShowModal(true);
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const onLargeImage = (id, img, tags) => {
    setLargeImageURL({ id: id, img: img, tags: tags });
  };

  return (
    <Section className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />

      {searchWord !== '' && (
        <ImageGallery
          onShowModal={showModal}
          searchCards={searchCards}
          onLargeImage={onLargeImage}
        />
      )}

      {isLoading && <Loader />}

      {searchCards.length >= 12 && <Button onClick={handleClickMore} />}
      {isShowModal && (
        <Modal onCloseModal={closeModal} onLargeImage={largeImageURL} />
      )}
    </Section>
  );
};
