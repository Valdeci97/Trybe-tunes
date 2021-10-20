import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import LoadingPage from './LoadingPage';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  checkBoxClick = async ({ target: { id } }) => {
    this.setState({ loading: true });
    const response = await getMusics(id);
    await addSong(response);
    this.setState({ loading: false });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading } = this.state;
    return (
      <section>
        <h4>{ trackName }</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id={ trackId }
            onChange={ this.checkBoxClick }
          />
        </label>
        {
          loading && <LoadingPage />
        }
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
