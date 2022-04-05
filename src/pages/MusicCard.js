import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { music, onChangeFavorite, isFavorite } = this.props;
    const { trackName, previewUrl, trackId } = music;
    return (
      <>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>

        <label htmlFor="favorite-checkbox">
          Favorita
          <input
            id="favorite-checkbox"
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ (event) => onChangeFavorite({ event, music }) }
            checked={ isFavorite }
          />
        </label>
      </>
    );
  }
}
MusicCard.propTypes = {
  music: PropTypes.object,
  onChangeFavorite: PropTypes.func,
  isFavorite: PropTypes.bool,
}.isRequired;
export default MusicCard;
