import React, { Component } from 'react';
import PropType from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      Checked: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.handlerFavoriteSong();
  }

  handlerFavoriteSong = async () => {
    this.setState({ loading: true });
    const savedSong = await getFavoriteSongs();
    this.setState({ loading: false, favoriteSongs: savedSong });
    const { favoriteSongs } = this.state;
    const { track } = this.props;
    const favorites = favoriteSongs.find((music) => (
      music.trackName.includes(track.trackName)
    ));
    if (favorites) {
      this.setState({ Checked: true });
    }
  }

  addFavoriteSong = async () => {
    this.setState({ loading: true });
    const { track } = this.props;
    await addSong(track);
    this.setState({ loading: false, Checked: true });
  }

  removeFavoriteMusic = async () => {
    const { removeMusic, track } = this.props;
    this.setState({ loading: true });
    await removeSong(track);
    if (typeof removeMusic === 'function') removeMusic(track);
    this.setState({ loading: false, Checked: false });
  }

  handleChange = (event) => {
    const { target: { checked } } = event;
    if (checked) {
      this.addFavoriteSong();
    } else {
      this.removeFavoriteMusic();
    }
  }

  render() {
    const { track: { trackName, previewUrl, trackId } } = this.props;
    const { loading, Checked } = this.state;
    return (
      <div>
        {loading
          ? <p>Carregando...</p>
          : (
            <section>
              <h4>{trackName}</h4>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
              </audio>
              <label htmlFor="favorites">
                Favoritos!
                <input
                  id="favorites"
                  type="checkbox"
                  checked={ Checked }
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={
                    (event) => { this.handleChange(event); }
                  }
                />
              </label>
            </section>
          )}
      </div>

    );
  }
}

MusicCard.propTypes = {
  track: PropType.shape({
    trackName: PropType.string,
    previewUrl: PropType.string,
    trackId: PropType.number,
  }),
  removeMusic: PropType.func,
}.Required;

export default MusicCard;
