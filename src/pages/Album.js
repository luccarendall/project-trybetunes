import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
      album: {},
      loading: false,
      favoriteMusics: [],
    };
    this.onChangeFavorite = this.onChangeFavorite.bind(this);
    this.isMusicFavorite = this.isMusicFavorite.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({ loading: true }, async () => {
      const favoriteMusics = await getFavoriteSongs();
      const results = await getMusics(id);
      const album = results[0];
      const musics = results.filter((result) => result.kind === 'song');
      this.setState({ musics, album, favoriteMusics, loading: false });
    });
  }

  onChangeFavorite({ event, music }) {
    const { checked } = event.target;

    this.setState({ loading: true }, async () => {
      const { favoriteMusics } = this.state;
      if (checked) {
        await addSong(music);
        favoriteMusics.push(music);
        this.setState({ loading: false, favoriteMusics });
      } else {
        await removeSong(music);
        const filterFavorites = favoriteMusics.filter(
          (favoriteMusic) => favoriteMusic.trackId !== music.trackId,
        );
        this.setState({ loading: false, favoriteMusics: filterFavorites });
      }
    });
  }

  isMusicFavorite(music) {
    const { favoriteMusics = [] } = this.state;
    return favoriteMusics.find(
      (favoriteMusic) => music.trackId === favoriteMusic.trackId,
    );
  }

  renderMusics() {
    const { album, musics } = this.state;
    return (
      <>
        <div>
          <img src={ album.artworkUrl100 } alt="imagem do album" />
          <h2 data-testid="album-name">{ album.collectionName }</h2>
          <p data-testid="artist-name">{ album.artistName }</p>
        </div>
        <div>
          {musics.map((music) => (<MusicCard
            key={ music.trackId }
            music={ music }
            isFavorite={ !!this.isMusicFavorite(music) }
            onChangeFavorite={ this.onChangeFavorite }
          />))}
        </div>
      </>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : this.renderMusics()}
      </div>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;
export default Album;
