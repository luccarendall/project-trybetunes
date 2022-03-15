import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const magicNumber = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      music: '',
    };
  }

  searchInputChange = (event) => {
    this.setState({
      music: event.target.value,
    }, () => {
      this.setState((prev) => ({
        disabled: prev.music.length < magicNumber,
      }));
    });
  }

  render() {
    const { disabled, music } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Artistas, músicas ou podcasts..."
            value={ music }
            onChange={ this.searchInputChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabled }
          >
            Pesquisar
          </button>

          <Link class="link" to="/">Home</Link>
        </form>
      </div>

    );
  }
}

export default Search;
