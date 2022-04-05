import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: '',
    };
  }

  componentDidMount() {
    this.handlerUser();
  }

  handlerUser = async () => {
    const user = await getUser();
    this.setState({ user, isLoading: false });
  }

  userInfos = () => {
    const { user } = this.state;
    return (
      <section>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <p>{user.description}</p>
        <img src={ user.image } alt={ user.name } data-testid="profile-image" />
        <button type="button">
          <Link to="/profile/edit">Editar perfil</Link>
        </button>
      </section>
    );
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading
          ? <p>Carregando...</p>
          : this.userInfos()}
      </div>
    );
  }
}
