import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
        <input
          type="text"
          placeholder="Artistas, músicas ou podcasts..."
        />

        <button
          type="button"
        >
          Pesquisar

        </button>

        <Link class="link" to="/">Home</Link>
      </div>
    );
  }
}

export default Search;
