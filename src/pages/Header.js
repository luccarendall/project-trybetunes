import React from 'react';
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
          <header data-testid="header-component">
            <p data-testid="header-user-name">
              {' '}
              { userName }
              {' '}
            </p>
          </header>
        )
    );
  }
}

export default Header;

// ✕ Será validado se a função getUser é chamada ao renderizar o componente (17 ms)
// ✕ Será validado se a mensagem de Carregando... é exibida ao renderizar o componente e é removida após o retorno da API (17 ms)
// ✕ Será validado se o nome da pessoa usuária está presente na tela após o retorno da API (12 ms)
