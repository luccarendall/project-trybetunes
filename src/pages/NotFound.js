import React from 'react';
// import { Link } from 'react-router-dom';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found">
        <span>404 - Not Found!</span>
        {/* <Link to="/">Voltar</Link> */}
      </div>
    );
  }
}

export default NotFound;
