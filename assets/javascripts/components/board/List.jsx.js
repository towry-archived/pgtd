import React, { Component } from 'react';

export default class List extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    let { list } = this.props;

    return (
      <div className="list">
        <div className="list-header">
          <h3 className="list-name">{ list.name }</h3>
        </div>
        <div className="list-body">
        </div>
        <div className="list-footer">
        </div>
      </div>
    );
  }
}
