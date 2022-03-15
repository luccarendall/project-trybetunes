import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { createUser } from './services/userAPI';
import Login from './pages/Login';
// import Loading from './pages/Loading';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      // Referência criação de rotas com BrowserRouter: youtube.com/watch?v=9pB_lwmLc74
      // Referência para erro 404: ultimatecourses.com/blog/react-router-not-found-component
      <Router>
        <div className="App">
          <p>TrybeTunes</p>
          <Switch>
            <Route exact path="/" component={ Login } />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route component={ NotFound } />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
