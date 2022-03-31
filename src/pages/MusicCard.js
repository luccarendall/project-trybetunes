import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      chosenong: [],
    };
  }

  render() {
    const { musicLibrary } = this.props;
    const { loading, chosenong } = this.state;
    return (
      <div>
        {loading ? <Loading /> // método de renderização do loading diferente
          : (
            musicLibrary.filter((item) => item.trackName)
              .map((music) => (
                <div key={ music.trackId }>
                  <p>{music.trackName}</p>
                  <audio data-testid="audio-component" src={ music.previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                  </audio>
                  <label htmlFor={ music.trackId }>
                    Favorita
                    <input
                      type="checkbox"
                      data-testid={ `checkbox-music-${music.trackId}` }
                      value={ music.trackId }
                      id={ music.trackId }
                      checked={ chosenong.some((id) => +id.trackId === music.trackId) }
                    />
                  </label>
                </div>
              )))}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicLibrary: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default MusicCard;
