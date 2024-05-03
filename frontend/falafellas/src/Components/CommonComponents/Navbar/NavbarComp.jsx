import React, { useState } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Person } from 'react-bootstrap-icons';
import './NavbarComp.css';
import { LinkContainer } from 'react-router-bootstrap';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from "../../../FirebaseService";

function NavbarComp(props) {
  const { user, userRole } = props;
  console.log("User Role:",  userRole);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const handleToggleClick = () => {
    setExpanded(!expanded);
  };

  const logOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/login');
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary navbar-custom">
        <Container>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className='toggle-custom'
            onClick={handleToggleClick}
          />

          <LinkContainer to="/">
            <Navbar.Brand>
              <div className="brand-name">
                <span className="first-part">Fala</span><span className="second-part">fellas</span>
              </div>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto navbar-elements">
            {userRole === 'admin' ? (
              <LinkContainer to="/admin-course">
                <Nav.Link>Courses</Nav.Link>
              </LinkContainer>
            ) : (
              <LinkContainer to="/course">
                <Nav.Link>Courses</Nav.Link>
              </LinkContainer>
            )}
              <LinkContainer to="/contact">
                <Nav.Link>Contact Us</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/faq">
                <Nav.Link>FAQ</Nav.Link>
              </LinkContainer>
              {userRole === 'admin' && (
                <>
                  <LinkContainer to="/admin-dashboard">
                    <Nav.Link>Dashboard</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/admin-reports">
                    <Nav.Link>Reports</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>

          {user && !expanded && (
            <NavDropdown title={<Person size={30} color="#f36b37" />} id="nav-dropdown" alignRight>
              <NavDropdown.Item>
                <LinkContainer to={`/profile/${user?.uid}`}>
                  <Nav.Link>Profile</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logOut}>
              <LinkContainer to={"/login"}>
                  <Nav.Link>Logout</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
            </NavDropdown>
          )}
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComp;
