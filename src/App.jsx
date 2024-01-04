import React, { Component } from 'react';
import css from './App.module.css';
import Notiflix from 'notiflix';
import { Section } from 'components/Section/Section';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { pixabayCard } from 'services/api';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
export class App extends Component {
  state = {
    searchCards: [],
    searchWord: '',
    page: 1,
    isLoading: false,
    isShowModal: false,
    largeImageURL: '',
  };

  async componentDidUpdate(prevProps, prevState) {
    const { searchWord, page } = this.state;
    console.log('searchWord', searchWord);
    console.log('page', page);

    if (prevState.searchWord !== searchWord) {
      this.setState({ isLoading: true });

      await pixabayCard(searchWord, page)
        .then(searchCards =>
          this.setState({
            searchCards: searchCards,
            isLoading: false,
          })
        )
        .catch(error => {
          Notiflix.Notify.failure('Something wrong. Try later');
          console.log(error);
        });
    }

    if (prevState.page !== page && page !== 1) {
      this.setState({ isLoading: true });

      await pixabayCard(searchWord, page)
        .then(searchCards => {
          this.setState(prevState => ({
            searchCards: [...prevState.searchCards, ...searchCards],
            isLoading: false,
          }));
        })
        .catch(error => {
          Notiflix.Notify.failure('Something wrong. Try later');
          console.log(error);
        });
    }
  }

  handleFormSubmit = newSearchWord => {
    this.setState({ searchCards: [], searchWord: newSearchWord, page: 1 });
  };

  handleClickMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  showModal = () => {
    this.setState({ isShowModal: true });
  };

  closeModal = () => {
    this.setState({ isShowModal: false });
  };

  onLargeImage = (id, img, tags) => {
    this.setState({ largeImageURL: { id: id, img: img, tags: tags } });
  };

  render() {
    const { isLoading, isShowModal, largeImageURL, searchCards, searchWord } =
      this.state;

    return (
      <Section className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {searchWord !== '' && (
          <ImageGallery
            onShowModal={this.showModal}
            searchCards={searchCards}
            handleClickMore={this.handleClickMore}
            onLargeImage={this.onLargeImage}
            onLoading={isLoading}
          />
        )}

        {isLoading && <Loader />}

        {!isLoading && searchCards.length > 0 && (
          <Button onClick={this.handleClickMore} />
        )}

        {isShowModal && (
          <Modal onCloseModal={this.closeModal} onLargeImage={largeImageURL} />
        )}
      </Section>
    );
  }
}
