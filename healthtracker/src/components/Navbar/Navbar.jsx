import { useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
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
    alert('Please login to continue');
    navigate('/login');
  }
  return (
    <>
      <Navbar bg="success" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">HealthTracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link ><Link to={"/home"}>Home</Link></Nav.Link>
              <Nav.Link ><Link to="/home/graph">Graph</Link></Nav.Link>
              <Nav.Link><Link to="/home/workout">ExerciseList</Link></Nav.Link>
              <Nav.Link><Link to="/home/exerciseData">Exercise Data</Link></Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={Logout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="content">
        <Outlet />
      </div>
    </>
  );
};

export default GreenNavbar;