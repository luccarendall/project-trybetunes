import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <p>Login</p>

        <input
          type="login"
          data-testid="login-name-input"
        />

        <button
          type="button"
          data-testid="login-submit-button"
        >
          Entrar

        </button>
      </div>
    );
  }
}

export default Login;

// capturar o input de texto e o botão e se o value do input de texto tiver 3 ou mais caracteres aceitar o click com a função createUser
