import React from 'react';
import Header from './Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import MusicCard from './MusicCard';

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      favoriteMusics: [],
    };
    this.onRemoveFavorite = this.onRemoveFavorite.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const favoriteMusics = await getFavoriteSongs();

      this.setState({ favoriteMusics, loading: false });
    });
  }

  onRemoveFavorite({ music }) {
    this.setState({ loading: true }, async () => {
      await removeSong(music);
      const favoriteMusics = await getFavoriteSongs();

      this.setState({ loading: false, favoriteMusics });
    });
  }

  renderFavoriteMusics() {
    const { favoriteMusics } = this.state;
    return favoriteMusics.map((favoriteMusic) => (<MusicCard
      key={ favoriteMusic.trackId }
      music={ favoriteMusic }
      isFavorite
      onChangeFavorite={ this.onRemoveFavorite }
    />));
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading /> : this.renderFavoriteMusics()}
      </div>
    );
  }
}
export default Favorites;
