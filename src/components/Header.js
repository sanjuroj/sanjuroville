import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, Navbar } from 'react-bootstrap';


export default class Header extends Component {
    
    render() {
        return(
            <Navbar className="navbar navbar-inverse navbar-fixed-top">
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/" className="navbar-brand">Sanjuroville</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                  <Nav pullRight bsStyle="pills" className="navbar-nav" id="nav-menu">
                    <LinkContainer to={{pathname: "/home"}} >
                      <NavItem>Home</NavItem>
                    </LinkContainer>
                    <LinkContainer to={{pathname: "/resume"}} >
                      <NavItem>Resumé</NavItem>
                    </LinkContainer>
                    <LinkContainer to={{pathname: "/about"}} >
                      <NavItem>About</NavItem>
                    </LinkContainer>
                  </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }

}