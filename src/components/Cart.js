import React, { useEffect } from "react";

function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div>
      <h1>This is Cart Page</h1>
    </div>
  );
}

export default Cart;
