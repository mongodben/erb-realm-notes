import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
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
  const { loggedIn } = useContext(Context);
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="/">md notez</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {loggedIn ? (
              <NavLink to="/write">write</NavLink>
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
