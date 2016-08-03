import React from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import { browserHistory } from 'react-router';

export default class Footer extends React.Component {
  buildClickHandler(path) {
    return (e) => {
      e.preventDefault();
      browserHistory.push(path);
    };
  }

  render() {
    /*eslint-disable */
    return (
      <Navbar className="footer" style={{ borderRadius: '0px', marginBottom: '0px', }}>
        <Nav pullRight>
          <NavItem eventKey={1} onClick={ this.buildClickHandler('/') } href="/">Stocks</NavItem>
          <NavItem eventKey={1} onClick={ this.buildClickHandler('/about') } href="/about">About</NavItem>
          <NavItem eventKey={1} onClick={ this.buildClickHandler('/cookies') } href="/cookies">Cookies</NavItem>
        </Nav>
      </Navbar>
      );
    /*eslint-enable */
  }
}
