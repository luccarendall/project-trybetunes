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
      favMusics: [],
    };
    this.onChangeFavorite = this.onChangeFavorite.bind(this);
    this.favSong = this.favSong.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    this.setState({ loading: true }, async () => {
      const favMusics = await getFavoriteSongs();
      const results = await getMusics(id);
      const album = results[0];
      const musics = results.filter((result) => result.kind === 'song');
      this.setState({ musics, album, favMusics, loading: false });
    });
  }

  onChangeFavorite({ event, music }) {
    const { checked } = event.target;

    this.setState({ loading: true }, async () => {
      const { favMusics } = this.state;
      if (checked) {
        await addSong(music);
        favMusics.push(music);
        this.setState({ loading: false, favMusics });
      } else {
        await removeSong(music);
        const filterFavorites = favMusics.filter(
          (favoriteMusic) => favoriteMusic.trackId !== music.trackId,
        );
        this.setState({ loading: false, favMusics: filterFavorites });
      }
    });
  }

  favSong(music) {
    const { favMusics = [] } = this.state;
    return favMusics.find(
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
            isFavorite={ !!this.favSong(music) }
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
