import React, { Component } from 'react';

export default class Page404 extends Component {
  constructor (props) {
    super(props);

    this.displayName = 'Page404';
    this.pageTitle = document.title;
  }

  componentWillMount () {
    document.title = "404 Page not found";
  }

  componentWillUnmount () {
    document.title = this.pageTitle;
  }

  render () {
    return (
      <div className="error-page error-404">
        <h1>404 Not found</h1>
        <p className="elaborate">Sorry, the page you are looking for is not found.</p>
      </div>
    );
  }
}
