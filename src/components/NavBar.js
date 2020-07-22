import React from "react";
import { Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { logOut } from "../redux/actions/userAction";
import { GrCart } from "react-icons/gr";

function NavBar(props) {
  let history = useHistory();
  let dispatch = useDispatch();
  let { currentUser } = useSelector((state) => state.user);

  const goProfile = (e) => {
    e.preventDefault();
    history.push("/profile");
  };

  const goTo = (e, location) => {
    e.preventDefault();
    history.push(location);
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
        <Navbar.Brand>
          <img
            alt=""
            src="https://cdn3.iconfinder.com/data/icons/lighthousix-2/128/lighthouse_nautical_building_beacon-02-512.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Games Beacon
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={(e) => goTo(e, "/")}>Home</Nav.Link>
          <Nav.Link onClick={(e) => goTo(e, "/explore")}>Explore</Nav.Link>
          <NavDropdown title="Store" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              Just Released
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Top Upcoming</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Top Rated</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Genres" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Adventure</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Fighting</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Puzzle</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Platformer</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">RPG</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Shooter</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Simulation</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Sports</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.1">Strategy</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          {/* {currentUser ? (
            <LinkContainer to={`/cart`}>
              <Nav.Link>
                <GrCart className="cart-icon" size={20}></GrCart>
              </Nav.Link>
            </LinkContainer>
          ) : (
            ""
          )} */}
          {currentUser ? (
            <Nav.Link variant="secondary" onClick={(e) => dispatch(logOut(e))}>
              Logout
            </Nav.Link>
          ) : (
            <Nav.Link
              variant="secondary"
              onClick={(e) => dispatch({ type: "SHOW-LOGIN-MODAL" })}
            >
              Login
            </Nav.Link>
          )}
          {currentUser ? (
            <NavDropdown title={currentUser.name} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={(e) => goProfile(e)}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Wishlist</NavDropdown.Item>
              <NavDropdown.Item onClick={(e) => goTo(e, "/cart")}>
                Cart
              </NavDropdown.Item>
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
