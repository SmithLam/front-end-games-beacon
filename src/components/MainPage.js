import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function MainPage() {
  let state = useSelector((state) => state);
  let currentUser = state.currentUser;

  return (
    <div>
      <h1>This is Main Page</h1>
      {currentUser ? (
        <div>
          {currentUser.name}
          <img id="avatar-image" src={currentUser.avatar} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default MainPage;
