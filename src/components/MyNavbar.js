import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function MyNavbar(props){
  return (
    <Navbar bg="light" expand="lg">
      <Link to='/' component={Navbar.Brand} >My Board</Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to='/board' component={Nav.Link}>게시판</Link>
        </Nav>
        <Nav inline>
          <Link to="/login" component={Nav.Link}>Login</Link>
          <Link to="/register" component={Nav.Link}>회원가입</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}