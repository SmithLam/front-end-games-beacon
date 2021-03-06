import React from "react";
import { Nav, Navbar, NavDropdown, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { logOut } from "../redux/actions/userAction";
import Beacon from "../images/lighthouseBeacon.png";

function NavBar(props) {
  let history = useHistory();
  let dispatch = useDispatch();
  let { currentUser, currentWishlistId, currentCartIdList } = useSelector(
    (state) => state.user
  );

  const goTo = (e, location) => {
    e.preventDefault();
    history.push(location);
  };

  const searchGame = (e, searchTerm) => {
    e.preventDefault();
    dispatch({ type: "SEARCH-GAME", payload: searchTerm });
    history.push("/explore");
  };

  return (
    <Navbar collapseOnSelect expand="lg" id="navbar" variant="dark">
      <LinkContainer to="/">
        <Navbar.Brand>
          Games
          <img
            alt="brand"
            src={Beacon}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Beacon
        </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={(e) => goTo(e, "/")}>Home</Nav.Link>
          <Nav.Link onClick={(e) => searchGame(e, "")}>Explore</Nav.Link>
          <NavDropdown title="Store" id="collasible-nav-dropdown">
            <NavDropdown.Item
              onClick={(e) =>
                searchGame(e, "&dates=2020-06-01,2020-07-24&ordering:-added")
              }
            >
              Latest Released
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={(e) =>
                searchGame(e, "&dates=2020-07-31,2022-07-31&ordering:-added")
              }
            >
              Top Upcoming
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={(e) =>
                searchGame(e, "&dates=1999-01-01,2020-12-31&ordering=-rating")
              }
            >
              Top Rated
            </NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Genres" id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={(e) => searchGame(e, "&genres=4")}>
              Action
            </NavDropdown.Item>
            <NavDropdown.Item onClick={(e) => searchGame(e, "&genres=6")}>
              Fighting
            </NavDropdown.Item>
            <NavDropdown.Item onClick={(e) => searchGame(e, "&genres=7")}>
              Puzzle
            </NavDropdown.Item>
            <NavDropdown.Item onClick={(e) => searchGame(e, "&genres=83")}>
              Platformer
            </NavDropdown.Item>
            <NavDropdown.Item onClick={(e) => searchGame(e, "&genres=5")}>
              RPG
            </NavDropdown.Item>
            <NavDropdown.Item onClick={(e) => searchGame(e, "&genres=2")}>
              Shooter
            </NavDropdown.Item>
            <NavDropdown.Item onClick={(e) => searchGame(e, "&genres=14")}>
              Simulation
            </NavDropdown.Item>
            <NavDropdown.Item onClick={(e) => searchGame(e, "&genres=15")}>
              Sports
            </NavDropdown.Item>
            <NavDropdown.Item onClick={(e) => searchGame(e, "&genres=10")}>
              Strategy
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
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
              <NavDropdown.Item
                className="d-flex justify-content-start"
                onClick={(e) => goTo(e, "/profile")}
              >
                Profile{" "}
              </NavDropdown.Item>
              <NavDropdown.Item
                className="d-flex justify-content-between"
                onClick={(e) => goTo(e, "/profile")}
              >
                Wishlist
                {currentWishlistId ? (
                  <Badge className="py-1 mb-auto" variant="success">
                    {currentWishlistId.length}
                  </Badge>
                ) : (
                  ""
                )}
              </NavDropdown.Item>
              <NavDropdown.Item
                className="d-flex justify-content-between"
                onClick={(e) => goTo(e, "/cart")}
              >
                Cart
                {currentCartIdList ? (
                  <Badge className="py-1 mb-auto" variant="danger">
                    {currentCartIdList.length}
                  </Badge>
                ) : (
                  ""
                )}
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
                "https://res.cloudinary.com/smithlam/image/upload/v1596011853/pqotmzg3qfl1z68m0nzx.png"
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
