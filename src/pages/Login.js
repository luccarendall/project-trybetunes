import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <p>Login</p>
        <input type="text" data-testid="login-name-input" />
      </div>
    );
  }
}

export default Login;
