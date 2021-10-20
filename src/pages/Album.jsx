import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import LoadingPage from './LoadingPage';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songsList: [],
      loading: true,
      artistInfo: {},
    };
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    this.response(params.id);
  }

  response = async (id) => {
    const result = await getMusics(id);
    // console.log(result);
    const info = result[0];
    this.setState({
      loading: false,
      artistInfo: info,
      songsList: result.slice(1),
    });
  }

  render() {
    const { songsList, loading, artistInfo: { artistName, collectionName } } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          (loading) ? <LoadingPage /> : (
            <section>
              {/* {console.log(artistInfo)} */}
              <h3 data-testid="artist-name">{ artistName }</h3>
              <h4 data-testid="album-name">{ collectionName }</h4>
              {
                songsList.map(({ trackName, previewUrl, trackId }) => (
                  <MusicCard
                    key={ trackName }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                    trackId={ trackId }
                  />
                ))
              }
            </section>
          )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;

// Fonte da função slice https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/slice , https://www.esferadedragoes.com.br/copia-profunda-objetos-arrays-javascript#:~:text=Outro%20m%C3%A9todo%20para%20copiar%20um,%2C%20%22%F0%9F%98%87%22%5D%20console.
