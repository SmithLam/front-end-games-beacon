import React from "react";
import { Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { logOut } from "../redux/actions/userAction";

function NavBar(props) {
  let history = useHistory();
  let dispatch = useDispatch();
  let { currentUser } = useSelector((state) => state.user);

  const goProfile = (e) => {
    e.preventDefault();
    history.push("/profile");
  };

  // const goRegister = (e) => {
  //   e.preventDefault();
  //   history.push("/register");
  // };

  // const goHome = (e) => {
  //   e.preventDefault();
  //   history.push("/");
  // };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand>Games Beacon</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer to={`/`}>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to={`/explore`}>
            <Nav.Link>Explore</Nav.Link>
          </LinkContainer>
          <Nav.Link>Search</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item>Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item>Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          {currentUser ? (
            <Nav.Link variant="secondary" onClick={(e) => dispatch(logOut(e))}>
              Logout
            </Nav.Link>
          ) : (
              <Nav.Link variant="secondary" onClick={(e) => dispatch({ type: "SHOW-LOGIN-MODAL" })}>
              Login
            </Nav.Link>
          )}
          {currentUser ? (
            // <LinkContainer to={"/profile"}>
            //   <Nav.Link>Profile</Nav.Link>
            // </LinkContainer>
            <NavDropdown title={currentUser.name} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={(e) => goProfile(e)}>
                Profile
              </NavDropdown.Item>
              {/* <NavDropdown.Item onClick={props.logOut()}>
                Logout
              </NavDropdown.Item> */}
            </NavDropdown>
          ) : (
            <LinkContainer to={"/register"}>
              <Nav.Link>Register</Nav.Link>
            </LinkContainer>
          )}
          {currentUser ? (
            <img
              id="avatar-image"
              alt="avatar"
              src={
                currentUser.avatar ||
                "https://res.cloudinary.com/smithlam/image/upload/a_0,c_scale,h_100/c9gsnzmd52jlcuprq6nz"
              }
            />
          ) : (
            ""
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
