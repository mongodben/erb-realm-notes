import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

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
  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand href="#home">md notez</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/write">Write</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
