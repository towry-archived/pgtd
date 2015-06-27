import React, { Component } from 'react';

export default class Footer extends Component {
  constructor (props) {
    super(props);

    this.displayName = 'Footer';
  }

  render () {
    return (
      <div className="footer">
        <p>&copy; 2015 Towry Wang</p>
      </div>
    );
  }
}
