import React, { useEffect, useRef, useState } from 'react';
import css from './App.module.css';
import Notiflix from 'notiflix';
import { Section } from 'components/Section/Section';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { pixabayCard } from 'services/api';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ButtonUp } from 'components/ButtonUp/ButtonUp';
import { ButtonDown } from 'components/ButtonUp/ButtonDown/ButtonDown';

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

  const buttonRef = useRef();

  const handleScrollUp = () => {
    const dims = buttonRef.current.getBoundingClientRect();
    console.log(dims)
    console.log(dims.top)
    window.scrollTo({
      top: dims.top,
      behavior: 'smooth',
    });
  };

  const handleScrollDown = () => {
    const dims = buttonRef.current.getBoundingClientRect();
    console.log(dims)
    console.log(dims.bottom)
    window.scrollTo({
      bottom: dims.bottom,
      behavior: 'smooth',
    });
  };

  return (
    <Section className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />

      {!isLoading && searchCards.length >= 12 && (
        <ButtonDown onClick={handleScrollDown} />
      )}

      {searchWord !== '' && (
        <div ref={buttonRef}>
          <ImageGallery
            onShowModal={showModal}
            searchCards={searchCards}
            onLargeImage={onLargeImage}
          />
        </div>
      )}

      {isLoading && <Loader />}
      {!isLoading && searchCards.length >= 12 && (
        <Button onClick={handleClickMore} />
      )}
      {!isLoading && searchCards.length >= 12 && (
        <ButtonUp onClick={handleScrollUp} />
      )}

      {isShowModal && (
        <Modal onCloseModal={closeModal} onLargeImage={largeImageURL} />
      )}
    </Section>
  );
};
