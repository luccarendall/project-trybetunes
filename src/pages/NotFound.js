import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <h1>404 - Not Found!</h1>
        <Link to="/">Voltar</Link>
      </div>
    );
  }
}

export default NotFound;
