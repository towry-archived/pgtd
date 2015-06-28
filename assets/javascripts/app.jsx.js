
import React, { Component } from 'react';
import ajax from './supports/ajax';
import User from './api/user';

// components
import Header from './components/Header.jsx';
import BoardContainer from './components/BoardContainer.jsx';
import Footer from './components/Footer.jsx';
import UserProfileContainer from './components/UserProfileContainer.jsx';
import BoardDetailContainer from './components/BoardDetailContainer.jsx';

import './startup';

/**
 * App class
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hash: window.location.hash
    }

    this.routeArgs = null;

    this.onHashChange = this.onHashChange.bind(this);
  }

  /**
   * TODO:
   * Since this component contains several child component,
   * but not all compoent need to be navigated and everytime
   * after navigation all the child component will be rerendered.
   * So use another common component to handle the navigate and
   * replace the component that need to navigate with the common
   * component.
   */
  getChildComponent () {
    let path = window.location.hash.substr(1);
    let pathArr = path.split('/');
    pathArr = pathArr.filter(function (i) {
      return (/^\s*$/.test(i) === false);
    })

    let comp = pathArr.shift() || '#';
    comp = comp.toLowerCase();
    if (pathArr.length) {
      this.routeArgs = pathArr;
    }

    switch (comp) {
      case 'user': return UserProfileContainer;
      case 'board': return BoardDetailContainer;
      default: return BoardContainer;
    }
  }

  onHashChange () {
    let hash = window.location.hash;
    this.setState({
      hash: hash.substr(1)
    })
  }

  componentWillMount () {
    if ('onhashchange' in window) {
      window.onhashchange = this.onHashChange;
    }
  }

  componentWillUnmount () {
    window.onhashchange = null;
  }

  render() {
    var ChildComponent;

    ChildComponent = this.getChildComponent();
    return (
      <div className="container">
        <Header />
        <div className="main">
          <ChildComponent routeArgs={ this.routeArgs }/>
        </div>
        <Footer />
      </div>
    )
  }
}

React.render(
  <App />, document.getElementById('app')
);
