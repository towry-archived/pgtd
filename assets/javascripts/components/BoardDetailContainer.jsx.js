import React, { Component } from 'react';
import ajax from '../supports/ajax';

import Page404 from './404.jsx';
import List from './board/List.jsx';

export default class BoardDetailContainer extends Component {
  constructor (props) {
    super(props);

    this.displayName = 'BoardDetailContainer';

    this.state = {
      board: null,
      found: true,
      loading: true 
    }
    this.fetchBoard(props.routeArgs[0]);
  }

  fetchBoard (id) {
    id = parseInt(id, 10) || -1;

    if (id === -1) {
      return null;
    }

    let self = this;

    ajax.get('/api/board/fetch_one', {id: id})
      .then(function (data) {
        if (data['code'] === 200) {
          self.setState({
            board: data['data'],
            found: true,
            loading: false
          })
        } else {
          self.setState({
            found: false,
            loading: false 
          })
        }
      }, function (err) {
        self.setState({
          found: false,
          loading: false
        })
      })
  }

  render () {
    let { loading, found, board } = this.state;
    let comp;

    if (loading) {
      return (
        <div className="loading">
          <p>loading...</p>
        </div>
      )
    } else {
      if (!found) {
        return React.createElement(Page404);
      }
    }

    if (Object.prototype.toString.call(board) === '[object String]') {
      board = JSON.parse(board);
    }

    let boar = board.board;
    let lists = board.lists;
    if (typeof boar === 'string') {
      boar = JSON.parse(boar);
    }
    if (typeof lists === 'string') {
      lists = JSON.parse(lists);
    }

    return (
      <div className="board">
        <h3>{ boar.name }</h3>
        <div className="list-map">
        {
          lists.map(function (list) {
            return <List key={ list.id } list={ list } />
          })
        }
        </div>
      </div>
    );
  }
}

BoardDetailContainer.propTypes = {
  routeArgs: React.PropTypes.array
}
