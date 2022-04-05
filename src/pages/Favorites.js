import React from 'react';
import Header from './Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

export default class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      favorites: [],
    };
  }

  componentDidMount() {
    this.favorites();
  }

  favorites = async () => {
    const favSongs = await getFavoriteSongs();
    this.setState({ favorites: favSongs, isLoading: false });
  }

  removeMusic = (track) => {
    this.setState({ isLoading: true });
    const { favorites } = this.state;
    const filteredMusics = favorites.filter((music) => music !== track);
    this.setState({ favorites: filteredMusics, isLoading: false });
  }

  renderSongs = () => {
    const { favorites } = this.state;
    return (
      <section>
        {favorites.map((music) => (
          <section key={ music.trackName }>
            <MusicCard track={ music } removeMusic={ this.removeMusic } />
          </section>
        ))}
      </section>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading
          ? <p>Carregando...</p>
          : this.renderSongs()}
      </div>
    );
  }
}
