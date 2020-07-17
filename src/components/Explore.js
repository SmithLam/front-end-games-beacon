import React, { useEffect } from "react";

function Explore() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <div>
      <h1>This is Explore Page</h1>
    </div>
  );
}

export default Explore;
