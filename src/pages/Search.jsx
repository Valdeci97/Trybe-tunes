import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchData: '',
      disabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSearchButton = this.handleSearchButton.bind(this);
  }

  handleChange({ target: { id, value } }) {
    const max = 2;
    this.setState({
      [id]: value,
      disabled: (value.length < max) ? true : undefined,
    });
  }

  render() {
    const { searchData, disabled } = this.state;

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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
