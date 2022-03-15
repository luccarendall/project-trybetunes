import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';

const magicNumber = 2;

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      music: '',
      name: '',
      loading: false,
      fetched: false,
      results: null,
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

  clickInputChange = async () => {
    await this.fetch();
    this.setState({
      fetched: true,
    });
  }

  fetch = async () => {
    const { music } = this.state;
    this.setState({
      loading: true,
    });
    const searchResults = await searchAlbumsAPI(music);
    this.setState({
      loading: false,
      name: music,
      results: searchResults,
    }, () => this.setState({ music: '' }));
  }

  render() {
    const { disabled, music, name, loading, fetched, results } = this.state;
    return (
      loading
        ? <Loading /> : (
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
                onClick={ this.clickInputChange }
              >
                Pesquisar
              </button>
              {fetched
                ? (
                  <>
                    <p>
                      Resultado de álbuns de:
                      {' '}
                      {name}
                    </p>
                    { results.length < 1
                      ? <p>Nenhum álbum foi encontrado</p>
                      : results.map((obj) => (
                        <Link
                          data-testid={ `link-to-album-${obj.collectionId}` }
                          to={ `/album/${obj.collectionId}` }
                          key={ obj.artistName }
                        >
                          <img src={ obj.artworkUrl100 } alt={ obj.artistName } />
                          {obj.artistName}
                          {obj.collectionName}
                        </Link>
                      ))}
                  </>
                )
                : null}

              <Link className="link" to="/">Home</Link>
            </form>
          </div>
        )
    );
  }
}

export default Search;

// Será validado se ao receber o retorno da API, os álbuns são listados na tela
// Será validado se caso a API não retorne nenhum álbum, a mensagem Nenhum álbum foi encontrado é exibida
