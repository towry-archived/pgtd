import React, { Component } from 'react';
import ajax from './supports/ajax';
import User from './api/user';

// components
import Header from './components/Header.jsx';
import BoardContainer from './components/BoardContainer.jsx';
import Footer from './components/Footer.jsx';

import './startup';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <Header />
        <div className="main">
          <BoardContainer />
        </div>
        <Footer />
      </div>
    )
  }
}

React.render(
  <App />, document.getElementById('app')
);
