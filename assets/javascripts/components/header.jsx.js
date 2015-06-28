import React, { Component } from 'react';
import User from '../api/user';

export default class Header extends Component {
  constructor (props) {
    super(props);

    this.state = {
      user: null
    }

    this.logoutHandler = this.logoutHandler.bind(this);
  }

  logoutHandler (e) {
    e.preventDefault();
    e.stopPropagation();

    User.logout();
  }

  componentWillMount () {
    User.info(function (info) {
      this.setState({
        user: info
      })
    }.bind(this));
  }

  render () {
    let menus;
    let { user } = this.state;

    if (user) {
      menus = (
        <ul className="menus">
          <li><a href={"#/user/" + user.id}>{ user.name }</a></li>
          <li><a onClick={this.logoutHandler} href="#/logout">Logout</a></li>
        </ul>
      );
    } else {
      menus = (
        <ul className="menus">
          <li><a href="/login">Log in</a></li>
        </ul>
      );
    }

    return (
      <div className="header">
        <h1 className="logo"><a href="/#" title="Home"><span className='word-p'>P</span>GTD</a></h1>
        { menus }
      </div>
    );
  }
}
