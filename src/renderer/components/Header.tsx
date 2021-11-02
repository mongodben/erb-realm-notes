import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';
import React, { useContext } from 'react';
import { useAuthentication } from 'renderer/hooks';
import Context from '../Context';

type NavLinkProps = {
  to: string;
  children: string;
};
const NavLink = ({ to, children }: NavLinkProps) => (
  <Link to={to}>
    <Nav.Item style={{ marginLeft: 5, marginRight: 5 }}>{children}</Nav.Item>
  </Link>
);

const Header = () => {
  const { loggedIn, setLoggedIn } = useContext(Context);
  const auth = useAuthentication();
  const history = useHistory();

  async function handleLogOut(e: React.ChangeEvent<any>) {
    e.preventDefault();
    try {
      const res = await auth.logOut();
      if (res) {
        history.push('/');
        setLoggedIn(false);
        alert('logged out');
      } else throw new Error("can't log out");
    } catch (err) {
      console.error(err);
      alert('problem logging out :(');
    }
  }

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="/">md notez</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {loggedIn ? (
              <>
                <NavLink to="/write">write</NavLink>
                <Button onClick={handleLogOut} onKeyDown={handleLogOut}>
                  log out
                </Button>
              </>
            ) : (
              <>
                <NavLink to="/log-in">log in</NavLink>
                <NavLink to="/sign-up">sign up</NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
