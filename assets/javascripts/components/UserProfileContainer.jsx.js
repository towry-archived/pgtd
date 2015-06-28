import React, { Component } from 'react';

export default class UserProfileContainer extends Component {
  constructor (props) {
    super(props);

    this.displayName = 'UserProfileContainer';
  }

  render () {
    return (
      <div>
        <h3>Hello User</h3>
      </div>
    );
  }
}

UserProfileContainer.propTypes = {
  routeArgs: React.PropTypes.array
}
