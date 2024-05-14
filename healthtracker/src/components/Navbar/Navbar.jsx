import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './navbar.css'
import Cookies from 'js-cookie';

const GreenNavbar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const sessionToken = document.cookie.split('; ').find(cookie => cookie.startsWith('token'))?.split('=')[1] || '';
    if (!sessionToken) {
      navigate('/login');
    } else {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <Navbar bg="success" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">HealthTracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#graph">Graph</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#login">Login</Nav.Link>
            <Nav.Link href="#register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default GreenNavbar;