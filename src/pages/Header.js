import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      userName: '',
    };
  }

  componentDidMount() {
    this.load();
  }

  load = async () => {
    this.setState({
      loading: true,
    });
    const result = await getUser();
    this.setState({
      loading: false,
      userName: result.name,
    });
  }

  render() {
    const { loading, userName } = this.state;
    return (
      loading
        ? <Loading />
        : (
          <>
            <header data-testid="header-component">
              <p data-testid="header-user-name">
                {' '}
                {userName}
                {' '}
              </p>
            </header>
            <div>
              <Link data-testid="link-to-search" to="/search">Search</Link>
              <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
              <Link data-testid="link-to-profile" to="/profile">Profile</Link>
            </div>
          </>
        )
    );
  }
}

export default Header;
