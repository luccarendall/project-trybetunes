import React, { Component } from 'react';
import PropType from 'prop-types';
import Header from './Header';
import MusicCard from './MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      collection: undefined,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.handlerAPI(id);
  }

  componentDidUpdate() {
    const { musics } = this.state;
    if (musics.length > 0) {
      this.musicRender();
    }
  }

  handlerAPI = async (id) => {
    const getMusic = await getMusics(id);
    const musicList = getMusic.filter((elem) => elem.kind === 'song');
    this.setState({ collection: getMusic[0] });
    this.setState({ musics: [...musicList] });
  }

  musicRender = () => {
    const { musics, collection } = this.state;
    return (
      <section>
        <h3 data-testid="artist-name">{collection.artistName}</h3>
        <h4 data-testid="album-name">{collection.collectionName}</h4>
        <img src={ collection.artworkUrl100 } alt={ collection.collectionName } />
        {musics.map((track) => (
          <section
            key={ track.trackName }
          >
            <MusicCard track={ track } />
          </section>
        ))}
      </section>
    );
  }

  render() {
    const { musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <main>
          {musics.length === 0 ? <p>Carregando...</p> : this.musicRender()}
        </main>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropType.shape({
    params: PropType.shape({
      id: PropType.string,
    }),
  }).isRequired,
};

export default Album;
