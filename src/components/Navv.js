import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import app from "../firebase";
import 'bootstrap/dist/css/bootstrap.css';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavLink,
  NavItem } from 'reactstrap';

class Navv extends Component {
  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <span>
            Chat
          </span>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={() => app.auth().signOut()}>Sign Out</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default withRouter(Navv);

// <img class="nav-logo" src={process.env.PUBLIC_URL + '/PW_logo.png'} alt="logo" />
