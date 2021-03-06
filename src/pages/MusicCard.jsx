import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import LoadingPage from './LoadingPage';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.favoriteArea();
  }

  favoriteArea = async () => {
    const { trackName, favorites } = this.props;
    if (favorites.some((favorite) => favorite.trackName === trackName)) {
      this.setState({
        checked: true,
      });
    }
  }

  checkBoxClick = async ({ target: { id } }) => {
    const { checked } = this.state;
    if (checked) {
      this.setState({
        checked: false,
        loading: true,
      });
      const response = await getMusics(id);
      await removeSong(response[0]);
      this.setState({
        loading: false,
      });
    } else {
      this.setState({ loading: true, checked: true });
      const response = await getMusics(id);
      await addSong(response);
      this.setState({ loading: false });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
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
            checked={ checked }
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
  favorites: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default MusicCard;

// Fonte para a validação do favorites: https://stackoverflow.com/questions/38237439/route-object-validation-as-props-in-react
// Failed prop type: Invalid prop `favorites[0]` of type `array` supplied to `MusicCard`, expected an object / erro original para "favorites: PropTypes.arrayOf(Proptypes.object).isRequired"
