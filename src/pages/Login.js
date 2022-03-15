import React from 'react';
import propTypes from 'prop-types';
// import Loading from './Loading';

class Login extends React.Component {
  render() {
    const {
      loginInput,
      LoginBtnDisabled,
      loginInputChange,
      // validationLogin,
    } = this.props;

    // validationLogin = () => {
    //   if (loginInput.length >= 3) {
    //     LoginBtn;
    //   }
    // };

    return (
      <div data-testid="page-login">
        <p>Login</p>

        <input
          type="text"
          data-testid="login-name-input"
          value={ loginInput }
          onChange={ loginInputChange }
        />

        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ LoginBtnDisabled }
        >
          Entrar

        </button>
      </div>
    );
  }
}

Login.propTypes = {
  // validationLogin: propTypes.func.isRequired,
  loginInput: propTypes.string.isRequired,
  loginInputChange: propTypes.func.isRequired,
  LoginBtnDisabled: propTypes.bool.isRequired,
}; // Não sei pq não tá pegando o isRequired só no final

export default Login;

// capturar o input de texto e o botão e se o value do input de texto tiver 3 ou mais caracteres aceitar o click com a função createUser
