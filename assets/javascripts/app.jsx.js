import React, { Component } from 'react';
import ajax from './supports/ajax';
import './startup';

import Header from './components/header.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e) {
    var req = ajax.get('/api/user/login_check')
    req.then(function (data) {
      console.log(data);
    }, function (err) {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="container">
        <Header />
        <button onClick={this.handleClick}>Click</button>
      </div>
    )
  }
}

React.render(
  <App />, document.getElementById('app')
);
