import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Register() {
  let state = useSelector((state) => state);
  let currentUser = state.currentUser;
  return (
    <div>
      <h1>This is Register Page</h1>
    </div>
  );
}

export default Register;
