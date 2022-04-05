import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      isRedirect: false,
      isDisable: true,
      UserInfos: {
        name: '',
        email: '',
        image: '',
        description: '',
      },
    };
  }

  componentDidMount() {
    this.getUserInfos();
  }

  getUserInfos = async () => {
    const info = await getUser();
    this.setState({ UserInfos: info, loading: false }, () => this.validated());
  }

  handleClick = (event) => {
    event.preventDefault();
    const { UserInfos } = this.state;
    updateUser(UserInfos);
    this.setState({ isRedirect: true });
  }

  handleChange =({ target }) => {
    const { name, value } = target;
    this.setState((prev) => ({ UserInfos: { ...prev.UserInfos, [name]: value } }),
      () => this.validated());
  }

  validated = () => {
    const { UserInfos: { name, email, description, image } } = this.state;
    const allInputs = [name, email, description, image];
    const isEmpty = allInputs.every((input) => input !== '');
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const checkedEmail = regexEmail.test(email);
    const isValid = isEmpty && checkedEmail;
    if (isValid) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  renderForm = () => {
    const {
      UserInfos: { name, email, image, description },
      isRedirect,
      isDisable } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="name">
            Nome:
            <input
              id="name"
              type="text"
              data-testid="edit-input-name"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              type="text"
              data-testid="edit-input-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="image">
            Imagem:
            <input
              id="image"
              type="text"
              data-testid="edit-input-image"
              name="image"
              value={ image }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              id="description"
              type="text"
              data-testid="edit-input-description"
              name="description"
              value={ description }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="edit-button-save"
            disabled={ isDisable }
            onClick={ this.handleClick }
            onChange={ this.handleChange }
          >
            Salvar
          </button>
        </form>
        {isRedirect && <Redirect to="/profile" />}
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading
          ? <p>Carregando...</p>
          : this.renderForm()}
      </div>
    );
  }
}

export default ProfileEdit;
