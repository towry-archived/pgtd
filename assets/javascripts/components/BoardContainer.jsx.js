import React, { Component } from 'react';
import ajax from '../supports/ajax';

import Board from './Board.jsx';

export default class BoardContainer extends Component {
  constructor (props) {
    super(props);
    this.displayName = 'BoardContainer';

    this.state = {
      loading: true
    }

    this.initBoards();
  }

  initBoards () {
    let self = this;

    this.boards = [];

    ajax.get('/api/board/fetch_all')
    .then(function (data) {
      self.boards = data;
      self.setState({
        loading: false
      })
    })
  }

  render () {
    let lists;
    // maybe use classSet instead.
    // see https://facebook.github.io/react/docs/class-name-manipulation.html
    if (this.state.loading) {
      lists = (
        <div className="loading board-onloading">
          <p>loading</p>
        </div>
      );
    } else {
      let boards = this.boards;
      if (typeof boards === 'string') {
        boards = JSON.parse(boards);
      }

      lists = boards.map(function (board) {
        return <Board key={ board.id } board={ board } />
      })
    }

    return (
      <div className="boards">
        <div className="board-list">
          { lists }
        </div>
      </div>
    )
  }
}
