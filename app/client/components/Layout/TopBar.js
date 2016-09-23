
import React from 'react';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

import { browserHistory } from 'react-router';

export default class TopBar extends React.Component {
  buildClickHandler(path) {
    return (e) => {
      e.preventDefault();
      browserHistory.push(path);
    };
  }

  render() {
    /*eslint-disable */
    return (
      <Navbar style={{ borderRadius: '0px' }}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/" onClick={ this.buildClickHandler('/') }>Kortapositioner.se</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem className="new-feature" eventKey={1} onClick={ this.buildClickHandler('/shorters') } href="/stocks">Shorters</NavItem>
            <NavItem eventKey={1} onClick={ this.buildClickHandler('/stocks') } href="/stocks">Stocks</NavItem>
            <NavItem eventKey={1} onClick={ this.buildClickHandler('/about') } href="/about">About</NavItem>
            <NavItem eventKey={1} onClick={ this.buildClickHandler('/blog') } href="/blog">Blog</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      );
    /*eslint-enable */
  }
}
