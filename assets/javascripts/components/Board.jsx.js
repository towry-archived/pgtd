import React, { Component } from 'react';

export default class Board extends Component {
  constructor (props) {
    super(props);

    this.displayName = 'Board';
  }

  render () {
    let { board } = this.props;

    return (
      <div className="board">
        <a href={"#/board/" + board.id }>{ board.name }</a> created by <span className="creator">{ board.creator }</span>
      </div>
    );
  }
}
