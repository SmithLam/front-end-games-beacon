import React from "react";
import { useSelector, useDispatch } from "react-redux";

function Checkout() {
  let state = useSelector((state) => state);
  return (
    <div>
      <h1>This is Checkout Page</h1>
    </div>
  );
}

export default Checkout;
