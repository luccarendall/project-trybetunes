import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      // Referência criação de rotas com BrowserRouter: youtube.com/watch?v=9pB_lwmLc74
      <Router>
        <div className="App">

          <p>TrybeTunes</p>

          <Route path="/" component={ Login } />

        </div>
      </Router>
    );
  }
}

export default App;
