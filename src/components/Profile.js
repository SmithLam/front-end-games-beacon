import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Profile() {
  let state = useSelector((state) => state);
  let currentUser = state.currentUser;
  return (
    <div>
      <h1>This is Profile Page of {currentUser.name}</h1>
    </div>
  );
}

export default Profile;
