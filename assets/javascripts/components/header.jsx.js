import React, { Component } from 'react';
import User from '../api/user';

export default class Header extends Component {
  constructor (props) {
    super(props);

    this.logoutHandler = this.logoutHandler.bind(this);
  }

  logoutHandler (e) {
    e.preventDefault();
    e.stopPropagation();

    User.logout();
  }

  render () {
    let menus;

    if (User.logged()) {
      menus = (
        <ul className="menus">
          <li><a href="#">Hi user1</a></li>
          <li><a onClick={this.logoutHandler} href="#logout">Logout</a></li>
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
        <h1 className="logo"><span className='word-p'>P</span>GTD</h1>
        { menus }
      </div>
    );
  }
}
