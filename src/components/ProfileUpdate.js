import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

function ProfileUpdate() {
  let { currentUser } = useSelector((s) => s.user);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1>This is Profile Update Page of {currentUser.name}</h1>
    </div>
  );
}

export default ProfileUpdate;
