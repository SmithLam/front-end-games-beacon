import React from "react";
import { useSelector, useDispatch } from "react-redux";

function ProfileUpdate() {
  let state = useSelector((state) => state);
  let currentUser = state.currentUser;
  return (
    <div>
      <h1>This is Profile Update Page of {currentUser.name}</h1>
    </div>
  );
}

export default ProfileUpdate;
