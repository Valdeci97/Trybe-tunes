import React from 'react';
import { Link } from 'react-router-dom';
import LoadingPage from '../pages/LoadingPage';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      logged: false,
    };
  }

  componentDidMount() {
    getUser()
      .then((result) => {
        const { name } = result;
        this.setState({
          name,
          logged: true,
        });
      });
  }

  render() {
    const { name, logged } = this.state;

    return (
      <>
        <span>Trybetunes</span>
        { logged ? (
          <div data-testid="header-component">
            <nav>
              <Link to="/search" data-testid="link-to-search">
                Pesquisar
              </Link>
              <Link to="/favorites" data-testid="link-to-favorites">
                Favoritas
              </Link>
              <Link to="/profile" data-testid="link-to-profile">
                Perfil
              </Link>
            </nav>
            <p>Bem vindo</p>
            <p data-testid="header-user-name">{ name }</p>
          </div>
        ) : <LoadingPage /> }
      </>
    );
  }
}

export default Header;
