import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LoadingPage from './LoadingPage';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchData: '',
      disabled: true,
      artist: '',
      loading: false,
      apiReturn: '',
      notFound: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearchButton = this.handleSearchButton.bind(this);
  }

  handleChange({ target: { id, value } }) {
    const max = 2;
    this.setState({
      [id]: value,
      disabled: (value.length < max) ? true : undefined,
    });
  }

  async handleSearchButton() {
    const { searchData } = this.state;
    this.setState({
      artist: searchData,
      searchData: '',
      loading: true,
    });
    const result = await searchAlbumsAPI(searchData);
    if (result.length) {
      this.setState({
        loading: false,
        apiReturn: result,
      });
    } else {
      this.setState({
        loading: false,
        notFound: true,
        artist: '',
      });
    }
  }

  render() {
    const { searchData, disabled, apiReturn, loading, notFound, artist } = this.state;

    if (loading) {
      return (
        <div>
          <Header />
          <LoadingPage />
        </div>
      );
    }

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="searchData">
            <input
              id="searchData"
              type="text"
              data-testid="search-artist-input"
              onChange={ this.handleChange }
              value={ searchData }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ disabled }
            onClick={ this.handleSearchButton }
          >
            Pesquisar
          </button>
        </form>
        <section>
          {
            (artist && <h2>{`Resultado de álbuns de: ${artist}`}</h2>)
          }
          {
            (apiReturn) && apiReturn
              .map(({ collectionName, artistName, artWorkUrl100, collectionId }) => (
                <Link
                  to={ `/album/${collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                  key={ collectionId }
                >
                  <img src={ artWorkUrl100 } alt="foto do album" />
                  <span>{collectionName}</span>
                  <span>{artistName}</span>
                </Link>
              ))
          }
          {
            notFound && <h2>Nenhum álbum foi encontrado</h2>
          }
        </section>
      </div>
    );
  }
}

export default Search;
