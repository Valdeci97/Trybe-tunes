import React from 'react';
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
            <p>Bem vindo</p>
            <p data-testid="header-user-name">{ name }</p>
          </div>
        ) : <LoadingPage /> }
      </>
    );
  }
}

export default Header;
