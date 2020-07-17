import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function Checkout() {
  let state = useSelector((state) => state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <h1>This is Checkout Page</h1>
    </div>
  );
}

export default Checkout;
