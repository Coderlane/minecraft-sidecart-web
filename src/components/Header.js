import React, { useContext } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { auth } from '../services/firebase';
import { UserContext } from './UserContext';

function Header() {
  const { user } = useContext(UserContext);

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Sidecart</Navbar.Brand>
        {user !== null
          ? (
            <>
              <Nav className="mr-auto">
                <Nav.Link href="/servers">Servers</Nav.Link>
              </Nav>
              <Form inline>
                <Button onClick={() => auth().signOut()}>Sign Out</Button>
              </Form>
            </>
          )
          : (
            <>
              <Nav className="mr-auto" />
              <Nav>
                <Nav.Link href="/login">Sign In</Nav.Link>
              </Nav>
            </>
          )}
      </Navbar>
    </header>
  );
}

export default Header;
