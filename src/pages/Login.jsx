import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingPage from './LoadingPage';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      btnState: true,
      loading: false,
      loaded: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitButton = this.handleSubmitButton.bind(this);
  }

  handleChange({ target: { id, value } }) {
    const max = 3;
    this.setState({
      [id]: value,
      btnState: (value.length < max) ? true : undefined,
    });
  }

  handleSubmitButton(event) {
    event.preventDefault();
    const { name } = this.state;
    this.setState({
      loading: true,
    }, () => {
      createUser({ name })
        .then((result) => {
          if (result === 'OK') {
            this.setState({
              loading: false,
              loaded: true,
            });
          }
        });
    });
  }

  render() {
    const { btnState, loading, loaded } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            <input
              id="name"
              type="text"
              data-testid="login-name-input"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            disabled={ btnState }
            onClick={ this.handleSubmitButton }
          >
            Entrar
          </button>
        </form>
        {
          loading ? <LoadingPage /> : ''
        }
        { loaded && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
