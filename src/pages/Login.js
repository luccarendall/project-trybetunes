import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const magicNumber = 3;

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      name: '',
      loading: false,
      redirect: false,
    };
  }

  loginInputChange = (event) => {
    this.setState({
      name: event.target.value,
    }, () => {
      this.setState((prev) => ({
        disabled: prev.name.length < magicNumber,
      }));
    });
  }

  activatedBtn = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    this.setState({
      redirect: true,
      loading: false,
    });
  }

  render() {
    const { name, disabled, loading, redirect } = this.state;
    return (
      loading
        ? <Loading /> : (
          <div data-testid="page-login">
            <p>Login</p>

            <input
              type="text"
              data-testid="login-name-input"
              value={ name }
              onChange={ this.loginInputChange }
            />
            {redirect ? <Redirect to="/search" /> : null}
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ disabled }
              onClick={ this.activatedBtn }
            >
              Entrar

            </button>
          </div>
        )
        // : <Loading />
    );
    // { redirect ? <Redirect to="/search" /> : null; }
  }
}

export default Login;
