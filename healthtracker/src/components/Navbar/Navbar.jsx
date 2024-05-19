import { useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav } from 'react-bootstrap';
import './navbar.css'

const GreenNavbar = () => {
  const navigate = useNavigate();
  const hasNavigated = useRef(false);

  useEffect(() => {
    const sessionToken = document.cookie.split('; ').find(cookie => cookie.startsWith('token'))?.split('=')[1] || '';
    if (!sessionToken && !hasNavigated.current) {
      alert('Please login to continue');
      navigate('/login');
      hasNavigated.current = true;
    } else if (!hasNavigated.current) {
      navigate('/home');
      hasNavigated.current = true;
    }
  }, [navigate]);

  const Logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    navigate('/login');
  }
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
            <Nav.Link onClick={Logout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default GreenNavbar;